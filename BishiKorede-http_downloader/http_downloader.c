#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <netdb.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <ctype.h>
#include <arpa/inet.h>
#include <pthread.h>
#include <openssl/ssl.h>
#include <openssl/err.h>


#define BUFFER_SIZE 1024


//noyon's header files

char domain[1024];
char path[1024];
char extension[1024];
char *URL = NULL;
int Num_parts = 0;
char *Output_file = NULL;

char* case_insensitive_strstr(const char* haystack, const char* needle) {
    if (!haystack || !needle) return NULL;

    const char* h = haystack;
    const char* n = needle;

    while (*h) {
        if (tolower((unsigned char)*h) == tolower((unsigned char)*n)) {
            const char* start_h = h;
            const char* start_n = n;
            while (*start_h && *start_n && tolower((unsigned char)*start_h) == tolower((unsigned char)*start_n)) {
                start_h++;
                start_n++;
            }
            if (!*start_n) return (char*)h; // needle found
        }
        h++;
    }
    return NULL;
}


typedef struct {
    int status;
    int content_length;
} HttpResponse;

HttpResponse ParseResponse(SSL* ssl) {
    char buffer[4096];
    int bytes_received;
    HttpResponse response;

    bytes_received = SSL_read(ssl, buffer, sizeof(buffer) - 1);
    if (bytes_received <= 0) {
        perror("ParseResponse");
        exit(1);
    }
    buffer[bytes_received] = '\0';

    // Parse HTTP status
    sscanf(buffer, "HTTP/%*f %d", &(response.status));

    // Parse Content-Length
    char *ptr = case_insensitive_strstr(buffer, "Content-Length:");
    if (ptr) {
        sscanf(ptr, "Content-Length: %d", &(response.content_length));
    } else {
        printf("Failed to retrieve content length.\n");
        response.content_length = -1; // Unknown size
    }

    return response;
}

char* extract_content_from_buffer(char *buffer, int size, int *content_size) {
    char *header_end = strstr(buffer, "\r\n\r\n");
    if (!header_end) return NULL;  // No header boundary found
    header_end += 4;
    *content_size = size - (header_end - buffer);
    return header_end;
}

void initialize_openssl() {
    SSL_load_error_strings();
    OpenSSL_add_ssl_algorithms();
}

SSL_CTX *create_context() {
    const SSL_METHOD *method;
    SSL_CTX *ctx;
    method = SSLv23_client_method();
    ctx = SSL_CTX_new(method);
    if (!ctx) {
        perror("Unable to create SSL context");
        exit(EXIT_FAILURE);
    }
    return ctx;
}

struct ThreadArgs {
    int threadIndex;
    int chunkStart;
    int chunkEnd;
    char fileName[20];
    int totalcontentlength; // Add total content length here
};


