package rent;


import rent.DBUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;

@WebServlet("/deleteLandlord")
public class deleteLandlord extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            int landlordId = Integer.parseInt(request.getParameter("landlordId"));
            int roomId = Integer.parseInt(request.getParameter("roomId"));
            Connection conn = DBUtil.getConn();
            CallableStatement callableStatement = conn.prepareCall("call deleteLandlord(?,?)");
            callableStatement.setInt(1,landlordId);
            callableStatement.setInt(2,roomId);
            callableStatement.executeUpdate();
            out.println("待租房屋的信息已经成功删除！");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
