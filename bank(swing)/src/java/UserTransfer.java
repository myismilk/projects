package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;
import java.sql.*;

public class UserTransfer extends JFrame
{
	Connection con = new Verify().connection();   //连接数据库并返回接口
	JTextField TextField1, TextField2;
	public void StartTransfer(String account_number)
	{
		String rollOut = TextField1.getText();                         //获取存储过程的输入参数
		double amount = Double.parseDouble(TextField2.getText());							//	
		/*****开始调用数据库中的存储过程*****/
		try 
		{
			//callablestement用来调用sql sever中的存储过程
			//第一个问号为返回值，用来确认存储过程是否正确执行
		    CallableStatement callableStatement = con.prepareCall("{? = call PTransfer(?,?,?)}");
		    //返回值
		    callableStatement.registerOutParameter(1, Types.INTEGER);
		    callableStatement.setString(2, account_number);                   //输入参数转出账户
		    callableStatement.setString(3, rollOut);                    //输入参数转入账户
		    callableStatement.setDouble(4, amount);                    //输入参数转账金额
		    callableStatement.execute();                               //开始执行转账过程
		    //获得返回值
		    int ReturnValue=callableStatement.getInt(1);
		    if(ReturnValue == 0)                           
		    {
		    	//存储过程正确执行则弹出提示消息
		    	JOptionPane.showMessageDialog(null, "转账成功!", "提示",JOptionPane.INFORMATION_MESSAGE);
		    }
		    else
		    {
		    	//发生错误的提示消息
		    	JOptionPane.showMessageDialog(null, "转账失败!", "提示",JOptionPane.ERROR_MESSAGE);
		    }
		    callableStatement.close();  //关闭调用
		}catch (Exception e1) 
		{
			e1.printStackTrace();
		}
	}
	
	public void SetJLabelLocation(String s, int x)        //设置标签
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 18));
		Label.setOpaque(true);           //设置标签不透明
		Label.setBounds(x,40,80,35);
		this.getContentPane().add(Label);
	}
	
	public JTextField SetJTextFieldLocation(int x)             //设置文本框
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 20));
		TextField.setBounds(x,90,130,36);
		this.getContentPane().add(TextField);
		return TextField;
	}
	
	public UserTransfer(String account_number)
	{
		this.setTitle("转账");
		this.setBounds(800,400,350,270);
		ImageIcon imageIcon = new ImageIcon("9.jpg");               //背景图片设置
		JPanel imagePanel = new BackgroundPicture().DrawPicture(400, 400, imageIcon);
		this.setContentPane(imagePanel);
		
		this.setLayout(null);              //实现绝对布局
		
		SetJLabelLocation("转入账号", 53);   //依次添加标签和文本框
		SetJLabelLocation("转入金额", 210);
		TextField1 = SetJTextFieldLocation(30);           
		TextField2 = SetJTextFieldLocation(190);
		TextField2.addKeyListener(new KeyListener()
		{
			public void keyPressed(KeyEvent e)            //按下回车调用此函数
			{
				if (e.getKeyCode() == KeyEvent.VK_ENTER)      //if(e.getKeyChar() == '\n')
		        {  
		        	StartTransfer(account_number);
		        }
			}
			public void keyReleased(KeyEvent e) {};         //释放回车键调用此函数
			public void keyTyped(KeyEvent e) {};              //键入回车键调用此函数
			
		});
		
		JButton Button = new JButton("提交");                     //放置提交按钮
		Button.setFont(new java.awt.Font("Dialog", 1, 18));
		Button.setBounds(130,150,90,35);
		Button.addActionListener(new ActionListener()              //鼠标点击调用此函数
		{
			public void actionPerformed(ActionEvent e)
			{
				StartTransfer(account_number);          //开始执行数据库中的转账事物
			}
		});
		this.getContentPane().add(Button);
		
		this.setLayout(null);               //实现绝对布局
		//this.setDefaultCloseOperation(this.EXIT_ON_CLOSE);
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new UserTransfer("A-101");
	}
}
