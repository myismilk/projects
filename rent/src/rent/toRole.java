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
import java.sql.ResultSet;

@WebServlet("/toRole")
public class toRole extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        try{
            Connection conn = DBUtil.getConn();
            HttpSession session = request.getSession();
            int userId = (int)session.getAttribute(session.getId());
            String userName = (String)session.getAttribute("userName");
            //查看该用户的个人信息是否已经上传
            String sql01 = "select id from landlordInfo where id="+userId+" and isDeleted=0";
            String sql02 = "select id from renterInfo where id="+userId+" and isDeleted=0";
            String renterMark = "0";
            String landlordMark = "0";
            PreparedStatement preparedStatement01 = conn.prepareStatement(sql01);
            ResultSet resultSet01 = preparedStatement01.executeQuery();
            if(resultSet01.next()){
                landlordMark ="1";
            }
            PreparedStatement preparedStatement02 = conn.prepareStatement(sql02);
            ResultSet resultSet02 = preparedStatement02.executeQuery();
            if(resultSet02.next()){
                renterMark = "1";
            }
            out.print("role.html?loginName="+ userName+"&landlord="+landlordMark+"&renter="+renterMark);
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
