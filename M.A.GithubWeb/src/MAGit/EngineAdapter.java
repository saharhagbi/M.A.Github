package MAGit;

import MAGit.Utils.ServletUtils;
import System.Engine;
import XmlObjects.XMLMain;

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
}
