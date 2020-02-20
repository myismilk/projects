package chatRoom;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet("/returnToLobby")
public class returnToLobby extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession();
        int userId = (int)session.getAttribute(session.getId());
        String userName = (String)session.getAttribute("userName");
        String sql = "update roomMember set isOnline = false where id ="+userId;
        try{
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.execute();
            response.sendRedirect("chatRoom/lobby.html?loginName="+userName);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
