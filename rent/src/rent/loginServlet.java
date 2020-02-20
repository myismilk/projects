package rent;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet("/loginServlet")
public class loginServlet extends HttpServlet
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
            String sql01 = "select id from landlordInfo where id="+userId+" and isDeleted=0";
            String sql02 = "select id from renterInfo where id="+userId+" and isDeleted=0";
            String renterMark = "0";
            String landlordMark = "0";
            PreparedStatement preparedStatement01 = conn.prepareStatement(sql01);
            ResultSet resultSet01 = preparedStatement01.executeQuery();
            if(resultSet01.next()){
                landlordMark ="1";
            }
            PreparedStatement preparedStatement02 = conn.prepareStatement(sql02);
            ResultSet resultSet02 = preparedStatement02.executeQuery();
            if(resultSet02.next()){
                renterMark = "1";
            }
            if(returnValue == 1)
            {
                response.sendRedirect("rent/role.html?loginName="+ userName+"&landlord="+landlordMark+"&renter="+renterMark);
            }
            else if(returnValue == 0)
            {
                response.sendRedirect("rent/login.html?error=yes");
            }
        }
        catch(SQLException e)
        {
            e.printStackTrace();
        }
    }
}
