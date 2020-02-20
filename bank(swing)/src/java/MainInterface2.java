package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.sql.*;
import javax.swing.*;

public class MainInterface2 extends JFrame
{
	Connection con = new Verify().connection();       //连接数据库并获得接口
	PreparedStatement sql;               
	ResultSet res;                                //用来存储sql中的查询结果
	String UserName = null;                        //登陆用户的名字
	String account_number = "A-101";                //用户的账号
	
	public JButton SetJButtonLocation(String s, int a)          //此函数用来设置功能按钮的位置
	{
		JButton Button = new JButton(s);
		Button.setBounds(120,a,150,37);
		Button.setFont(new java.awt.Font("Dialog", 1, 18));
		this.getContentPane().add(Button);
		return Button;
	}
	public MainInterface2()
	{
		this.setTitle("用户界面");
		this.setBounds(700,300,380,350);
		
		ImageIcon imageIcon = new ImageIcon("8.jpg");          //设置窗体的背景图片      
		JPanel ImagePanel = new BackgroundPicture().DrawPicture(400, 500, imageIcon);
		this.setContentPane(ImagePanel);
		
		this.setLayout(null);             //绝对布局
		/****获取登录用户的名字****/
		try                            
		{
			sql = con.prepareStatement("SELECT customer_name FROM account, depositor "
					+ "WHERE account.account_number = depositor.account_number AND account.account_number = ?");
			sql.setString(1,account_number);
			res = sql.executeQuery();
			res.next();
			UserName = res.getString("customer_name");
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		/***设置问候语***/
		JLabel Label1 = new JLabel("欢迎登录," + UserName);
		Label1.setBounds(80,60,230,40);
		Label1.setFont(new java.awt.Font("Dialog", 1, 23));
		Label1.setBackground(Color.white);                  //设置标签背景色
		Label1.setForeground(Color.magenta);                
		Label1.setOpaque(true);                            //设置标签不透明
		this.getContentPane().add(Label1);
		
		JButton Button1 = SetJButtonLocation("账号余额查询", 150);      //依次插入功能选择按钮
		Button1.addActionListener(new ActionListener()              //鼠标点击进入用户查询界面
		{
			public void actionPerformed(ActionEvent e)
			{
				new UserQuery().StartQuery(account_number);
			}
		});
		
		JButton Button2 = SetJButtonLocation("转账", 210);
		Button2.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				new UserTransfer(account_number);
			}
		});
		
		/*JButton Button3 = SetJButtonLocation("贷款信息查询", 270);
		Button3.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				new UserLoanQuery();
			}
		});
		
		JButton Button4 = SetJButtonLocation("还款", 330);*/
		
		this.addWindowListener(new WindowAdapter()            //退出程序确认,添加点击退出按钮的监听事件
		{
			public void windowClosing(WindowEvent e)
			{
				int i = JOptionPane.showConfirmDialog(null, "您确定要退出程序吗？", "确认关闭",JOptionPane.YES_NO_OPTION);
				if(i == JOptionPane.YES_OPTION)           //选择否则不做任何改变,选择是退出程序
					System.exit(0);
			}
		});	
		this.setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);     //确认退出程序而不是仅仅关闭窗口
		this.setResizable(false);                         //不允许对窗体进行放大操作
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new MainInterface2();
	}
}
