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

@WebServlet("/getMsg")
public class getMsg extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        String inputArea = request.getParameter("inputArea");
        int roomId = Integer.parseInt(request.getParameter("roomId"));
        int lastMessage = Integer.parseInt((request.getParameter("lastMessage")));
        int userId = (int) session.getAttribute(session.getId());
        int lastId = -1;
        String fromUser = "";
        String toUser = "";
        //System.out.println(lastMessage);
        String sql0 = "select * from message where roomId =" + roomId + " order by messageid desc limit 1";
        String sql;
        //System.out.println(lastMessage);
        if (lastMessage == -1)
            sql = "select * from message where isDeleted=0 and roomId=" + roomId;
        else
            sql = "select * from message where isDeleted=0 and roomId=" + roomId +" and messageId > "+lastMessage;
        try {
            Connection conn = DBUtil.getConn();

            PreparedStatement preparedStatement0 = conn.prepareStatement(sql0);
            ResultSet resultSet0 = preparedStatement0.executeQuery();
            resultSet0.next();
            lastId = resultSet0.getInt(("messageId"));
            //System.out.println(lastId);
            out.print("[");
            if (lastId > lastMessage) {
                PreparedStatement preparedStatement = conn.prepareStatement(sql);
                ResultSet resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    String msg = resultSet.getString("msg");
                    int fromId = resultSet.getInt("fromId");
                    int toId = resultSet.getInt("toId");
                    if (fromId == userId) {
                        fromUser = "你";
                    } else if (fromId == 0) {
                        fromUser = "系统";
                    } else {
                        String sql02 = "select nickName from userInfo where id=" + fromId;
                        PreparedStatement preparedstatement02 = conn.prepareStatement(sql02);
                        ResultSet resultSet02 = preparedstatement02.executeQuery();
                        resultSet02.next();
                        fromUser = resultSet02.getString("nickName");
                    }
                    if (toId == 0) {
                        toUser = "public";
                    } else if (toId == -1) {
                        toUser = "download";
                    } else if (toId == userId) {
                        toUser = "你";
                    } else {
                        String sql03 = "select nickName from userInfo where id=" + toId;
                        PreparedStatement preparedstatement03 = conn.prepareStatement(sql03);
                        ResultSet resultSet03 = preparedstatement03.executeQuery();
                        resultSet03.next();
                        toUser = resultSet03.getString("nickName");
                    }
                    out.print("{");
                    out.print("\"fromUser\":\"" + fromUser + "\",");
                    out.print("\"toUser\":\"" + toUser + "\",");
                    out.print("\"msg\":\"" + msg + "\"");
                    out.print("}");
                    out.print(",");
                }
            }
            out.print("{");
            out.print("\"lastMessage\":\"" + lastId + "\"");
            out.print("}");
            out.print("]");
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
