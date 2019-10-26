package github.notifications;

import java.util.Date;

public abstract class Notification
{
    private Date dateCreated;
    private boolean wasOpened;
    private String RepositoryName;
}
