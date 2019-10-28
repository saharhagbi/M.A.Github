package MAGit.Servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "PushBranch", urlPatterns = {"/pages/repositoryHub/pushBranch"})
public class PushBranch extends HttpServlet
{
    private final String PULL_REQUEST_URL = "repositoryPage.html";


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException
    {
        response.sendRedirect(PULL_REQUEST_URL);
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html");
    }

}
