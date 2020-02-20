package rent;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/exit")
public class exit extends HttpServlet {
    protected void doPost(HttpServletRequest request,HttpServletResponse response){
        try{
            HttpSession session = request.getSession();
            session.removeAttribute("userName");
            session.removeAttribute("userId");
            response.sendRedirect("rent/login.html");
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
