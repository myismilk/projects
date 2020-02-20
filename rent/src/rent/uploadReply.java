package rent;

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

@WebServlet("/uploadReply")
public class uploadReply extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        String msg = request.getParameter("msg");
        String floorId = request.getParameter("floorId");
        int floor = Integer.parseInt(floorId.trim());
        int userId = (int) session.getAttribute(session.getId());
        //System.out.println("msg:"+msg+" userId"+ userId+" floorId:"+floor);
        try {
            Connection conn = DBUtil.getConn();
            String sql = "insert into forumreply(floorId,id,msg) values(?,?,?)";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1,floor);
            preparedStatement.setInt(2,userId);
            preparedStatement.setString(3,msg);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
