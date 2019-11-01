package System.Users;

import common.constants.ResourceUtils;
import github.notifications.Notification;

import java.util.List;

public class User
{
    private String userName;
    private List<Notification> notificationList;

    public User(String i_UserName)
    {
        userName = i_UserName;
    }

    public String buildUserPath()
    {
        return String.format(ResourceUtils.MainRepositoriesPath + ResourceUtils.Slash + userName);
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String i_UserName)
    {
        userName = i_UserName;
    }
}
