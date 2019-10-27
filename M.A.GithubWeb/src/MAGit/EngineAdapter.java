package MAGit;

import Objects.Commit;
import Objects.branch.Branch;
import System.Engine;
import System.Repository;
import System.Users.User;
import XmlObjects.XMLMain;
import common.MagitFileUtils;
import common.constants.ResourceUtils;
import common.constants.StringConstants;
import github.commit.CommitData;
import github.notifications.PullRequestNotification;
import github.repository.RepositoryData;

import java.io.File;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class EngineAdapter
{
    private Engine engine = new Engine();
    private XMLMain xmlMain = new XMLMain();

    public void createUserFolder(String usernameFromParameter)
    {
        engine.createUserFolder(usernameFromParameter);
    }

    public void readRepositoryFromXMLFile(String xmlFileContent, String currentUserName) throws Exception
    {
        xmlMain.CheckXMLFile(xmlFileContent);
        xmlMain.ParseAndWriteXML(xmlMain.getXmlRepository(), currentUserName);
    }

    public void createMainFolder() throws Exception
    {
        engine.createMainRepositoryFolder();
    }

    public List<RepositoryData> buildAllUsersRepositoriesData(User loggedInUser) throws Exception
    {
        List<RepositoryData> allRepositoriesData = new ArrayList<>();
        File[] repositoriesFolders = MagitFileUtils.GetFilesInLocation(loggedInUser.buildUserPath());

        for (File repositoryFolder : repositoriesFolders)
        {
            engine.PullAnExistingRepository(repositoryFolder.getPath());
            Repository newRepo = engine.getCurrentRepository();
            RepositoryData repositoryData = new RepositoryData(newRepo.getName(),
                    newRepo.getActiveBranch().getPointedCommit().getSHA1(),
                    newRepo.getActiveBranch().getPointedCommit().getCommitMessage(),
                    newRepo.getActiveBranch().getBranchName(),
                    Integer.toString(newRepo.getAllCommitsSHA1ToCommit().size()),
                    loggedInUser.getUserName());

            allRepositoriesData.add(repositoryData);
        }

        return allRepositoriesData;
    }

    public void initRepositoryInSystemByName(String repositoryNameClicked, User loggedInUser) throws Exception
    {
        String pathToUserFolderRepositories = loggedInUser.buildUserPath();

        File[] usersRepositories = MagitFileUtils.GetFilesInLocation(pathToUserFolderRepositories);

        for (File file : usersRepositories)
        {
            if (file.getName().equals(repositoryNameClicked))
                engine.PullAnExistingRepository(file.getAbsolutePath());
        }
    }

    public void Clone(String i_UserNamerToCopyTo, String i_UserNameToCopyFrom, String i_RepositoryName) throws Exception
    {
        File dirToCloneTo = Paths.get(ResourceUtils.MainRepositoriesPath + "\\" + i_UserNamerToCopyTo + "\\" + i_RepositoryName).toFile();
        File dirToCloneFrom = Paths.get(ResourceUtils.MainRepositoriesPath + "\\" + i_UserNameToCopyFrom + "\\" + i_RepositoryName).toFile();
        this.engine.Clone(dirToCloneTo, i_RepositoryName, dirToCloneFrom);
    }

    public List<Object> getBranchesList()
    {
        Set<Branch> branches = new HashSet<>();
        branches.add(engine.getCurrentRepository().getActiveBranch());
        branches.addAll(engine.getCurrentRepository().getActiveBranches());

        List<Object> branchesList = new ArrayList<>(branches);

        Collections.reverse(branchesList);

        return branchesList;
    }

    public List<Object> getCommitsData()
    {
        List<Commit> commitList = new ArrayList<>();

        engine.getCurrentRepository().getActiveBranch().getAllCommitsPointed(commitList);

        return commitList.stream().map(commit ->
        {
            StringBuilder branchesPointedNames = new StringBuilder();
            List<Branch> branchesPointed = engine.getCurrentRepository().getBranchPointed(commit);
            branchesPointed.forEach(branch -> branchesPointedNames.append(branch.getBranchName() + " "));

            return (Object) new CommitData(commit.getSHA1(), commit.getCommitMessage(),
                    commit.getUserCreated().getUserName(), branchesPointedNames.toString());

        }).collect(Collectors.toList());
    }

    public List<Object> getRepositoryName(String userName)
    {
        List<Object> lstToReturn = new ArrayList<>();
        lstToReturn.add(engine.getCurrentRepository().getName());
        lstToReturn.add(userName);

        return lstToReturn;
    }

    public List<Object> getPullRequests()
    {
        List<Object> lstToReturn = new ArrayList<>();
        lstToReturn.add(new PullRequestNotification());
        return lstToReturn;
    }

    public List<Object> isLocalRepository()
    {
        List<Object> isLocalList = new ArrayList<>();
        String isLocalRepository = engine.IsLocalRepository() ? StringConstants.YES : StringConstants.NO;

        isLocalList.add((Object) isLocalRepository);

        return isLocalList;
    }

    public void checkout(String branchName) throws Exception
    {
        engine.CheckOut(branchName);
    }


}
