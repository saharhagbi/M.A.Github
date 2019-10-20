package MAGit.Servlets;

import MAGit.Utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Scanner;

@WebServlet(name = "RepositoryUpload", urlPatterns = {"/pages/repository/upload"})
@MultipartConfig(fileSizeThreshold = 1024 * 1024, maxFileSize = 1024 * 1024 * 5, maxRequestSize = 1024 * 1024 * 5 * 5)
public class RepositoryUpload extends HttpServlet
{
    //private final String REPO_FILE = "repoFile";
    private final String REPOSITORY_HUB_URL = "repositoryHub.html";


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.sendRedirect(REPOSITORY_HUB_URL);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html");

        Collection<Part> parts = request.getParts();

        StringBuilder contentBuilder = new StringBuilder();

        for (Part part : parts)
        {
            contentBuilder.append(readFromInputStream(part.getInputStream()));
        }

        String fileContent = contentBuilder.toString();
        if (fileContent == null || fileContent.isEmpty())
            response.sendRedirect(REPOSITORY_HUB_URL);

        String currentUserName = ServletUtils.getUserManager(getServletContext()).getCurrentUserName();

        try
        {
            ServletUtils.getEngineAdapter(getServletContext()).readRepositoryFromXMLFile(fileContent, currentUserName);
        } catch (Exception e)
        {
            //todo -
            //  xmlFile is not valid, show proper message
            e.printStackTrace();
        }

        response.sendRedirect(REPOSITORY_HUB_URL);
    }

    private String readFromInputStream(InputStream inputStream)
    {
        return new Scanner(inputStream).useDelimiter("\\Z").next();
    }
}