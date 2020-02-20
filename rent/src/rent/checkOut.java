package rent;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;

@WebServlet("/checkOut")
public class checkOut extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            int renterId = Integer.parseInt(request.getParameter("renterId"));
            int roomId = Integer.parseInt(request.getParameter("roomId"));
            //System.out.println(renterId);
            Connection conn = DBUtil.getConn();
            CallableStatement callableStatement = conn.prepareCall("call checkOut(?,?)");
            callableStatement.setInt(1,renterId);
            callableStatement.setInt(2,roomId);
            callableStatement.executeUpdate();
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            out.println("退房成功，期待您的下一次租房！");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
