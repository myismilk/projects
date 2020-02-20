package rent;

import rent.DBUtil;

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

import static rent.StrUtil.replaceSpecialStr;

@WebServlet("/downloadInfo")
public class downloadInfo extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            PrintWriter out = resp.getWriter();
            HttpSession session = req.getSession();
            int userId = (int) session.getAttribute(session.getId());
            String userPath = "empty";
            Connection conn = DBUtil.getConn();
            //获取用户头像图片的存储地址
            String sql0 = "select photoPath \n" +
                    "from userpath\n" +
                    "where id =" + userId;
            PreparedStatement preparedStatement0 = conn.prepareStatement(sql0);
            ResultSet resultSet0 = preparedStatement0.executeQuery();
            if(resultSet0.next()){
                resultSet0.last();
                userPath = resultSet0.getString("photoPath");
            }
            String sql = "select photoPath,roomType,des,rent,maxRenter,addr,isRented,room.roomId\n" +
                    "from photo,room\n" +
                    "where photo.roomId= room.roomId AND room.isDeleted = 0";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            out.println("[");
            while (resultSet.next()) {
                String photoPath = resultSet.getString("photoPath");
                String roomType = replaceSpecialStr(resultSet.getString("roomType"));
                String rent = replaceSpecialStr(resultSet.getString("rent"));
                String addr = replaceSpecialStr(resultSet.getString("addr"));
                String des = replaceSpecialStr(resultSet.getString("des"));
                String maxRenter = replaceSpecialStr(resultSet.getString("maxRenter"));
                String isRented = resultSet.getString("isRented");
                int roomId = resultSet.getInt("room.roomId");
                //查询当前room是否正处于租户申请状态
                String sql02 = "select requestId from rentrequest where roomId ="+roomId+" and isDeleted=0 and isDone=0";
                PreparedStatement preparedStatement02 = conn.prepareStatement(sql02);
                ResultSet resultSet02 = preparedStatement02.executeQuery();
                boolean isOver = true;
                if(resultSet02.next()){
                    isOver = false;
                }

                out.println("{");
                out.println("\"photoPath\": \"" + photoPath + "\",");
                out.println("\"roomType\": \"" + roomType + "\",");
                out.println("\"des\": \"" + des + "\",");
                out.println("\"rent\": \"" + rent + "\",");
                out.println("\"maxRenter\": \"" + maxRenter + "\",");
                out.println("\"addr\": \"" + addr + "\",");
                out.println("\"isRented\": \"" + isRented + "\",");
                out.println("\"isOver\": \"" + isOver + "\",");
                out.println("\"roomId\": \"" + roomId + "\"");
                out.println("}");
                out.println(",");
            }
            out.println("{");
            out.println("\"userPicture\": \""+userPath+"\"");
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
