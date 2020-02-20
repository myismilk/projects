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

@WebServlet("/viewUserInfo")
public class viewUserInfo extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        int id = Integer.parseInt(request.getParameter("id"));
        String sql = "select nickName,des from userInfo where id=" + id;
        String sql02 = "select photoPath from photoPath where id=" + id;
        try {
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            String nickName = resultSet.getString("nickName");
            String signature = resultSet.getString("des");
            PreparedStatement preparedStatement02 = conn.prepareStatement(sql02);
            ResultSet resultSet02 = preparedStatement02.executeQuery();
            resultSet02.next();
            String photoPath = resultSet02.getString("photoPath");
            out.print("{");
            out.print("\"nickName\": \"" + nickName + "\",");
            out.print("\"photoPath\": \"" + photoPath + "\",");
            out.print("\"signature\": \"" + signature + "\"");
            out.print("}");
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
