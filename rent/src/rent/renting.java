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

@WebServlet("/renting")
public class renting extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        try
        {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            //resp.setContentType("application/json;charset=utf-8");
            PrintWriter out = response.getWriter();
            HttpSession session = request.getSession();
            int userId = (int)session.getAttribute(session.getId());
            String sql = "select rId,roomId,requestId from rentrequest where isDone=0 and lId="+userId;
            Connection conn = DBUtil.getConn();
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            int renterId = -1;
            while(resultSet.next()){
                if(resultSet.isFirst()){
                    out.print("[");
                    out.print("{");
                    out.print("\"empty\": \""+1+"\"");
                    out.print("}");
                    out.print(",");
                }
                renterId = resultSet.getInt("rId");
                int roomId = resultSet.getInt("roomId");
                int requestId = resultSet.getInt("requestId");
                //System.out.println(renterId);
                String sql02 = "select user.username,renterInfo.tel from user,renterInfo where user.id="+renterId +" and renterInfo.id ="+renterId;
                PreparedStatement preparedStatementTemp = conn.prepareStatement(sql02);
                ResultSet resultSetTemp = preparedStatementTemp.executeQuery();
                resultSetTemp.next();
                String renterName = resultSetTemp.getString("user.username");
                String renterTel = resultSetTemp.getString("renterInfo.tel");
                out.print("{");
                out.print("\"name\": \""+renterName+"\",");
                out.print("\"requestId\": \""+requestId+"\",");
                out.print("\"roomId\": \""+roomId+"\",");
                out.print("\"tel\": \""+renterTel+"\"");
                out.print("}");
                if(!resultSet.isLast()){
                    out.print(",");
                }else{
                    out.print("]");
                }
            }
            if(renterId == -1){
                out.print("[");
                out.print("{");
                out.print("\"num\": \""+0+"\"");
                out.print("}");
                out.print("]");
            }
            out.close();
            //System.out.println(arg1);
            //out.println("success!!!");
        } catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}
