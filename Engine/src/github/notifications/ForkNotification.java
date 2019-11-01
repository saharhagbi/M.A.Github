package github.notifications;

import java.util.Date;

public class ForkNotification extends Notification
{
    private String userName;

    public ForkNotification(Date dateCreated, String repositoryName, String userName)
    {
        super(dateCreated, repositoryName);
        this.userName = userName;
    }
}
