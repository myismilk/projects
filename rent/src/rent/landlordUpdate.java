package rent;


import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;

@WebServlet("/landlordUpdate")
public class landlordUpdate extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            Connection conn = DBUtil.getConn();
            CallableStatement callableStatement = conn.prepareCall("call landlordUpdate(?,?,?,?,?,?)");
            String roomType = request.getParameter("roomType");
            String description = request.getParameter("des");
            String rent = request.getParameter("rent");
            String maxRenter = request.getParameter("maxRenter");
            String addr = request.getParameter("addr");
            int roomId = Integer.parseInt(request.getParameter("roomId"));
            callableStatement.setString(1,roomType);
            callableStatement.setString(2,description);
            callableStatement.setString(3,rent);
            callableStatement.setString(4,maxRenter);
            callableStatement.setString(5,addr);
            callableStatement.setInt(6,roomId);
            callableStatement.executeUpdate();
            out.println("数据修改成功！");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
