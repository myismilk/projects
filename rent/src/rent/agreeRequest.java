package rent;


import rent.DBUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/agreeRequest")
public class agreeRequest extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        try{
            int requestId = Integer.parseInt(request.getParameter("requestId"));
            Connection conn = DBUtil.getConn();
            //更新rentrequest表
            String sql = "update rentrequest set isDone = true where requestId="+requestId;
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.executeUpdate();
            //获取roomId用来更新room表,获取rId用来更新renter表
            String sql01 = "select roomId,rId from rentrequest where requestId="+requestId;
            PreparedStatement preparedStatement01 = conn.prepareStatement(sql01);
            ResultSet resultSet01 = preparedStatement01.executeQuery();
            resultSet01.next();
            int roomId = resultSet01.getInt("roomId");
            int renterId = resultSet01.getInt("rId");

            //更新room表
            String sql02 = "update room set isRented = true where roomId="+roomId;
            PreparedStatement preparedStatement02 = conn.prepareStatement(sql02);
            preparedStatement02.executeUpdate();

            //更新renter表
            String sql03 = "insert into renter(id,roomId) values(?,?)";
            PreparedStatement preparedStatement03 = conn.prepareStatement(sql03);
            preparedStatement03.setInt(1,renterId);
            preparedStatement03.setInt(2,roomId);
            preparedStatement03.executeUpdate();
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
