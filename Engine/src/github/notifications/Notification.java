package github.notifications;

import java.util.Date;

public class Notification
{
    private Date dateCreated;
    private boolean wasOpened;
    private String RepositoryName;

    public Notification(Date dateCreated, boolean wasOpened, String repositoryName)
    {
        this.dateCreated = dateCreated;
        this.wasOpened = wasOpened;
        RepositoryName = repositoryName;
    }

    public Date getDateCreated()
    {
        return dateCreated;
    }

    public boolean isWasOpened()
    {
        return wasOpened;
    }

    public String getRepositoryName()
    {
        return RepositoryName;
    }
}
