package github.users;

import System.Users.User;

import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

/*
Adding and retrieving users is synchronized and in that manner - these actions are thread safe
Note that asking if a user exists (isUserExists) does not participate in the synchronization and it is the responsibility
of the user of this class to handle the synchronization of isUserExists with other methods here on it's own
 */
public class UserManager {

    private final Set<User> usersSet;
    private User currentUserName;

    public User getCurrentUserName()
    {
        return currentUserName;
    }

    public void setCurrentUserName(User currentUserName)
    {
        AtomicBoolean isExist = new AtomicBoolean(false);
        usersSet.forEach(user -> {
            if(user.getUserName().equals(currentUserName.getUserName())) {
                this.currentUserName = user;
                isExist.set(true);
            }
        });
        if(isExist.get() ==false)
            this.currentUserName = currentUserName;
    }

    public UserManager() {
        usersSet = new HashSet<>();
    }

    public synchronized void addUser(User user) {
        usersSet.add(user);
    }

    public synchronized void removeUser(String i_Username) {
        usersSet.forEach(user -> {
            if(user.getUserName().equals(i_Username))
                usersSet.remove(user);
        });
        try {
            throw new Exception("UserManager.removeUser() - didnt find the requested user name so it wasnt removed");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
    }

    public synchronized Set<User> getUsers() {
        return Collections.unmodifiableSet(usersSet);
    }

    public boolean isUserExists(String username) {
        Boolean exist = false;
        Iterator<User> iterator = usersSet.iterator();
        while(iterator.hasNext())
        {
            User currUser = (User) iterator.next();
            if(currUser.getUserName().equals(username))
                return true;
        }
        return false;
    }
}
