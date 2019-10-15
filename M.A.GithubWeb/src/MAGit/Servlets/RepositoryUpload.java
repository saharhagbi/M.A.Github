package MAGit.Servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.Scanner;

@WebServlet(name = "RepositoryUpload", urlPatterns = {"/pages/repository/upload"})
public class RepositoryUpload extends HttpServlet
{
    private final String REPO_FILE = "repoFile";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.sendRedirect("fileupload/form.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html");
        //todo: need to check if file is null

        Collection<Part> parts = request.getParts();

        String repoFile = request.getParameter(REPO_FILE);


       /* out.println("<h2> Total parts : " + parts.size() + "</h2>");

        StringBuilder fileContent = new StringBuilder();

        for (Part part : parts)
        {
            printPart(part, out);

            //to write the content of the file to an actual file in the system (will be created at c:\samplefile)
            part.write("samplefile");

            //to write the content of the file to a string
            fileContent.append(readFromInputStream(part.getInputStream()));
        }

        printFileContent(fileContent.toString(), out);*/
    }

    private void printPart(Part part, PrintWriter out)
    {
        StringBuilder sb = new StringBuilder();
        sb.append("<p>")
                .append("Parameter Name (From html form): ").append(part.getName())
                .append("<br>")
                .append("Content Type (of the file): ").append(part.getContentType())
                .append("<br>")
                .append("Size (of the file): ").append(part.getSize())
                .append("<br>");
        for (String header : part.getHeaderNames())
        {
            sb.append(header).append(" : ").append(part.getHeader(header)).append("<br>");
        }
        sb.append("</p>");
        out.println(sb.toString());

    }

    private String readFromInputStream(InputStream inputStream)
    {
        return new Scanner(inputStream).useDelimiter("\\Z").next();
    }

    private void printFileContent(String content, PrintWriter out)
    {
        out.println("<h2>File content:</h2>");
        out.println("<textarea style=\"width:100%;height:400px\">");
        out.println(content);
        out.println("</textarea>");
    }
}

