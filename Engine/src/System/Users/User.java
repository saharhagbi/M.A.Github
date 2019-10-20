package System.Users;

import common.constants.ResourceUtils;

public class User
{
    private String m_UserName = "Administrator";

    public User(String i_UserName)
    {
        m_UserName = i_UserName;
    }

    public static String buildUserPath(String userName)
    {
        return String.format(ResourceUtils.MainRepositoriesPath + ResourceUtils.Slash + userName);
    }

    public String getUserName()
    {
        return m_UserName;
    }

    public void setUserName(String i_UserName)
    {
        m_UserName = i_UserName;
    }
}
