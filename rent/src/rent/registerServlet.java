package rent;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/registerServlet")
public class registerServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("GBK");
        response.setContentType("text/html;charset=gbk");
        PrintWriter out = response.getWriter();
        String userName = request.getParameter("userName");
        String userPassword = new MD5().GetMD5Code(request.getParameter("userPassword"));
        //System.out.println(userName+" "+userPassword);
        try {
            Connection conn = DBUtil.getConn();
            String sql0 = "select id from user where username =\"" + userName+"\"";
            PreparedStatement preparedStatement = conn.prepareStatement(sql0);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                out.print("用户名已经注册请重新输入！");
            } else {
                String sql = "insert into user(username,pw) values(?,?)";
                PreparedStatement ps = conn.prepareStatement(sql);
                ps.setString(1, userName);
                ps.setString(2, userPassword);
                //判断是否成功将数据写入数据库
                ps.executeUpdate();
                out.print("注册成功！");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
