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
import java.sql.ResultSet;

@WebServlet("/forum")
public class forum extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        //System.out.println("teastete");
        try {
            Connection conn = DBUtil.getConn();
            String sql = "select user.id,user.username,forum.msg,forum.floorId\n" +
                    "from user, forum\n" +
                    "where user.id = forum.id AND forum.isDeleted = false";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            out.println("[");
            while (resultSet.next()) {
                int tempUserId = resultSet.getInt("user.id");
                String userPhotoPath ="empty";
                String sql2 = "select photoPath \n" +
                        "from userpath\n" +
                        "where id =" + tempUserId;
                PreparedStatement preparedStatement1 = conn.prepareStatement(sql2);
                ResultSet resultSet1 = preparedStatement1.executeQuery();
                if(resultSet1.next()){
                    resultSet1.last();
                    userPhotoPath = resultSet1.getString("photoPath");
                }
                String userName = resultSet.getString("username");
                String msg = resultSet.getString("msg");
                int floorId = resultSet.getInt("forum.floorId");
                out.print("{");
                out.print("\"userPicture\": \""+userPhotoPath+"\",");
                out.print("\"username\": \"" + userName + "\",");
                out.print("\"msg\": \"" + msg + "\",");
                out.print("\"floorId\": \"" + floorId + "\"");
                out.print("}");
                if (!resultSet.isLast()) {
                    out.println(",");
                }
            }
            out.println("]");
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
