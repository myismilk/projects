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

@WebServlet("/landlordInfo")
public class landlordInfo extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String landlordName = request.getParameter("userName");
        String landlordAddr = request.getParameter("userAddr");
        String landlordTel = request.getParameter("userTel");
        HttpSession session = request.getSession();
        int userId = (int)session.getAttribute(session.getId());
        String userName = (String)session.getAttribute("userName");
        try{
            Connection conn = DBUtil.getConn();
            String sql ="insert into landlordInfo(id,na,tel,addr) values(?,?,?,?)";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1,userId);
            preparedStatement.setString(2,landlordName.trim());
            preparedStatement.setString(3,landlordTel.trim());
            preparedStatement.setString(4,landlordAddr.trim());
            preparedStatement.executeUpdate();
            response.sendRedirect("rent/landlord.html?loginName="+userName);
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
