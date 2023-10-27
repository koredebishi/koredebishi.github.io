package engine;

import compute.RemoteStringArray;

import java.io.File;
import java.io.FileNotFoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.Scanner;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;

public class RemoteStringEngine extends UnicastRemoteObject implements RemoteStringArray {

    private String[] stringArray;
    //private final ReentrantReadWriteLock[] locks;

    private  ReentrantReadWriteLock[] locks;
    private  int[] lockOwners;  // Array to track lock ownership by client_id

    public RemoteStringEngine() throws RemoteException {
        super();
    }

    public int getStringArrayLength() {
        return this.stringArray.length;
    }

    public void setStringArray(String[] capacity) {
        stringArray = capacity;
        // Initialize the locks and lockOwners arrays based on stringArray length
        locks = new ReentrantReadWriteLock[stringArray.length];
        lockOwners = new int[stringArray.length];
        for (int i = 0; i < stringArray.length; i++) {
            locks[i] = new ReentrantReadWriteLock();
            lockOwners[i] = -1;  // No owner initially
        }
    }

    @Override
    public void insertArrayElement(int index, String str, int client_id) throws RemoteException {
        if (index < 0 || index >= stringArray.length) {
            throw new IllegalAccessError("Invalid index: " + index);
            // This sould not quit the program but just info the User to enter a valid index.
        }

        //Lock writeLock = locks[index].writeLock();
        ReentrantReadWriteLock.WriteLock writeLock = locks[index].writeLock();
        if (lockOwners[index] != client_id || !writeLock.isHeldByCurrentThread()) {
            throw new RemoteException("Client " + client_id + " does not have write lock for index " + index);
        }

        stringArray[index] = str;
        lockOwners[index] = -1;
        System.out.println("The index " + index + " is updated with " + str);
    }



    @Override
    public String fetchElementRead(int index, int client_id) throws RemoteException {
        System.out.println("Hey....!");
        
        if (index < 0 || index >= stringArray.length) {
            System.out.println("You can only access till index " + (stringArray.length - 1));
            return null; // or return an appropriate default value or error message
        }

        Lock readLock = locks[index].readLock();
        if (readLock.tryLock()) {
            try {
                
                //releaseLock(index, client_id);
                // Read access is allowed since the read lock was successfully acquired
                return stringArray[index];
            } finally {
                readLock.unlock();  // Release the read lock
                //releaseLock(index, client_id);
            }
        } else {
            // Read access is denied because someone else currently has the write lock
            throw new RemoteException("Client " + client_id + " cannot read at index " + index + " due to an active write lock.");
        }
    }


    @Override
    public String fetchElementWrite(int index, int client_id) throws RemoteException {
        // Try to get the write lock
        WriteLock writeLock = locks[index].writeLock();
        
        if (writeLock.tryLock()) {
            try {
                // Lock acquired, return the element
                return stringArray[index];
            } finally {
                writeLock.unlock();
            }
        } else {
            // Write lock not available
            throw new RemoteException("Write lock not available for index " + index);
        }
    }


    @Override
    public void setElementAtIndex(int index, String value, int client_id) throws RemoteException {
             try {
                 // Set the value
                 stringArray[index] = value;
             } finally {
                 // Always release the lock in a finally block to ensure it's released even if an error occurs
                 locks[index].writeLock().unlock();
                 lockOwners[index] = -1;  // Reset the owner after releasing the lock
             }
            stringArray[index] = value;
    }

    @Override
    public boolean requestReadLock(int index, int client_id) throws RemoteException {
        if (index < 0 || index >= stringArray.length) {
            return false;  // Handle index out of bounds
        }

        Lock readLock = locks[index].readLock();
        if (readLock.tryLock()) {
            // No need to store client_id for read locks because multiple clients can read concurrently
            return true;
        } else {
            return false;
        }
    }

    @Override
    public synchronized boolean requestWriteLock(int index, int client_id) throws RemoteException {
        if (index < 0 || index >= stringArray.length) {
            return false;  // Handle index out of bounds
        }
        Lock writeLock = locks[index].writeLock();
        if (writeLock.tryLock()) {
            lockOwners[index] = client_id;  // Store client_id as the owner of this write lock
            return true;
        } else {
            return false;
        }
    }


    @Override
    public void releaseLock(int index, int client_id) throws RemoteException {
        if (index < 0 || index >= stringArray.length) {
            throw new RemoteException("Index out of bounds.");
        }
        Lock writeLock = locks[index].writeLock();
        if (lockOwners[index] == client_id) {
            writeLock.unlock();
            lockOwners[index] = -1;  // Resetting the owner after releasing the lock
        } else {
            throw new RemoteException("Client " + client_id + " does not own the lock for index " + index);
        }
    }

    
    @Override
    public boolean writeBackElement(String str, int index, int client_id) throws RemoteException {
        if (index < 0 || index >= stringArray.length) {
            throw new RemoteException("Index " + index + " out of bounds for stringArray of length " + stringArray.length);
        }

        String copiedString = new String(str);

        stringArray[index] = copiedString;

        return true;
    }

    public static void main (String[]args){

        if (args.length > 1){
            System.out.println("Server take argument with Configuration file");
            System.exit(1);
        }

        try {
            String configFile = args[0];
            Scanner readInput = new Scanner(new File(configFile));
            // Rest of your code to read and process the configuration file goes here...
            System.out.println("Server configured using " + configFile);

            String line;
            // Initialize variables to store configuration values
            int arrayCapacity = 0;
            String[] stringArray = null;
            String bindName = null; // Default binding name

            while (readInput.hasNext()) {
                line = readInput.nextLine();
                if (line.startsWith("arrayCapacity")) {
                    String stringArrayCapacity = line.split("=")[1].trim();
                    arrayCapacity = Integer.parseInt(stringArrayCapacity);
                } else if (line.startsWith("stringArray")) {
                    String stringArrayValues = line.split("=")[1].trim();
                    stringArray = stringArrayValues.split(",");
                } else if (line.startsWith("bindName")) {
                    bindName = line.split("=")[1].trim();
                }
            }

                // Create an instance of RemoteStringEngine and set the stringArray
            RemoteStringEngine remoteStringEngine = new RemoteStringEngine();
            remoteStringEngine.setStringArray(stringArray);

                // Bind the remote object in the registry with the specified binding name
            Registry registry = LocateRegistry.getRegistry(); // if rmiregistry tool is used
            registry.rebind(bindName, remoteStringEngine);

            System.out.println(bindName + " bound and server ready!");

        } catch (Exception e) {
            System.err.println("RemoteStringEngine exception: File Not Found");
            e.printStackTrace();
        }

    }
}