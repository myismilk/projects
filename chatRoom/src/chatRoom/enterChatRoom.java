package chatRoom;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/enterChatRoom")
public class enterChatRoom extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        //System.out.println("exit");
        HttpSession session = request.getSession();
        String nickName = (String)session.getAttribute("nickName");
        String userName = (String)session.getAttribute("userName");
        String roomPassword = request.getParameter("roomPassword");
        int roomId = Integer.parseInt(request.getParameter("roomId"));
        int userId = (int)session.getAttribute(session.getId());
        String sql = "select inviteCode from chatRoomList where isDeleted=0 and roomId ="+roomId;
        try{
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            String returnPassword = resultSet.getString("inviteCode");
            if(returnPassword.equals(roomPassword)){
                CallableStatement callableStatement = conn.prepareCall("call member(?,?)");
                callableStatement.setInt(1,roomId);
                callableStatement.setInt(2,userId);
                callableStatement.execute();
                out.print("chatRoom.html?loginName="+userName+"&roomId="+roomId+"&nickName="+nickName);
            }else{
                out.print(false);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
