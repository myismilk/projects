package chatRoom;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/login")
public class login extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        request.setCharacterEncoding("GBK");
        response.setContentType("text/html;charset=gbk");
        PrintWriter out = response.getWriter();
        try
        {
            Connection conn = DBUtil.getConn();
            CallableStatement callableStatement = conn.prepareCall("call loginValidation(?,?,?,?)");
            callableStatement.setString(3,request.getParameter("loginName"));
            callableStatement.setString(4,new MD5().GetMD5Code(request.getParameter("loginPw")));
            callableStatement.registerOutParameter(1, Types.INTEGER);
            callableStatement.registerOutParameter(2,Types.INTEGER);
            callableStatement.executeUpdate();
            int returnValue = callableStatement.getInt(1);
            int userId=callableStatement.getInt(2);
            HttpSession session = request.getSession();
            request.getSession().setAttribute(session.getId(),userId);
            request.getSession().setAttribute("userName",request.getParameter("loginName"));
            String userName = request.getParameter("loginName");
            //查看该用户的个人信息是否已经上传
            String sql01 = "select id,nickName from userInfo where id="+userId+" and isDeleted=0";
            String userMark = "0";
            PreparedStatement preparedStatement01 = conn.prepareStatement(sql01);
            ResultSet resultSet01 = preparedStatement01.executeQuery();
            if(resultSet01.next()){
                userMark ="1";
            }
            if(returnValue == 1)
            {
                if(userMark.equals("0")){
                    response.sendRedirect("chatRoom/userInfo.html?loginName="+ userName);
                }else{
                    request.getSession().setAttribute("nickName",resultSet01.getString("nickName"));
                    response.sendRedirect("chatRoom/lobby.html?loginName="+ userName);
                }

            }
            else if(returnValue == 0)
            {
                response.sendRedirect("chatRoom/login.html?error=yes");
            }
        }
        catch(SQLException e)
        {
            e.printStackTrace();
        }
    }
}
