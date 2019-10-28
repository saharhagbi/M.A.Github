package MAGit.Servlets;

import MAGit.Utils.ServletUtils;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "NewBranch", urlPatterns = {"/pages/repositoryPage/newBranch"})
public class NewBranch extends HttpServlet
{
    private static final String BRANCH_NAME = "branchName";
    private static final String BRANCH_TYPE = "branchType";
    private static final String LocalBranch = "1";
    private static final String RTB = "2";
    private static final String SHA1_COMMIT = "sha1";
    private static final String REPOSITORY_PAGE_URL = "repositoryPage.html";

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

    private void proccessRequest(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        String branchName = request.getParameter(BRANCH_NAME);
        String branchType = request.getParameter(BRANCH_TYPE);

        try
        {
            switch (branchType)
            {
                case LocalBranch:
                    String sha1Commit = request.getParameter(SHA1_COMMIT);

                    ServletUtils.getEngineAdapter(getServletContext()).createNewLocalBranch(branchName, sha1Commit);
                    break;

                case RTB:
                    String rtbName = ServletUtils.getEngineAdapter(getServletContext()).createNewRTB(branchName);
                    returnRTBNameInResponse(rtbName, response);
                    break;
            }

        } catch (Exception e)
        {
            //todo -
            // handle proper message in UI
            e.printStackTrace();
        } finally
        {
            response.sendRedirect(REPOSITORY_PAGE_URL);
        }
    }

    private void returnRTBNameInResponse(String rtbName, HttpServletResponse response) throws IOException
    {
        try (PrintWriter out = response.getWriter())
        {
            Gson gson = new Gson();
            String json = gson.toJson(rtbName);

            out.println(json);
            out.flush();
        }
    }
}