package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.sql.*;

import javax.swing.*;

public class Query extends JFrame
{
	Connection con = new Verify().connection();     //链接数据库并获得返回的接口con
	JTextField TextField1, TextField2, TextField3, TextField4, TextField5;
	ResultSet res;
	
	public void StartQuery()             //调用sql sever存储过程
	{
		String a_c = TextField1.getText();             //获取存储过程的输入参数
		try
		{
			//call前没加?则不管返回值
			CallableStatement callableStatement = con.prepareCall("{call PQuery(?,?,?,?,?)}");
			//输入参数
			callableStatement.setString(5, a_c);
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
			String CustomerName = callableStatement.getString(1);
			//获得输出参数
			double balance = callableStatement.getDouble(2);
			//获得输出参数
			String BranchName = callableStatement.getString(3);
			//获得输出参数
			String CustomerCity = callableStatement.getString(4);
			/****将数据写入对应文本框中*****/
			TextField2.setText(CustomerName);
			TextField3.setText(String.valueOf(balance));    //将double转换成string,否则无法写入文本框中
			TextField4.setText(BranchName);
			TextField5.setText(CustomerCity);
		} catch (Exception e1) 
		{
			e1.printStackTrace();
		}
	}
	
	
	public JLabel SetJLabelLocation(String s, int a)        //设置标签,传入参数为标签横坐标以及标签上的文本信息
	{
		JLabel Label = new JLabel(s);
		Label.setBounds(175,a,220,40);
		Label.setFont(new java.awt.Font("粗体",1,21));
		Label.setForeground(Color.yellow);
		this.getContentPane().add(Label);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //设置文本框，传入参数为文本框的横坐标
	{
		JTextField TextField = new JTextField();
		TextField.setBounds(280,a,160,35);
		TextField.setFont(new java.awt.Font("Dialog", 1, 18));
		this.getContentPane().add(TextField);
		return TextField;
	}
	
	
	public Query()
	{
		this.setTitle("信息查询");      //设置窗体标题
		this.setBounds(700,300,600,550);
		
		ImageIcon imageIcon = new ImageIcon("5.jpg");           //选取背景图片
		JPanel imagePanel = new BackgroundPicture().DrawPicture(600, 550, imageIcon);    //调用背景设置    类
		setContentPane(imagePanel); 
		
		this.setLayout(null);          //实现绝对布局
		
		JLabel Label1 = new JLabel("请输入需要查询的账号:");               //插入标签
		Label1.setBounds(65,50,220,40);
		Label1.setFont(new java.awt.Font("粗体",1,20));
		Label1.setForeground(Color.YELLOW);
		this.getContentPane().add(Label1);
		TextField1 = new JTextField();
		TextField1.setBounds(290,50,130,36);
		TextField1.setFont(new java.awt.Font("Dialog", 1, 18));
		/***keyPressed keyReleased keyTyped 三个方法必须同时写出***/
		TextField1.addKeyListener(new KeyListener()            //实现按下回车键响应
		{
			public void keyPressed(KeyEvent e)             //按下某个键时调用此方法
			{
				if(e.getKeyCode() == KeyEvent.VK_ENTER)
				{
					StartQuery();
				}
			}
			public void keyReleased(KeyEvent e) {}          //释放某个键时调用此方法
		    public void keyTyped(KeyEvent e) {}             //键入某个键时调用此方法  
		});
		this.getContentPane().add(TextField1);
		
		JButton Button = new JButton("查询");                      //添加查询按钮
		Button.setBounds(440, 50, 70, 36);
		Button.addActionListener(new ActionListener()       //鼠标点击查询按钮调用此方法
		{
			public void actionPerformed(ActionEvent e)
			{
				StartQuery();                                //开始查询
			}
		});
		Button.setFont(new java.awt.Font("Dialog", 1, 17));
		this.getContentPane().add(Button);
		
		JLabel Label2 = SetJLabelLocation("客户姓名:",150);               //依次插入标签和文本框
		TextField2 = SetJTextFieldLocation(150);
		
		JLabel Label3 = SetJLabelLocation("账户余额:",230);               
		TextField3 = SetJTextFieldLocation(230);
		
		JLabel Label4 = SetJLabelLocation("支行名字:",310);               
		TextField4 = SetJTextFieldLocation(310);
		
		JLabel Label5 = SetJLabelLocation("客户城市:",390);               
		TextField5 = SetJTextFieldLocation(390);
		
		this.setResizable(false);                                   //设置窗体无法放大
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);    
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new Query();
	}
}
