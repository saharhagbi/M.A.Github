package github;

import github.notifications.PullRequestNotification;

public class PullRequestLogic
{
    private PullRequestNotification notification;
    private int id;

    public PullRequestLogic(PullRequestNotification notification, int id)
    {
        this.notification = notification;
        this.id = id;
    }

    public PullRequestNotification getNotification()
    {
        return notification;
    }

}
