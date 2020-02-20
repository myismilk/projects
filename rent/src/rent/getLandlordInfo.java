package rent;

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

import static rent.StrUtil.replaceSpecialStr;

@WebServlet("/getLandlordInfo")
public class getLandlordInfo extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException
    {
        try
        {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            Connection conn = DBUtil.getConn();
            HttpSession session = request.getSession();
            int userId = (int)session.getAttribute(session.getId());
            String sql = "select landlord.landlordId, room.roomId, room.roomType, room.rent,room.maxRenter,room.addr, room.des,room.isRented,photo.photoPath\n" +
                    "from room,landlord,photo\n" +
                    "where room.roomId = landlord.roomId AND photo.roomId = room.roomId AND landlord.isDeleted = 0 AND room.isDeleted = 0 AND landlord.id="+userId;
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            out.println("[");
            while(resultSet.next())
            {
                int roomId = resultSet.getInt("room.roomId");
                int landlordId = resultSet.getInt("landlord.landlordId");
                String roomType = replaceSpecialStr(resultSet.getString("room.roomType"));
                String rent = replaceSpecialStr(resultSet.getString("room.rent"));
                String addr = replaceSpecialStr(resultSet.getString("room.addr"));
                String des = replaceSpecialStr(resultSet.getString("room.des"));
                String maxRenter = replaceSpecialStr(resultSet.getString("room.maxRenter"));
                String isRented =resultSet.getString("room.isRented");
                String photoPath =resultSet.getString("photo.photoPath");
                out.println("{");
                out.println("\"roomId\": \""+roomId+"\",");
                out.println("\"landlordId\": \""+landlordId+"\",");
                out.println("\"roomType\": \"" + roomType + "\",");
                out.println("\"des\": \"" + des + "\",");
                out.println("\"rent\": \"" + rent + "\",");
                out.println("\"maxRenter\": \"" + maxRenter + "\",");
                out.println("\"addr\": \"" + addr + "\",");
                out.println("\"photoPath\": \""+photoPath+"\",");
                out.println("\"isRented\": \""+isRented+"\"");
                out.println("}");
                if(!resultSet.isLast())
                    out.println(",");
            }
            out.println("]");
            out.close();
        }catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}
