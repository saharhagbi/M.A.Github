package MAGit;

import MAGit.Constants.Constants;
import Objects.Commit;
import Objects.Blob;
import Objects.Folder;
import Objects.Item;
import Objects.branch.Branch;
import System.Engine;
import System.Repository;
import System.Users.User;
import XmlObjects.XMLMain;
import collaboration.LocalRepository;
import collaboration.RemoteBranch;
import common.MagitFileUtils;
import common.constants.ResourceUtils;
import common.constants.StringConstants;
import github.commit.CommitData;
import github.notifications.PullRequestNotification;
import github.repository.RepositoryData;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class EngineAdapter {
    private Engine engine = new Engine();
    private XMLMain xmlMain = new XMLMain();

    public void createUserFolder(String usernameFromParameter) {
        engine.createUserFolder(usernameFromParameter);
    }

    public void readRepositoryFromXMLFile(String xmlFileContent, String currentUserName) throws Exception {
        xmlMain.CheckXMLFile(xmlFileContent);
        xmlMain.ParseAndWriteXML(xmlMain.getXmlRepository(), currentUserName);
    }

    public void createMainFolder() throws Exception {
        engine.createMainRepositoryFolder();
    }

    public List<RepositoryData> buildAllUsersRepositoriesData(User i_UserToBuildRepositoryFor) throws Exception {
        List<RepositoryData> allRepositoriesData = new ArrayList<>();
        File[] repositoriesFolders = MagitFileUtils.GetFilesInLocation(i_UserToBuildRepositoryFor.buildUserPath());

        for (File repositoryFolder : repositoriesFolders) {
            engine.PullAnExistingRepository(repositoryFolder.getPath());
            if (!engine.IsLocalRepository()) {
                Repository newRepo = engine.getCurrentRepository();
                RepositoryData repositoryData = new RepositoryData(newRepo.getName(),
                        newRepo.getActiveBranch().getPointedCommit().getSHA1(),
                        newRepo.getActiveBranch().getPointedCommit().getCommitMessage(),
                        newRepo.getActiveBranch().getBranchName(),
                        Integer.toString(newRepo.getAllCommitsSHA1ToCommit().size()),
                        i_UserToBuildRepositoryFor.getUserName());

                allRepositoriesData.add(repositoryData);
            }
        }

        return allRepositoriesData;
    }

    public void initRepositoryInSystemByName(String repositoryNameClicked, User loggedInUser) throws Exception {
        String pathToUserFolderRepositories = loggedInUser.buildUserPath();

        File[] usersRepositories = MagitFileUtils.GetFilesInLocation(pathToUserFolderRepositories);

        for (File file : usersRepositories) {
            if (file.getName().equals(repositoryNameClicked))
                engine.PullAnExistingRepository(file.getAbsolutePath());
        }
    }

    public void Clone(String i_UserNamerToCopyTo, String i_UserNameToCopyFrom, String i_RepositoryName, String i_RepositoryNewName) throws Exception {
        File dirToCloneFrom = Paths.get(ResourceUtils.MainRepositoriesPath + "\\" + i_UserNameToCopyFrom + "\\" + i_RepositoryName).toFile();
        File dirToCloneTo = Paths.get(ResourceUtils.MainRepositoriesPath + "\\" + i_UserNamerToCopyTo + "\\" + i_RepositoryNewName).toFile();
        this.engine.Clone(dirToCloneTo, i_RepositoryNewName, dirToCloneFrom);
    }

    public List<Object> getBranchesList() {
        Set<Branch> branches = new HashSet<>();
        branches.add(engine.getCurrentRepository().getActiveBranch());
        branches.addAll(engine.getCurrentRepository().getActiveBranches());

        List<Object> branchesList = new ArrayList<>(branches);

        Collections.reverse(branchesList);

        return branchesList;
    }

    public List<Object> getCommitsData() {
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

    public List<Object> getRepositoryName(String userName) {
        List<Object> lstToReturn = new ArrayList<>();
        lstToReturn.add(engine.getCurrentRepository().getName());
        lstToReturn.add(userName);

        return lstToReturn;
    }

    public Set<String> GetBeenConnectedUserNameSet() {
        Set<String> userNamesSet = new HashSet<>();
        File[] allDirectories = Paths.get(ResourceUtils.MainRepositoriesPath).toFile().listFiles();
        for (int i = 0; i < allDirectories.length; i++) {
            userNamesSet.add(allDirectories[i].getName());
        }
        return userNamesSet;
    }

    public List<Object> getPullRequests() {
        List<Object> lstToReturn = new ArrayList<>();
        lstToReturn.add(new PullRequestNotification());
        return lstToReturn;
    }

    public List<Object> isLocalRepository() {
        List<Object> isLocalList = new ArrayList<>();
        String isLocalRepository = engine.IsLocalRepository() ? StringConstants.YES : StringConstants.NO;

        isLocalList.add((Object) isLocalRepository);

        return isLocalList;
    }

    public void checkout(String branchName) throws Exception {
        engine.CheckOut(branchName);
    }


    public void createNewLocalBranch(String branchName, String sha1Commit) throws Exception {
        engine.CreateNewBranchToSystem(branchName, sha1Commit);
    }

    public String createNewRTB(String remoteBranchName) throws IOException {
        LocalRepository localRepository = (LocalRepository) engine.getCurrentRepository();

        RemoteBranch remoteBranch = localRepository.findRemoteBranchByPredicate(remoteBranch1 -> remoteBranch1.getBranchName().equals(remoteBranchName));
        Commit pointedCommit = remoteBranch.getPointedCommit();

        String rtbName = remoteBranchName.split(ResourceUtils.Slash)[0];
        engine.CreateRTB(pointedCommit, rtbName);

        return rtbName;
    }

    public ItemInfo getItemInfoBySha1(String i_Sha1) {
        Item item = getItemBySha1(i_Sha1);
        return getItemInfo(item);
    }

    private Item getItemBySha1(String i_sha1) {
        Map<Path, Item> mapOfItems = engine.getCurrentRepository().getActiveBranch().getPointedCommit().getRootFolder().GetMapOfItems();
        Iterator<Path> PathIterator = mapOfItems.keySet().iterator();
        while(PathIterator.hasNext()){
            Path path = PathIterator.next();
            if(mapOfItems.get(path).getSHA1().equals(i_sha1))
                return mapOfItems.get(path);
        }
        return null;
    }


    class ItemInfo {
        String m_ItemName = null;
        String m_ItemType = null;
        String m_Sha1 = null;
        ItemInfo[] m_ItemInfos = null;
        String m_FileContent = null;

        ItemInfo(String i_ItemName, String i_ItemType, String i_Sha1, ItemInfo[] i_ItemInfos,String i_FileContent) {
            m_ItemName = i_ItemName;
            m_ItemType = i_ItemType;
            m_Sha1 = i_Sha1;
            m_ItemInfos = i_ItemInfos;
            m_FileContent = i_FileContent;
        }
    }

    public ItemInfo GetRootFolderItemInfo() {
        return getItemInfo(engine.getCurrentRepository().getActiveBranch().getPointedCommit().getRootFolder());
    }

    public ItemInfo getItemInfo(Item i_item){
        ItemInfo itemInfoResult = null;
        String itemName = i_item.getName();
        String itemSha1 = i_item.getSHA1();

        List<ItemInfo> itemInfos = new ArrayList<>();

        if(i_item.getTypeOfFile().equals(Item.TypeOfFile.FOLDER)){
            Folder folder = (Folder)i_item;
            List<Item> itemsList = folder.getListOfItems();
            itemsList.forEach(itemInItemList -> {
                if (itemInItemList.getTypeOfFile().equals(Item.TypeOfFile.BLOB)) {
                    String fileContent = ((Blob)itemInItemList).getContent();
                    itemInfos.add(new ItemInfo(itemInItemList.getName(), Constants.FILE_TYPE, itemInItemList.getSHA1(), null,fileContent));

                } else{
                    itemInfos.add(new ItemInfo(itemInItemList.getName(), Constants.FOLDER_TYPE, itemInItemList.getSHA1(), null,null));
                }
            });
            itemInfoResult = new ItemInfo(itemName,Constants.FOLDER_TYPE,itemSha1, (ItemInfo[]) itemInfos.toArray(),null);
        }
        else{// it is a file
            itemInfoResult = new ItemInfo(itemName, Constants.FILE_TYPE, itemSha1, null,((Blob)i_item).getContent());
        }

        return itemInfoResult;
    }

}