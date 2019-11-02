package MAGit;

import Objects.Commit;
import Objects.branch.Branch;
import System.Engine;
import System.Repository;
import System.Users.User;
import XmlObjects.XMLMain;
import collaboration.LocalRepository;
import collaboration.Push;
import collaboration.RemoteBranch;
import common.MagitFileUtils;
import common.constants.ResourceUtils;
import common.constants.StringConstants;
import github.commit.CommitData;
import github.notifications.ForkNotification;
import github.repository.RepositoryData;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static common.constants.ResourceUtils.MainRepositoriesPath;

public class EngineAdapter
{
    //    private Engine engine = new Engine();
    private XMLMain xmlMain = new XMLMain();

    public void createUserFolder(User usernameFromParameter)
    {
        usernameFromParameter.getUserEngine().createUserFolder(usernameFromParameter.getUserName());
    }

    public void readRepositoryFromXMLFile(String xmlFileContent, String currentUserName) throws Exception
    {
        xmlMain.CheckXMLFile(xmlFileContent);
        xmlMain.ParseAndWriteXML(xmlMain.getXmlRepository(), currentUserName);
    }

    public void createMainFolder() throws Exception
    {
        MagitFileUtils.CreateDirectory(MainRepositoriesPath);

    }

    public List<RepositoryData> buildAllUsersRepositoriesData(User i_UserToBuildRepositoryFor, boolean forClone) throws Exception
    {
        List<RepositoryData> allRepositoriesData = new ArrayList<>();
        File[] repositoriesFolders = MagitFileUtils.GetFilesInLocation(i_UserToBuildRepositoryFor.buildUserPath());

        for (File repositoryFolder : repositoriesFolders)
        {
            i_UserToBuildRepositoryFor.getUserEngine().PullAnExistingRepository(repositoryFolder.getPath());
            if (forClone)
                initListRepositoryData(i_UserToBuildRepositoryFor, allRepositoriesData, forClone);
            else
                initListRepositoryData(i_UserToBuildRepositoryFor, allRepositoriesData);
        }

        return allRepositoriesData;
    }

    private void initListRepositoryData(User i_UserToBuildRepositoryFor, List<RepositoryData> allRepositoriesData, boolean forClone)
    {
        if (!i_UserToBuildRepositoryFor.getUserEngine().IsLocalRepository())
        {
            Repository newRepo = i_UserToBuildRepositoryFor.getUserEngine().getCurrentRepository();
            RepositoryData repositoryData = new RepositoryData(newRepo.getName(),
                    newRepo.getActiveBranch().getPointedCommit().getSHA1(),
                    newRepo.getActiveBranch().getPointedCommit().getCommitMessage(),
                    newRepo.getActiveBranch().getBranchName(),
                    Integer.toString(newRepo.getAllCommitsSHA1ToCommit().size()),
                    i_UserToBuildRepositoryFor.getUserName());

            allRepositoriesData.add(repositoryData);
        }
    }

    private void initListRepositoryData(User i_UserToBuildRepositoryFor, List<RepositoryData> allRepositoriesData)
    {
        Repository newRepo = i_UserToBuildRepositoryFor.getUserEngine().getCurrentRepository();
        RepositoryData repositoryData = new RepositoryData(newRepo.getName(),
                newRepo.getActiveBranch().getPointedCommit().getSHA1(),
                newRepo.getActiveBranch().getPointedCommit().getCommitMessage(),
                newRepo.getActiveBranch().getBranchName(),
                Integer.toString(newRepo.getAllCommitsSHA1ToCommit().size()),
                i_UserToBuildRepositoryFor.getUserName());

        allRepositoriesData.add(repositoryData);
    }

    public void initRepositoryInSystemByName(String repositoryNameClicked, User loggedInUser) throws Exception
    {
        String pathToUserFolderRepositories = loggedInUser.buildUserPath();

        File[] usersRepositories = MagitFileUtils.GetFilesInLocation(pathToUserFolderRepositories);

        for (File file : usersRepositories)
        {
            if (file.getName().equals(repositoryNameClicked))
                loggedInUser.getUserEngine().PullAnExistingRepository(file.getAbsolutePath());
        }
    }

    public void Clone(User i_UserNamerToCopyTo, String i_UserNameToCopyFrom, String i_RepositoryName, String i_RepositoryNewName) throws Exception
    {
        File dirToCloneFrom = Paths.get(ResourceUtils.MainRepositoriesPath + "\\" + i_UserNameToCopyFrom + "\\" + i_RepositoryName).toFile();
        File dirToCloneTo = Paths.get(ResourceUtils.MainRepositoriesPath + "\\" + i_UserNamerToCopyTo.getUserName() + "\\" + i_RepositoryNewName).toFile();
        i_UserNamerToCopyTo.getUserEngine().Clone(dirToCloneTo, i_RepositoryNewName, dirToCloneFrom);

        i_UserNamerToCopyTo.addNotification(new ForkNotification(new Date(), i_RepositoryName, i_UserNamerToCopyTo.getUserName()));
    }