void* downloadChunk(void* arg) {
    struct ThreadArgs* threadArgs = (struct ThreadArgs*)arg;

    //char domain[] = "cobweb.cs.uga.edu";
    //char path[] = "~perdisci/CSCI6760-F21/Project2-TestFiles/topnav-sport2_r1_c1.gif";

    //noyon added variables
    int sock;
    struct sockaddr_in server_addr;
    char send_data[1024], recv_data[1024];


    //noyon's code to modify the TLS connection starts
    SSL_CTX *ctx = create_context();
    struct hostent *he = gethostbyname(domain);

    if (he == NULL) {
        herror("gethostbyname");
        exit(1);
    }

    //finding the lenght of the total file before applying range information
    if ((sock = socket(AF_INET, SOCK_STREAM, 0))== -1){
       perror("Socket");
       exit(1);
    }
    server_addr.sin_family = AF_INET;     
    server_addr.sin_port = htons(443);
    server_addr.sin_addr = *((struct in_addr *)he->h_addr);
    bzero(&(server_addr.sin_zero),8); 

    //printf("Connecting ...\n");
    if (connect(sock, (struct sockaddr *)&server_addr,sizeof(struct sockaddr)) == -1){
       perror("Connect");
       exit(1); 
    }

    SSL *current_ssl = SSL_new(ctx);
        if (!current_ssl) {
            perror("Unable to create SSL");
            exit(EXIT_FAILURE);
        }
        SSL_set_fd(current_ssl, sock);
        if (SSL_connect(current_ssl) <= 0) {
            ERR_print_errors_fp(stderr);
            exit(EXIT_FAILURE);
        }


    // Construct and send the HTTP request for this chunk
    int chunkSize = threadArgs->totalcontentlength / Num_parts;
    int remainder = threadArgs->totalcontentlength % Num_parts;
    int startIndex = threadArgs->threadIndex * chunkSize;
    int endIndex;

    if (threadArgs->threadIndex == Num_parts - 1) {
        // Last thread gets the remainder plus chunk size
        endIndex = startIndex + chunkSize + remainder - 1;
    } else {
        endIndex = startIndex + chunkSize - 1;
    }

    printf("Thread %d: Downloading bytes %d-%d\n", threadArgs->threadIndex, startIndex, endIndex);

    //snprintf(send_data, sizeof(send_data), "GET /%s HTTP/1.1\r\nHost: %s\r\nRange: bytes=%d-%d\r\n\r\n", path, domain, startIndex, endIndex);
    snprintf(send_data, sizeof(send_data), 
    "GET /%s HTTP/1.1\r\n"
    "Host: %s\r\n"
    "Range: bytes=%d-%d\r\n"
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n"
    "\r\n", 
    path, domain, startIndex, endIndex);

    // Use SSL_write instead of send
    if (SSL_write(current_ssl, send_data, strlen(send_data)) <= 0) {
        ERR_print_errors_fp(stderr);
        exit(2);
    }


    // Handle reading and saving the chunk data
    FILE* fp = fopen(threadArgs->fileName, "wb");
    if (fp == NULL) {
        perror("fopen");
        exit(3);
    }

    char buffer[BUFFER_SIZE];
    int bytes_received;
    int total_bytes_received = 0;

    //changing this while loop so that it can remove header content from the file
    int header_parsed = 0, content_size;
    char *content_start;
    while ((bytes_received = SSL_read(current_ssl, recv_data, sizeof(recv_data))) > 0) {
            if (!header_parsed) {
                content_start = extract_content_from_buffer(recv_data, bytes_received, &content_size);
                if (content_start) {
                    fwrite(content_start, 1, content_size, fp);
                    header_parsed = 1;
                }
            } else {
                fwrite(recv_data, 1, bytes_received, fp);
            }
        }

    fclose(fp);

    // Close the socket when done with this chunk
    close(sock);

    pthread_exit(NULL);
}

