<%@ page import="MAGit.Constants.Constants" %>
<%@ page import="MAGit.Utils.SessionUtils" %><%--
  Created by IntelliJ IDEA.
  User: tom
  Date: 15/15/2019
  Time: 20:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Logout</title>
</head>
<body>

<div class="container">
    <% Object usernameLogout = request.getAttribute(Constants.LOGGED_OUT_USER_NAME);%>
    <% if (usernameLogout != null) {%>
    <h3><%=usernameLogout%> logged out</h3>
    <a href="../index.html">Back to home page</a>
    <br/>
    <% } %>
</div>
</body>
</html>
