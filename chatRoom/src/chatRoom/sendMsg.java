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

@WebServlet("/sendMsg")
public class sendMsg extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        String nickName = (String) session.getAttribute("nickName");
        String inputArea = request.getParameter("inputArea");
        int roomId = Integer.parseInt(request.getParameter("roomId"));
        int userId = (int) session.getAttribute(session.getId());
        int toId = Integer.parseInt(request.getParameter("toId"));
        String sql = "insert into message(fromId,toId,msg,roomId) values(?,?,?,?)";
        try {
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2,toId);
            preparedStatement.setString(3,inputArea.trim());
            preparedStatement.setInt(4,roomId);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
