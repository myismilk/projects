package chatRoom;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DBUtil
{
    // 注册数据库驱动
    static
    {
        try
        {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("注册失败！");
            e.printStackTrace();
        }
    }
    // 获取连接
    public static Connection getConn() throws SQLException
    {
        return DriverManager.getConnection("jdbc:mysql://127.0.0.1:6666/databaseName","root","111111");
    }
    // 关闭连接
    public static void closeConn(Connection conn)
    {
        if (null != conn)
        {
            try
            {
                conn.close();
            } catch (SQLException e)
            {
                System.out.println("关闭连接失败！");
                e.printStackTrace();
            }
        }
    }
}
