package chatRoom;

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

import static chatRoom.StrUtil.replaceSpecialStr;

@WebServlet("/downloadRooms")
public class downloadRooms extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            PrintWriter out = resp.getWriter();
            HttpSession session = req.getSession();
            int userId = (int) session.getAttribute(session.getId());
            Connection conn = DBUtil.getConn();
            //获取用户头像图片的存储地址
            String picPath = ""; //存储头像图片地址
            String sql0 = "select photoPath \n" +
                    "from photoPath\n" +
                    "where isDeleted = false and id =" + userId;
            PreparedStatement preparedStatement0 = conn.prepareStatement(sql0);
            ResultSet resultSet0 = preparedStatement0.executeQuery();
            if(resultSet0.next()){
                picPath = resultSet0.getString("photoPath");
            }
            String sql = "select roomId,id,inviteCode,des,roomName\n" +
                    "from chatRoomList\n" +
                    "where  isDeleted = 0";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            out.println("[");
            while (resultSet.next()) {
                int roomId = resultSet.getInt("roomId");
                int id = resultSet.getInt("id");
                //获取房主名称
                String roomAuthor = "";
                String sql02 = "select nickName from userInfo where isDeleted=0 and id="+id;
                PreparedStatement preparedStatement02 = conn.prepareStatement(sql02);
                ResultSet resultset02 = preparedStatement02.executeQuery();
                resultset02.next();
                roomAuthor = resultset02.getString("nickName");
                String inviteCode = replaceSpecialStr(resultSet.getString("inviteCode"));
                String des = replaceSpecialStr(resultSet.getString("des"));
                String roomName = replaceSpecialStr(resultSet.getString("roomName"));
                out.println("{");
                out.println("\"des\": \"" + des + "\",");
                out.println("\"roomId\": \"" + roomId + "\",");
                out.println("\"id\": \"" + id + "\",");
                out.println("\"roomName\": \"" + roomName + "\",");
                out.println("\"inviteCode\": \"" + inviteCode + "\",");
                out.println("\"roomAuthor\": \"" + roomAuthor + "\",");
                out.println("\"roomName\": \"" + roomName + "\"");
                out.println("}");
                out.println(",");
            }
            out.println("{");
            out.println("\"picPath\": \""+picPath+"\",");
            out.println("\"myId\": \""+userId+"\"");
            out.println("}");
            out.println("]");
            out.close();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        doPost(req, resp);
    }
}
