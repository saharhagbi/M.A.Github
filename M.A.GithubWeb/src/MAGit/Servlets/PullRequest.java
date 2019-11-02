package MAGit.Servlets;

import MAGit.Utils.ServletUtils;
import MAGit.Utils.SessionUtils;
import System.Users.User;
import github.users.UserManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "PullRequest", urlPatterns = {"/pages/repositoryHub/pullrequest"})
public class PullRequest extends HttpServlet
{
    private final String PULL_REQUEST_URL = "repositoryPage.html";


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException
    {
        proccessRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        proccessRequest(request, response);
    }

    private void proccessRequest(HttpServletRequest request, HttpServletResponse response)
    {
        response.setContentType("text/html");

        //need to get 3 params

        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        User loggedInUser = userManager.getUserByName(SessionUtils.getUsername(request));

        try
        {
            ServletUtils.getEngineAdapter(getServletContext()).sendPullRequest(loggedInUser);
        } catch (Exception e)
        {
            //todo-
            // message in UI
            e.printStackTrace();
        }

    }

}
