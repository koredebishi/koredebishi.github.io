package client;
//import java.util.Arrays;
import compute.RemoteStringArray;
import java.io.Serializable;
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.util.HashMap;
import java.util.Map;

public class StringArrayClient implements Serializable, Runnable {
    private String bindName;
    private String hostName;
    private int client_id;
    public RemoteStringArray remoteArray; 

    private Map<Integer, String> localCache = new HashMap<>();  // Cache to store previously fetched elements

    public StringArrayClient(String bindName, String hostName, int client_id) {
        this.bindName = bindName;
        this.hostName = hostName;
        this.client_id = client_id;
    }


    

    @Override
    public void run() {
        // Directly attempt to bind with hostName and bindName when the thread is started
        try {
            String rmiURL = "rmi://" + hostName + "/" + bindName;
            remoteArray = (RemoteStringArray) Naming.lookup(rmiURL);
        } 
        catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }

    public int getStringArrayLength() {
    try {
        return remoteArray.getStringArrayLength();
    } catch (RemoteException e) {
        System.err.println("Remote exception while fetching array length: " + e.toString());
        e.printStackTrace();
        return -1; // or some error value to indicate the failure
    }
}


    public String fetchElementRead(int l, int client_id) {
        try {
            //remoteArray.releaseLock(l, client_id);
            return remoteArray.fetchElementRead(l, client_id);

        } catch (RemoteException e) {
            System.err.println("Remote exception while fetching element for reading: " + e.toString());
            e.printStackTrace();
            return null;
        }
    }

    public String fetchElementWrite(int index, int client_id) {
        String element = null;
        try {
            element = remoteArray.fetchElementWrite(index, client_id);
            System.out.println("Success! Fetched element: " + element);
        } catch (RemoteException e) {
            System.out.println("Failure! " + e.getMessage());
        } finally {
            // No need to release the lock immediately in this method
            // The lock ownership should be retained for subsequent write operations
        }
        return element;
    }

    public String writeBack(int index, String str, int client_id) {
        try {
            // Fetch the element with the write lock
            //String elementWB = remoteArray.fetchElementWrite(index, client_id);
            Boolean elementWB = remoteArray.writeBackElement(str, index, client_id);

            if (elementWB == false) {
                System.out.println("Failed to fetch element with write lock.");
                return null;
            }

            // Modify the fetched element
            String modifiedElement = str;

            // Release the write lock when modifications are complete
            remoteArray.releaseLock(index, client_id);

            return modifiedElement; // Return the modified element as confirmation
        } catch (RemoteException e) {
            System.out.println("Failure! " + e.getMessage());
            return null;
        }
    }

    public String setElementAtIndex(int index, String value, int client_id) {
        try {
            // Set the value on the server-side
            remoteArray.setElementAtIndex(index, value, client_id);
            return value;
        } catch (RemoteException e) {
            System.err.println("Remote exception while setting element and releasing lock: " + e.toString());
            e.printStackTrace();
            return null;
        }
    }


    public boolean requestReadLock(int l, int client_id){
        try {
            return remoteArray.requestReadLock(l, client_id);
        } catch (Exception e) {
            System.err.println("General exception while requesting read lock: " + e.toString());
            e.printStackTrace();
            return false;
        }
    }

    public boolean requestWriteLock(int l, int client_id){
        try {
            return remoteArray.requestWriteLock(l, client_id);    // return remoteArray.requestReadLock(l, client_id);
        } catch (Exception e) {
            System.err.println("General exception while requesting read lock: " + e.toString());
            e.printStackTrace();
            return false;
        }
    }

    public boolean writeBackElement(String str, int l, int client_id) {
        try {
            return remoteArray.writeBackElement(str, l, client_id);
        } catch (RemoteException e) {
            System.err.println("Remote exception while fetching element for reading: " + e.toString());
            e.printStackTrace();
            return false;
        }
    }
  
    public String printElement(int index, int client_id) {
        String element = localCache.get(index);  // Try to get the element from the cache first
        
        if (element == null) {  // If the element wasn't in the cache, fetch from server
            System.out.println("Element not in cache, fetching from server");
            try {
                element = remoteArray.fetchElementRead(index, client_id);
                localCache.put(index, element);  // Store the fetched element in the cache
            } catch (RemoteException e) {
                System.err.println("Error while fetching the element: " + e.getMessage());
                e.printStackTrace();
                return null;
            }

        }else {
            System.out.println("Element found in cache");
        }
        
        // Print the element, whether it came from the cache or the server
        System.out.println("Element at index " + index + ": " + element);
        return element;
    }



    public String concatenate(int index, String str, int client_id) {
        String concatCache = "";
        String element = localCache.get(index);  // Try to get the element from the cache first

        if (element == null) {  // If the element wasn't in the cache, fetch from server
            System.out.println("Element not in cache, fetching from server");
            try {
                element = remoteArray.fetchElementRead(index, client_id);
                localCache.put(index, element);  // Store the fetched element in the cache

                String concat = element + str;
                return concat;
            } catch (RemoteException e) {
                System.err.println("Error while fetching the element: " + e.getMessage());
                e.printStackTrace();
                return null;
            }

        }else {
           concatCache = element + str;
        }
        
        // Print the element, whether it came from the cache or the server
        System.out.println("Element at index " + index + ": " + element);
        return concatCache;
    }

}