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
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/rentRequestRenter")
public class rentRequestRenter extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        try{
            Connection conn = DBUtil.getConn();
            HttpSession session = request.getSession();
            int roomId = Integer.parseInt(request.getParameter("roomId"));
            int renterId = (int)session.getAttribute(session.getId());
            String sql01 = "select id from landlord where roomId="+roomId;
            PreparedStatement preparedStatement01 = conn.prepareStatement(sql01);
            ResultSet resultSet01 = preparedStatement01.executeQuery();
            resultSet01.next();
            int landlordId = resultSet01.getInt("id");
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyymmddhhmmss");
            Date date = new Date();
            String time = simpleDateFormat.format(date);
            String sql02 = "insert into rentrequest(rId,lId,roomId,requestTime) values (?,?,?,?)";
            PreparedStatement preparedStatement02 = conn.prepareStatement(sql02);
            preparedStatement02.setInt(1,renterId);
            preparedStatement02.setInt(2,landlordId);
            preparedStatement02.setInt(3,roomId);
            preparedStatement02.setString(4,time);
            preparedStatement02.executeUpdate();
            out.print("申请已提交!");
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