int main(int argc, char *argv[]) {


    int iterator;
    while ((iterator = getopt(argc, argv, "u:n:o:")) != -1)
    {
        switch (iterator) {
            case 'u':
                URL = optarg;
                break;
            case 'n':
                Num_parts = atoi(optarg);
                break;
            case 'o':
                Output_file = optarg;
                break;  // This was missing
            default: /* '?' */
                fprintf(stderr, "Usage: %s -u <HTTPS_URL> -n <NUM_PARTS> -o <OUTPUT_FILE>\n", argv[0]);
                exit(EXIT_FAILURE);
        }
    }
    if (!URL || !Num_parts || !Output_file) {
        fprintf(stderr, "All arguments (-u, -n, -o) are required!\n");
        exit(EXIT_FAILURE);
    }

    // printf("URL: %s\n", URL);
    // printf("Number of parts: %d\n", Num_parts);
    // printf("Output filename: %s\n", Output_file);
    // //argument parsing ends here

    //find domain, path & extensions
    

    char *protocol_end = strstr(URL, "://");
    if (protocol_end) {
        protocol_end += 3;  // skip over '://'
    } else {
        protocol_end = URL; // start of the string
    }

    char *path_start = strchr(protocol_end, '/');
    if (path_start) {
        strncpy(domain, protocol_end, path_start - protocol_end);
        domain[path_start - protocol_end] = '\0';
        strcpy(path, path_start);
    } else {
        strcpy(domain, protocol_end);
        path[0] = '\0'; // No path present
    }

    // Check for file extension in the path
    if (strlen(path) > 0) {
        char *ext_start = strrchr(path, '.'); // Find last '.' in the path
        if (ext_start && strchr(ext_start, '/')) {
            // If there's a '/' after the '.', then it's not an extension.
            extension[0] = '\0';  // No extension present
        } else if (ext_start) {
            strcpy(extension, ext_start);
        } else {
            extension[0] = '\0'; // No extension present
        }
    } else {
        extension[0] = '\0'; // No extension present
    }

    //find domain, path & extensions ends


    //Noyon's code starts

    initialize_openssl();
    SSL_CTX *ctx = create_context();
    //char domain[] = "cobweb.cs.uga.edu";
    //char path[] = "~perdisci/CSCI6760-F21/Project2-TestFiles/topnav-sport2_r1_c1.gif";
    int bytes_received, sock_fd;
    SSL* sock;
    char send_data[1024], recv_data[1024];
    struct sockaddr_in server_addr;
    struct hostent *he = gethostbyname(domain);

    if (he == NULL) {
        herror("gethostbyname");
        exit(1);
    }

    // Additional variables to store filenames and manage file pointers
    char partFileName[256];
    FILE* partFile;
    int totalParts = 12;
    int totalcontentlength = 0;
    

    //finding the lenght of the total file before applying range information
    if ((sock_fd = socket(AF_INET, SOCK_STREAM, 0))== -1){
       perror("Socket");
       exit(1);
    }
    server_addr.sin_family = AF_INET;     
    server_addr.sin_port = htons(443);
    server_addr.sin_addr = *((struct in_addr *)he->h_addr);
    bzero(&(server_addr.sin_zero),8); 

    printf("Connecting ...\n");
    if (connect(sock_fd, (struct sockaddr *)&server_addr,sizeof(struct sockaddr)) == -1){
       perror("Connect");
       exit(1); 
    }
    SSL *current_ssl = SSL_new(ctx);
        if (!current_ssl) {
            perror("Unable to create SSL");
            exit(EXIT_FAILURE);
        }
        SSL_set_fd(current_ssl, sock_fd);
        if (SSL_connect(current_ssl) <= 0) {
            ERR_print_errors_fp(stderr);
            exit(EXIT_FAILURE);
        }

    printf("Sending data ...\n");

   //sending get request for receiving file length
    // snprintf(send_data, sizeof(send_data), "GET /%s HTTP/1.1\r\nHost: %s\r\n\r\n", path, domain);
    snprintf(send_data, sizeof(send_data), "GET /%s HTTP/1.1\r\nHost: %s\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n\r\n", path, domain);
    // Use SSL_write instead of send
    if (SSL_write(current_ssl, send_data, strlen(send_data)) <= 0) {
        ERR_print_errors_fp(stderr);
        exit(2);
    }
    
  
    HttpResponse response = ParseResponse(current_ssl);
    printf("This is the Status: %d\n", response.status);
    printf("This is the content length: %d", response.content_length);
    totalcontentlength = response.content_length;

    close(sock_fd);



    //Noyon's code ends


    if (totalcontentlength <= 0) {
        fprintf(stderr, "Failed to retrieve content length.\n");
        exit(1);
    }

    pthread_t threads[Num_parts];
    struct ThreadArgs threadArgs[Num_parts];

    for (int i = 0; i < Num_parts; i++) {
        threadArgs[i].threadIndex = i;
        threadArgs[i].totalcontentlength = totalcontentlength;
       
      // Calculate the chunk size and remainder
        int chunkSize = totalcontentlength / Num_parts;
        int remainder = totalcontentlength % Num_parts;

        // Calculate the start and end indices for each thread
        int startIndex = i * chunkSize;
        int endIndex;
        //printf("Thread %d: totalcontentlength=%d, startIndex=%d, endIndex=%d\n", i, threadArgs[i].totalcontentlength, startIndex, endIndex);       
        if (i == Num_parts - 1) {
            // Last thread gets the remainder plus chunk size
            endIndex = startIndex + chunkSize + remainder - 1;
        } else {
            endIndex = startIndex + chunkSize - 1;
        }

        snprintf(threadArgs[i].fileName, sizeof(threadArgs[i].fileName), "part%d%s", i, extension);
        threadArgs[i].chunkStart = startIndex;
        threadArgs[i].chunkEnd = endIndex;
    }


    // Create threads to download file chunks
    for (int i = 0; i < Num_parts; i++) {
        if (pthread_create(&threads[i], NULL, downloadChunk, &threadArgs[i]) != 0) {
            perror("pthread_create");
            exit(4);
        }
    }

    // Wait for all threads to finish
    for (int i = 0; i < Num_parts; i++) {
        //printf("Creating thread %d\n", i);
        if (pthread_join(threads[i], NULL) != 0) {
            perror("pthread_join");
            exit(5);
        }
    }

    // Merge the downloaded chunks into a single file
    printf("Merging downloaded chunks...\n");
    strcat(Output_file, extension);
    FILE* target = fopen(Output_file, "wb");
    if (target == NULL) {
        perror("fopen");
        exit(6);
    }

    char buffer[BUFFER_SIZE];
    int numr, numw;

    for (int i = 0; i < Num_parts; i++) {
        FILE* source = fopen(threadArgs[i].fileName, "rb");
        if (source == NULL) {
            perror("fopen");
            exit(7);
         }

        while ((bytes_received = fread(recv_data, 1, sizeof(recv_data), source)) > 0) {
            fwrite(recv_data, 1, bytes_received, target);
        }

        fclose(source);
    }

    fclose(target);

    //printf("Download completed successfully.\n");

    return 0;
}
 