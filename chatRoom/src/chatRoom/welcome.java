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

@WebServlet("/welcome")
public class welcome extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession();
        String nickName = (String)session.getAttribute("nickName");
        String userName = (String)session.getAttribute("userName");
        int userId = (int)session.getAttribute(session.getId());
        int roomId = Integer.parseInt(request.getParameter("roomId"));
        String sql = "insert into message(fromId,toId,msg,roomId) values(?,?,?,?)";
        try{
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1,0);
            preparedStatement.setInt(2,0);
            preparedStatement.setString(3,"欢迎"+nickName+"进入聊天室");
            preparedStatement.setInt(4,roomId);
            preparedStatement.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
