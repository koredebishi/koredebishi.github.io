CC      = gcc
CFLAGS  = -g -pthread -Wno-format
LDLIBS  = -lpthread -lssl -lcrypto

all: http_downloader

http_downloader: http_downloader.c
	$(CC) $(CFLAGS) -o http_downloader http_downloader.c $(LDLIBS) `pkg-config --cflags --libs openssl`

run: http_downloader
	./http_downloader -u https://arxiv.org/pdf/2302.07387.pdf -n 5 -o OUTPUT_FILE

clean:
	$(RM) http_downloader OUTPUT_FILE
