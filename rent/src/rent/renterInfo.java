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

@WebServlet("/renterInfo")
public class renterInfo extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String renterName = request.getParameter("userName");
        String renterAddr = request.getParameter("userAddr");
        String renterTel = request.getParameter("userTel");
        String renterBir = request.getParameter("userBirth");
        String renterSex = request.getParameter("userSex");
        HttpSession session = request.getSession();
        int userId = (int)session.getAttribute(session.getId());
        String userName = (String)session.getAttribute("userName");
        try{
            Connection conn = DBUtil.getConn();
            String sql ="insert into renterInfo(id,sex,birth,na,tel,addr) values(?,?,?,?,?,?)";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1,userId);
            preparedStatement.setString(2,renterSex.trim());
            preparedStatement.setString(3,renterBir.trim());
            preparedStatement.setString(4,renterName.trim());
            preparedStatement.setString(5,renterTel.trim());
            preparedStatement.setString(6,renterAddr.trim());
            preparedStatement.executeUpdate();
            out.print(userName);
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
