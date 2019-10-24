package System.Users;

import common.constants.ResourceUtils;

public class User
{
    private String userName = "Administrator";

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
