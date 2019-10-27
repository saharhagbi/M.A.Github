package github.notifications;

import java.util.Date;

public abstract class Notification
{
    private Date dateCreated;
    private String RepositoryName;

    public Notification()
    {
    }

    public Date getDateCreated()
    {
        return dateCreated;
    }

    public String getRepositoryName()
    {
        return RepositoryName;
    }
}
