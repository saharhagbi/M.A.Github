package MAGit.Servlets;

import MAGit.Utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "Checkout", urlPatterns = {"/pages/repositoryPage/checkout"})
public class Checkout extends HttpServlet
{
    private static final String BRANCH_NAME = "branchName";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
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
        String branchName = request.getParameter(BRANCH_NAME);

        try
        {
            ServletUtils.getEngineAdapter(getServletContext()).checkout(branchName);
        } catch (Exception e)
        {
            //todo -
            // handle proper message in UI
            e.printStackTrace();
        }
    }
}