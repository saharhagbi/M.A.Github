package servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "CalcServlet", urlPatterns = {"/calc"})
public class CalcServlet extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        processRequest(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        processRequest(request, response);

    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        response.setContentType("text/html;charset=UTF-8");

        String left;
        left = request.getParameter("left");

        int leftNum = Integer.parseInt(left);

        String right;
        right = request.getParameter("right");

        int rightNum = Integer.parseInt(right);
        String result = Integer.toString(leftNum + rightNum);

        try (PrintWriter out = response.getWriter())
        {
            out.println("<html a=\"test\">");
            out.println("<head>");
            out.println("<title>Servlet InitServlet</title>");
            out.println("</head>");
            out.println("<body>");

            out.println("<h2>" + result + "</h2>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}
