package github.repository;

public class RepositoryData
{
    private String userName;
    private String latestCommit;
    private String message;
    private String activeBranch;
    private String commitAmount;

    public RepositoryData(String userName, String latestCommit, String message, String activeBranch, String commitAmount)
    {
        this.userName = userName;
        this.latestCommit = latestCommit;
        this.message = message;
        this.activeBranch = activeBranch;
        this.commitAmount = commitAmount;
    }
}
