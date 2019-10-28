package github.notifications;

import Objects.branch.Branch;

import java.beans.beancontext.BeanContext;
import java.util.Date;

public  class PullRequestNotification extends Notification
{
    private Status status;
    private String userName;
    private String targetBranchName; // my branch
    private String baseBranchName; // merge to branch
    private String message;

    public PullRequestNotification(Status status,
                                   String userName, String targetBranch, String baseBranch,
                                   String message)
    {
        super();
        this.status = status;
        this.userName = userName;
        this.targetBranchName = targetBranch;
        this.baseBranchName = baseBranch;
        this.message = message;
    }

    public PullRequestNotification()
    {
        this.status = Status.WAITING;
        this.userName = "Asaf kessler";
        this.targetBranchName = "BranchOne";
        this.baseBranchName = "BranchTwo";
        this.message = "Yes We Can!";
    }
}
