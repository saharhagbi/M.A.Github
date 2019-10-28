package github.notifications;

public class ForkNotification extends Notification
{
    private String userName;

    public ForkNotification(String userName, Notification notification)
    {
        super();
        this.userName = userName;
    }
}
