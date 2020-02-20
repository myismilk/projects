package chatRoom;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/createRoom")
public class createRoom extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession();
        String userName = (String)session.getAttribute("userName");
        int userId = (int)session.getAttribute(session.getId());
        PrintWriter out = response.getWriter();
        String roomName = request.getParameter("roomName");
        String roomDes = request.getParameter("roomDes");
        String roomPassword = request.getParameter("roomPassword");
        try{
            Connection conn = DBUtil.getConn();
            String sql = "insert into chatRoomList(id,inviteCode,des,roomName) values(?,?,?,?)";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1,userId);
            preparedStatement.setString(2,roomPassword);
            preparedStatement.setString(3,roomDes);
            preparedStatement.setString(4,roomName);
            preparedStatement.executeUpdate();
            //更新该聊天室的成员列表
            String sql1 = "select max(roomId) from chatRoomList where isDeleted =0";
            PreparedStatement preparedStatement1 = conn.prepareStatement(sql1);
            ResultSet resultSet = preparedStatement1.executeQuery();
            resultSet.next();
            int roomId = resultSet.getInt("max(roomId)");
            //System.out.println(resultSet.getString("max(roomId)"));

            String sql2 = "insert into roomMember(id,roomId) values(?,?)";
            PreparedStatement preparedStatement2 = conn.prepareStatement(sql2);
            preparedStatement2.setInt(1,userId);
            preparedStatement2.setInt(2,roomId);
            preparedStatement2.executeUpdate();
            response.sendRedirect("chatRoom/lobby.html?loginName="+ userName);
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
