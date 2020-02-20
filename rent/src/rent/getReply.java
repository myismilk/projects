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

@WebServlet("/getReply")
public class getReply extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        String sql = "select user.username,forumreply.msg,forumreply.floorId\n" +
                "from user,forumreply\n" +
                "where forumreply.id = user.id  AND forumreply.isDeleted = false \n" +
                "order by forumreply.floorId";
        try {
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            out.print("[");
            while(resultSet.next()){
                String userName = resultSet.getString("user.username");
                String msg = resultSet.getString("forumReply.msg");
                int floorId = resultSet.getInt("forumReply.floorId");
                out.print("{");
                out.print("\"username\": \""+userName+"\",");
                out.print("\"msg\": \""+StrUtil.replaceSpecialStr(msg)+"\",");
                out.print("\"floorId\": \""+floorId+"\"");
                out.print("}");
                if(!resultSet.isLast()){
                    //System.out.println(resultSet.getRow());
                    out.println(",");
                }
            }
            /*out.print("{");
            out.print("\"exit\": \""+"xixihaha"+"\"");
            out.print("}");*/
            out.print("]");
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
