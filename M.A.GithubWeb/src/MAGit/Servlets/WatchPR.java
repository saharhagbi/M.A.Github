package MAGit.Servlets;

import MAGit.Utils.ServletUtils;
import MAGit.Utils.SessionUtils;
import Objects.Item;
import System.FolderDifferences;
import System.Users.User;
import github.PullRequestLogic;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = {"/pages/repositoryPage/pull/pullRequest/watchPR"})
public class WatchPR extends HttpServlet {
    private final String PR_ID = "PRID";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        proccessRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        proccessRequest(request, response);
    }

    private void proccessRequest(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/html");

        String prID = request.getParameter(PR_ID);

        User loggedInUser = ServletUtils.getUserManager(getServletContext()).getUserByName(SessionUtils.getUsername(request));
        int id = Integer.parseInt(prID);
        List<Path> paths = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Path p = Paths.get("C:\\helloWorlddd" + "\\" + i+".txt");
            paths.add(p);
        }
        //and later the notify user will show the CARD that represent the pr
        try {
            PullRequestLogic pullRequest = ServletUtils.getEngineAdapter(getServletContext()).getPullRequestInstance(loggedInUser, id);
            FolderDifferences differences = ServletUtils.getEngineAdapter(getServletContext()).GetChangesFromPullRequestLogic(pullRequest, loggedInUser);
            try (PrintWriter out = response.getWriter()) {
                paths.forEach(path -> {
                    out.println(path.subpath(3, path.getNameCount()));
                });

/*                differences.getAddedItemList().forEach(item -> {
                    if (item.getTypeOfFile().equals(Item.TypeOfFile.BLOB)) {
                        out.println(item.GetPath().subpath(3, item.GetPath().getNameCount()));
                    }
                });
                differences.getChangedItemList().forEach(item -> {
                    if (item.getTypeOfFile().equals(Item.TypeOfFile.BLOB)) {
                        out.println(item.GetPath().subpath(3, item.GetPath().getNameCount()));
                    }
                });
                differences.getRemovedItemList().forEach(item -> {
                    if (item.getTypeOfFile().equals(Item.TypeOfFile.BLOB)) {
                        out.println(item.GetPath().subpath(3, item.GetPath().getNameCount()));
                    }
                });*/
                out.flush();
                out.close();
            }

        } catch (Exception e) {
            //todo-
            // message in UI
            e.printStackTrace();
        }

    }
}
