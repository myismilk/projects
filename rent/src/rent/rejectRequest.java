package rent;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet("/rejectRequest")
public class rejectRequest extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        int requestId = Integer.parseInt(request.getParameter("requestId"));
        try{
            Connection conn = DBUtil.getConn();
            String sql = "update rentrequest set isDone = true where requestId="+requestId;
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
