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

@WebServlet("/showInfo")
public class showInfo extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        int userId = (int) session.getAttribute(session.getId());
        String sql = "select nickName,des from userInfo where id=" + userId;
        try {
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()){
                String nickName = resultSet.getString("nickName");
                String signature = resultSet.getString("des");
                out.print("{");
                out.print("\"nickName\": \""+nickName+"\",");
                out.print("\"signature\": \""+signature+"\"");
                out.print("}");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
