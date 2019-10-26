package github.notifications;

enum Status
{
    CONFIRMED,
    DENIED,
    WAITING
}

public class PRNotification extends Notification
{
    public Status status;
    public String targetUserName;
    public String baseUserName;
    /*public Branch targetBranch;
    public Branch baseBranch;*/
    public String message;
}