    public List<Object> getBranchesList(User loggedInUser)
    {
        Engine engine = loggedInUser.getUserEngine();

        List<Branch> branches = new ArrayList<>();
        //branches.add(engine.getCurrentRepository().getActiveBranch());
        branches.addAll(engine.getCurrentRepository().getAllBranches());

        int index = branches.indexOf(engine.getCurrentRepository().getActiveBranch());
        branches.remove(index);
        branches.add(0, engine.getCurrentRepository().getActiveBranch());

        List<Object> branchesList = new ArrayList<>(branches);

        return branchesList;
    }

    public List<Object> getCommitsData(User loggedInUser)
    {
        Engine engine = loggedInUser.getUserEngine();

        List<Commit> commitList = new ArrayList<>();

        engine.getCurrentRepository().getActiveBranch().getAllCommitsPointed(commitList);

        return commitList.stream().map(commit ->
        {
            StringBuilder branchesPointedNames = new StringBuilder();
            List<String> branchesPointed = engine.getCurrentRepository().getBranchPointed(commit);

            return (Object) new CommitData(commit.getSHA1(), commit.getCommitMessage(),
                    commit.getUserCreated().getUserName(), String.join(", ", branchesPointed));

        }).collect(Collectors.toList());
    }

    public List<Object> getRepositoryName(User loggedInUser)
    {
        Engine engine = loggedInUser.getUserEngine();

        List<Object> lstToReturn = new ArrayList<>();
        lstToReturn.add(engine.getCurrentRepository().getName());
        lstToReturn.add(loggedInUser.getUserName());

        return lstToReturn;
    }

    public Set<String> GetBeenConnectedUserNameSet()
    {
        Set<String> userNamesSet = new HashSet<>();
        File[] allDirectories = Paths.get(ResourceUtils.MainRepositoriesPath).toFile().listFiles();
        for (int i = 0; i < allDirectories.length; i++)
        {
            userNamesSet.add(allDirectories[i].getName());
        }
        return userNamesSet;
    }

    public List<Object> getPullRequests(User loggedInUser)
    {
        List<Object> lstToReturn = new ArrayList<>();
        //lstToReturn.add(new PullRequestNotification());
        return lstToReturn;
    }

    public List<Object> isLocalRepository(User loggedInUser)
    {
        Engine engine = loggedInUser.getUserEngine();

        List<Object> isLocalList = new ArrayList<>();
        String isLocalRepository = engine.IsLocalRepository() ? StringConstants.YES : StringConstants.NO;

        isLocalList.add((Object) isLocalRepository);

        return isLocalList;
    }

    public void checkout(String branchName, User loggedInUser) throws Exception
    {
        loggedInUser.getUserEngine().CheckOut(branchName);
    }

    public void createNewLocalBranch(String branchName, String sha1Commit, User loggedInUser) throws Exception
    {
        loggedInUser.getUserEngine().CreateNewBranchToSystem(branchName, sha1Commit);
    }

    public String createNewRTB(String remoteBranchName, User loggedInUser) throws IOException
    {
        Engine engine = loggedInUser.getUserEngine();

        LocalRepository localRepository = (LocalRepository) engine.getCurrentRepository();

        RemoteBranch remoteBranch = localRepository.findRemoteBranchByPredicate(remoteBranch1 -> remoteBranch1.getBranchName().equals(remoteBranchName));
        Commit pointedCommit = remoteBranch.getPointedCommit();

        String rtbName = remoteBranchName.split(ResourceUtils.Slash)[0];
        engine.CreateRTB(pointedCommit, rtbName);

        return rtbName;
    }

    public List<Object> getLocalBrances(User loggedInUser)
    {
        LocalRepository localRepository = (LocalRepository) loggedInUser.getUserEngine().getCurrentRepository();

        return localRepository.getLocalBranches().stream().
                map(branch -> (Object) branch).collect(Collectors.toList());
    }

    public void pushBranch(String branchToPushName, User loggedInUser) throws Exception
    {
        loggedInUser.getUserEngine().pushBranch(branchToPushName);
    }

    public void commitChanges(String commitMessage, User loggedInUser) throws Exception
    {
        loggedInUser.getUserEngine().CommitInCurrentRepository(commitMessage, null, loggedInUser);
    }

    public void pull(User loggedInUser) throws Exception
    {
        loggedInUser.getUserEngine().Pull();
    }

    public void push(User loggedInUser) throws Exception
    {
        Engine engine = loggedInUser.getUserEngine();

        Push pusher = new Push(engine, (LocalRepository) engine.getCurrentRepository());

        if (pusher.isPossibleToPush(loggedInUser))
            pusher.Push();
    }

    public void sendPullRequest(User loggedInUser, String message, String branchBaseName, String branchTargetName)
    {
        //create object pull request and add pullrequest notification to other user
    }
}
