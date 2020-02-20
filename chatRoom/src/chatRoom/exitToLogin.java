package chatRoom;


import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/exitToLogin")
public class exitToLogin extends HttpServlet
{
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException
    {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession session = request.getSession();
        //System.out.println(session.getId());
        session.removeAttribute("userName");
        session.removeAttribute("userId");
        response.sendRedirect("chatRoom/login.html");
    }
}
