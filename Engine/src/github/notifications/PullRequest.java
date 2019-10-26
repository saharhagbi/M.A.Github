package github.notifications;

import Objects.branch.Branch;

import java.beans.beancontext.BeanContext;
import java.util.Date;

public  class PullRequest
{
    private Status status;
    private String targetUserName;
    private String baseUserName;
    private Branch targetBranch;
    private Branch baseBranch;
    private String message;
    private Notification notification;

    public PullRequest(Status status, String targetUserName,
                       String baseUserName, Branch targetBranch, Branch baseBranch,
                       String message, Notification notification)
    {
        this.status = status;
        this.targetUserName = targetUserName;
        this.baseUserName = baseUserName;
        this.targetBranch = targetBranch;
        this.baseBranch = baseBranch;
        this.message = message;
        this.notification = notification;
    }

    public PullRequest()
    {
        this.status = Status.WAITING;
        this.targetUserName = "Asaf kessler";
        this.baseUserName = "Roy Pirani";
        this.targetBranch = new Branch("BranchOne", null);
        this.baseBranch = new Branch("BranchTwo", null);
        this.message = "Yes We Can!";
        //this.notification = new Notification(new Date());
    }
}
