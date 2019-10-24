package MAGit.Servlets;

import MAGit.Utils.ServletUtils;
import System.Repository;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/pages/repositoryPage"})
public class RepositoryPage extends HttpServlet
{
    public static final String repoName = "repoName";
    public static final String REPOSITORY_PAGE_URL = "repositoryPage/repositoryPage.html";

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        response.setContentType("text/html");

        String repositoryNameClicked = request.getParameter(repoName);
        try
        {
            ServletUtils.getEngineAdapter(getServletContext()).initRepositoryInSystemByName(repositoryNameClicked);
        } catch (Exception e)
        {
            //todo
            // handle proper message in page -  there is problem in repository name clicked loading to system
            e.printStackTrace();
        }

        response.sendRedirect(REPOSITORY_PAGE_URL);
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo()
    {
        return "Short description";
    }// </editor-fold>
}
