package test;

import java.awt.*;
import javax.swing.*;
import java.sql.*;

public class UserQuery extends JFrame
{
	JTextField TextField1, TextField2;
	Connection con = new Verify().connection();
	public void StartQuery(String account_number)
	{
		try
		{
			//call前没加?则不管返回值
			CallableStatement callableStatement = con.prepareCall("{call PQuery(?,?,?,?,?)}");
			//输入参数
			callableStatement.setString(5, account_number);
			//输出参数
			callableStatement.registerOutParameter(1, Types.VARCHAR);
			//输出参数
			callableStatement.registerOutParameter(2, Types.FLOAT);
			//输出参数
			callableStatement.registerOutParameter(3, Types.VARCHAR);
			//输出参数
			callableStatement.registerOutParameter(4, Types.VARCHAR);
			//开始执行查询过程
			callableStatement.execute();
			//获得输出参数
			double balance = callableStatement.getDouble(2);
			//获得输出参数
			String BranchName = callableStatement.getString(3);			
			/****将数据写入对应文本框中*****/
			TextField1.setText(BranchName);
			TextField2.setText(String.valueOf(balance));    //将double转换成string,否则无法写入文本框中
			
		} catch (Exception e1) 
		{
			e1.printStackTrace();
		}
	}
	
	public void SetJLabelLocation(String s, int x)             //设置标签位置
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 21));
		Label.setBounds(40,x,90,38);
		Label.setOpaque(true);
		this.getContentPane().add(Label);
	}
	
	public JTextField SetJTextFieldLocation(int x)              //设置文本框位置
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 20));
		TextField.setBounds(150,x,180,38);
		this.getContentPane().add(TextField);
		return TextField;
	}
	
	public UserQuery()
	{
		this.setTitle("余额查询");
		this.setBounds(800,400,380,250);
		ImageIcon imageIcon = new ImageIcon("9.jpg");               //背景图片设置
		JPanel imagePanel = new BackgroundPicture().DrawPicture(380, 320, imageIcon);
		this.setContentPane(imagePanel);
		
		this.setLayout(null);               //实现绝对布局
		
		SetJLabelLocation("支行名字",50);     //依次插入标签与文本框
		TextField1 = SetJTextFieldLocation(50);
		SetJLabelLocation("账户余额",100);     //依次插入标签与文本框
		TextField2 = SetJTextFieldLocation(100);
		
		//this.setDefaultCloseOperation(this.EXIT_ON_CLOSE);
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new UserQuery();
	}
}
