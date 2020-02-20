package chatRoom;


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

@WebServlet("/getMemberList")
public class getMemberList extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        request.setCharacterEncoding("UTF-8");
        //System.out.println("exit!!!");
        int roomId = Integer.parseInt(request.getParameter("roomId"));
        PrintWriter out = response.getWriter();
        //System.out.println("exit!!!");
        out.print("[");
        try{
            Connection conn = DBUtil.getConn();
            String sql = "select nickName,isOnline,userInfo.id\n" +
                    "from roomMember,userInfo\n" +
                    "where roomMember.id = userInfo.id and roomId="+roomId;
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()){
                String nickName = resultSet.getString("nickName");
                Boolean isOnline = resultSet.getBoolean("isOnline");
                int id = resultSet.getInt("userInfo.id");
                out.print("{");
                out.print("\"isOnline\": \""+isOnline+"\",");
                out.print("\"id\": \""+id+"\",");
                out.print("\"nickName\": \""+nickName+"\"");
                out.print("}");
                if(!resultSet.isLast()){
                    out.print(",");
                }
            }
            out.print("]");
        }catch(Exception e){
            e.printStackTrace();
        }
        out.close();
    }
}
