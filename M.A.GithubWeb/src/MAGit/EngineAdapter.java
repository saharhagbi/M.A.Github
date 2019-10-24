package MAGit;

import System.Engine;
import System.Repository;
import System.Users.User;
import XmlObjects.XMLMain;
import common.MagitFileUtils;
import github.repository.RepositoryData;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

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
                    Integer.toString(newRepo.getAllCommitsSHA1ToCommit().size()));

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
}
