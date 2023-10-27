package client;
import java.util.HashSet;

import java.util.Scanner;
import java.util.Set;
import java.io.File;
import java.io.FileNotFoundException;


public class ArrayClientDriver {

    //this is for maintaining clients who already have a readLock
    private static Set<Integer> clientsWithReadLocks = new HashSet<>();
    //this is for maintaining clients who already have a writeLock
    private static Set<Integer> clientsWithWriteLocs = new HashSet<>();
    
    
    public static void printBanner(String text) {
        int length = text.length();
        String topBottomBorder = "+" + "-".repeat(length + 2) + "+";
        String middle = "| " + text + " |";

        System.out.println(topBottomBorder);
        System.out.println(middle);
        System.out.println(topBottomBorder);
    }

    public static void main(String[] args) {

        Scanner readInput;
        if (args.length > 1){
            System.out.println("The Client Side takes configuration file input");
            System.exit(1);
        }

        String configFile = args[0];

        try {

                readInput = new Scanner(new File(configFile));

                String bindName = null;
                String hostName = null;

                while (readInput.hasNext()){
                   String line = readInput.nextLine();

                   if (line.startsWith("bindName")){
                       bindName  = line.split("=")[1].trim();
                   } else if (line.startsWith("hostName")) {
                       hostName = line.split("=")[1].trim();
                   }

                }

                if (bindName!=null && hostName!=null){
                    //creating 3 clients 
                    StringArrayClient clientInstance1 = new StringArrayClient(bindName, hostName, 1);
                    Thread client1 = new Thread(clientInstance1);
                    client1.start();

                    StringArrayClient clientInstance2 = new StringArrayClient(bindName, hostName, 2);
                    Thread client2 = new Thread(clientInstance2);
                    client2.start();

//                    StringArrayClient clientInstance3 = new StringArrayClient(bindName, hostName, 3);
//                    Thread client3 = new Thread(clientInstance3);
//                    client3.start();
                    StringArrayClient[] clientInstances = {clientInstance1, clientInstance2};


                    //user input part
                    readInput = new Scanner(System.in); //reader reads Standard input now instead of a file
                    boolean runLoop = true; // Controls the loop below
                    boolean valid = true; //Controls whether invalid input prompt appears in the loop below

                        
                    //Prints the possible commands to the console
                    System.out.println();
                    printBanner("\n-----Commands:-------\n(GAC) - Get_Array_Capacity\n(FER) - Fetch_Element_Read \n(FEW) - Fetch_Element_Write\n(PE)  - Print_Element\n(C)  - Concatenate\n(WB) - Writeback\n(Q)  - Quit program\n");
                    System.out.println();

                    while(runLoop){
                        if (valid) { //If valid commands are given print
                            System.out.print("Enter a command: ");

                        } 
                        else { //If invalid command given
                            System.out.print("Invalid command try again: ");
                            valid = true;
                        } 
                            
                        String cmd = ""; //String of the command
                        cmd = readInput.nextLine(); //Takes the users input of the whole line


                        if (cmd.trim().equals("Q")) { //Exits program
                            System.out.println("Exiting the program...");
                            runLoop = false;}
                        
                        else if (cmd.trim().equals("GAC")){
                            int x = clientInstance1.getStringArrayLength();
                            System.out.println("The maximum length of the array is : " + x);
                        }
                            
                        //modified code to allow requestReadLock() be called first & depending on the result, proceed further
                        else if (cmd.trim().equals("FER")) {
                            int[] index = new int[2];
                            for(int i = 0; i<2; i++){
                                System.out.println("Please enter an index of the array for client_id :"+(i+1));
                                index[i] = readInput.nextInt();

                            }


                            for (int client_id = 0; client_id < 2; client_id++) {
                                // Each client tries to acquire the write lock.
                                StringArrayClient currentClient = clientInstances[client_id]; // assuming you have an array of clientInstances
                                

                                //if (clientsWithReadLocks.contains(client_id)) {
                                //System.out.println("You already have the read lock.");
                                String fetchedElement = currentClient.fetchElementRead(index[client_id], client_id);
                                System.out.println("Client" + (client_id+1) + " Fetched element at index " + index[client_id] + ": " + fetchedElement);
                                // } else {
                                //     // If the client doesn't have a read lock, try acquiring it
                                //     if (currentClient.requestReadLock(index[client_id], client_id)) {
                                //         clientsWithReadLocks.add(client_id);  // Remember that this client has acquired a read lock
                                //         String fetchedElement = currentClient.fetchElementRead(index[client_id], client_id);
                                //         System.out.println("Client" + (client_id+1) + " Fetched element at index " + index[client_id] + ": " + fetchedElement);
                                //     } else {
                                //         System.out.println("Client" + (client_id+1)+ " Failed to acquire read lock for index " + index[client_id] + " and client ID " + client_id);
                                //     }
                                // }
                                }
                            }


                            
                        // else if (cmd.trim().equals("FEW")) { //PRINT LENGTH
                        //     // int index = 4;  // example index
                        //     // int client_id = 2;  // example client id
                        //     // String str = "Hey Noyon!";

                        //     // //if(clientsWithWriteLocs.contains(client_id)){
                        //     //     System.out.println("You already have the write lock.");

                        //     //     String fetchedElement = clientInstance1.fetchElementWrite(index, client_id);

                        //     //     System.out.println("Updated string element at index " + index + ": " + fetchedElement);
                        //     //}

                        //     int[] index = new int[3];
                        //     for(int i = 0; i<3; i++){
                        //         System.out.println("Please enter an index of the array for client_id :"+(i+1));
                        //         index[i] = readInput.nextInt();

                        //     }


                        //     for (int client_id = 0; client_id < 3; client_id++) {
                        //         // Each client tries to acquire the write lock.
                        //         StringArrayClient currentClient = clientInstances[client_id]; // assuming you have an array of clientInstances
                                

                        //         if (clientsWithWriteLocs.contains(client_id)) {
                        //             System.out.println("You already have the write lock.");
                        //             String fetchedElement = currentClient.fetchElementWrite(index[client_id], client_id);
                        //             System.out.println("Client" + (client_id+1) + " Fetched element at index " + index[client_id] + ": " + fetchedElement);
                        //         } else {
                        //             System.out.println("You do not have the write lock.");
                        //         }
                        //         }

                        // } 

                        else if (cmd.trim().equals("FEW")) {


                            int[] index = new int[3];

                            
                            for (int i = 0; i < 2; i++) {
                                // Each client tries to acquire the write lock.
                                System.out.println("Please enter an index of the array to write for client_id :"+(i+1));
                                index[i] = readInput.nextInt();
                                StringArrayClient currentClient = clientInstances[i];
                                try {

                                    if (currentClient.requestWriteLock(index[i], (i+1))) {
                                        System.out.println("Write lock acquired successfully by client " + (i+1));
                                        
                                        // Fetch the element in write mode
                                        //String originalElement = currentClient.fetchElementWrite(index, client_id);
                                        
                                        String originalElement = currentClient.fetchElementWrite(index[i], (i+1));
                                        //System.out.println("Client " + (i+1) + ": Enter a String to be written back to the Server");
                                        //readInput.nextLine();
                                        //String appendStr = readInput.nextLine();
                                        
                                        //String modifiedElement = originalElement + appendStr;
                                        // Concatenate the fetched element with the new string
                                        //modifiedElement = currentClient.writeBack(index[i], modifiedElement, (i+1));
                                        
                                        // Now, attempt to write back the modified value
                                        //currentClient.setElementAtIndex(index, modifiedElement, client_id);
                                        System.out.println("Fetched element write at index " + index[i] + " by client " + (i+1) + " is: " + originalElement);
                                    } else {
                                        System.out.println("Failed to acquire write lock for client " + (i+1));
                                    }
                                } catch (Exception e) {
                                    System.out.println("General exception encountered for client " + (i+1) + ": " + e.getMessage());
                                    e.printStackTrace();  // Log the stack trace for debugging
                                }
                            }
                        }












                            



                        else if (cmd.trim().equals("PE")) { //INSERT IN LIST
                            //with this method call, the program inserts a string (copies) into the specified location of the string
                            int[] index = new int[2];
                            for(int i = 0; i<2; i++){
                                System.out.println("Please enter an index of the array for client_id :"+(i+1));
                                index[i] = readInput.nextInt();

                            }
                            for (int i = 0; i < 2; i++) {

                                // Each client tries to acquire the write lock.
                                StringArrayClient currentClient = clientInstances[i]; // assuming you have an array of clientInstances
                                printBanner("Client" + (i+1) + " Printed element at index " + index[i] + ": " + currentClient.printElement(index[i], i));

                                }
                            }
                            
                            
                        

                        else if (cmd.trim().equals("C")) {

                            int[] index = new int[2];
                            String[] str = new String[2];
                            for(int i = 0; i<2; i++){
                                System.out.println("Please enter an index and string of the array to be concatenated for client_id :"+(i+1));
                                System.out.println("Index: ");
                                index[i] = readInput.nextInt();
                                readInput.nextLine();
                                System.out.println("String :");
                                str[i] = readInput.nextLine();

                            }

                            for (int client_id = 0; client_id < 2; client_id++) {
                                // Each client tries to acquire the write lock.
                                StringArrayClient currentClient = clientInstances[client_id]; // assuming you have an array of clientInstances
                                
                                String conCatElement = currentClient.concatenate(index[client_id], str[client_id], (client_id+1));
                                printBanner("Client "+ (client_id+1) + " concatenated string at index " + index[client_id] + " is: " + conCatElement);
                                }

                        }

                        else if (cmd.trim().equals("WB")) {


                            int[] index = new int[2];

                            
                            for (int i = 0; i < 2; i++) {
                                // Each client tries to acquire the write lock.
                                System.out.println("Please enter an index of the array to writeback for client_id :"+(i+1));
                                index[i] = readInput.nextInt();
                                StringArrayClient currentClient = clientInstances[i];
                                try {

                                    if (currentClient.requestWriteLock(index[i], (i+1))) {
                                        System.out.println("Write lock acquired successfully by client " + (i+1));
                                        
                                        // Fetch the element in write mode
                                        //String originalElement = currentClient.fetchElementWrite(index, client_id);
                                        
                                        String originalElement = currentClient.fetchElementWrite(index[i], (i+1));
                                        System.out.println("Client " + (i+1) + ": Enter a String to be written back to the Server");
                                        readInput.nextLine();
                                        String appendStr = readInput.nextLine();
                                        
                                        String modifiedElement = originalElement + appendStr;
                                        // Concatenate the fetched element with the new string
                                        modifiedElement = currentClient.writeBack(index[i], modifiedElement, (i+1));
                                        
                                        // Now, attempt to write back the modified value
                                        //currentClient.setElementAtIndex(index, modifiedElement, client_id);
                                        System.out.println("Modified element at index " + index[i] + " by client " + (i+1) + " is: " + modifiedElement);
                                    } else {
                                        System.out.println("Failed to acquire write lock for client " + (i+1));
                                    }
                                } catch (Exception e) {
                                    System.out.println("General exception encountered for client " + (i+1) + ": " + e.getMessage());
                                    e.printStackTrace();  // Log the stack trace for debugging
                                }
                            }
                        }


                }
            }
        }
        catch (FileNotFoundException fnfe){
            System.out.println("File not Found");
        }
    }

}