package github.notifications;

public class PullRequestNotification extends Notification
{
    private Status status;
    private String userName;
    private String targetBranchName; // my branch
    private String baseBranchName; // merge to branch
    private String message;

    public PullRequestNotification(Status status, String userName, String targetBranch, String baseBranch, String message)
    {
        super(null, null);
        this.status = status;
        this.userName = userName;
        this.targetBranchName = targetBranch;
        this.baseBranchName = baseBranch;
        this.message = message;
    }

    @Override
    public String createNotificationTemplate()
    {
        return String.format("Pull Request:" + System.lineSeparator() +
                "Status:" + status.toString() + System.lineSeparator() +
                "Message:" + message + System.lineSeparator());
    }
}
