package database;

import static java.lang.System.out;
import java.sql.*;

public class Verify 
{
	PreparedStatement stmt;     //����Ԥִ��sql���
	ResultSet result;        //��Ž���Ľ����
	public Connection connection()
	{
		Connection con = null;
		try                       
		{
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			//out.println("���ݿ��������سɹ�");
		}catch(ClassNotFoundException e)
		{
			e.printStackTrace();
		}
		try
		{
			//ͨ��jdbc����sqlsever,��ַ���˿ڣ����ݿ����֣��û����Լ�����
			con = DriverManager.getConnection("jdbc:sqlserver://127.0.0.1:1433; DatabaseName = Banking", "sa", "111111");  
			//out.println("���ݿ����ӳɹ�");
		}catch(SQLException e)
		{
			e.printStackTrace();
		}    
		return con;
	}
	
	public boolean Check(String user, String password, int mark)         //�������ݿ�
	{
		Connection con;
		con = connection();
		/*****��֤���****/
		boolean ifright=false;  
        try
        {  
        	String sql;
        	if(mark == 1)
        	{
        		sql="SELECT * FROM users WHERE users = ? AND password = ?"; 
        	} 
        	else
        	{
        		sql="SELECT * FROM users2 WHERE users = ? AND password = ?";
        	}	
            stmt=con.prepareStatement(sql);  
            /*��˳������sql������ʺŶ�Ӧ��ֵ**/
            stmt.setString(1,user);  
            stmt.setString(2,password);  
            result=stmt.executeQuery();       //ִ��sql��ѯ���
            if(result.next())                 //ִ�н����ȷ��������ȷ,��֮����
            	ifright=true;  
            else  
            	ifright=false;  
            result.close();                    //�رո�������
            stmt.close();  
            con.close();  
        }catch(Exception e1)
        {  
            System.out.println(e1);  
        }  
        return ifright;  
	}
}
