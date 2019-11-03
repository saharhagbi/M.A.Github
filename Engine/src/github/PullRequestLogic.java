package github;

import System.Users.User;
import github.notifications.PullRequestNotification;

public class PullRequestLogic
{
    private PullRequestNotification notification;
    private int id;
    private User userToNotify;
    private User userSended;

    public PullRequestLogic(PullRequestNotification notification, int id, User userToNotify, User userSended)
    {
        this.notification = notification;
        this.id = id;
        this.userToNotify = userToNotify;
        this.userSended = userSended;
    }

    public int getId()
    {
        return id;
    }

    public PullRequestNotification getNotification()
    {
        return notification;
    }

}
