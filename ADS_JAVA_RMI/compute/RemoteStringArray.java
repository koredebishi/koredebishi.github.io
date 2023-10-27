package compute;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface RemoteStringArray extends Remote {



    void setElementAtIndex(int index, String str, int client_id) throws RemoteException;

    int getStringArrayLength() throws RemoteException;

    // Inserts str as the lth element of the string array
    void insertArrayElement(int l, String str, int client_id) throws RemoteException;

    // Request read lock on the lth element of the array
    boolean requestReadLock(int l, int client_id) throws RemoteException;

    // Request write lock on the lth element of the array
    boolean requestWriteLock(int l, int client_id) throws RemoteException;

    // Release the read/write lock on the lth element
    void releaseLock(int l, int client_id) throws RemoteException;

    // Returns the String at the lth location in read-only mode
    String fetchElementRead(int l, int client_id) throws RemoteException;

    // Returns the String at the lth location in read/write mode
    String fetchElementWrite(int l, int client_id) throws RemoteException;

    // Copies str into the lth position only if the client has a write lock
    boolean writeBackElement(String str, int l, int client_id) throws RemoteException;
}