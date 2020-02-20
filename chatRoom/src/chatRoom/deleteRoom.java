package chatRoom;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet("/deleteRoom")
public class deleteRoom extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        int roomId = Integer.parseInt(request.getParameter("roomId"));
        try{
            Connection conn = DBUtil.getConn();
            String sql = "update chatRoomList set isDeleted = 1 where roomId="+roomId;
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
