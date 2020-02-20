package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;
import java.sql.*;

public class LoanQuery extends JFrame
{
	JTextField TextField1, TextField2, TextField3, TextField4;
	Connection con = new Verify().connection();
	public void StartQuery()
	{
		String l_n = TextField1.getText();
		
		try
		{
			//call前没加?则不管返回值
			CallableStatement callableStatement = con.prepareCall("{call PQueryLoan(?, ?, ?, ?)}");
			//输入参数
			callableStatement.setString(1, l_n);
			//输出参数
			callableStatement.registerOutParameter(2,Types.DOUBLE);
			//输出参数
			callableStatement.registerOutParameter(3,Types.VARCHAR);
			//输出参数
			callableStatement.registerOutParameter(4,Types.DOUBLE);
			//开始执行查询过程
			callableStatement.execute();
			//获得输出参数贷款总额
			double totalLoanAmount = callableStatement.getDouble(2);
			//获得输出参数支行名字
			String branchName = callableStatement.getString(3);
			//获得输出参数已还贷款
			double paidAmount = callableStatement.getDouble(4);
			TextField2.setText(String.valueOf(totalLoanAmount));    //依次将查询结果填入对应的文本框中
			TextField3.setText(branchName);
			TextField4.setText(String.valueOf(paidAmount));
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public JLabel SetJLabelLocation(String s, int a)        //设置标签,传入参数为标签横坐标以及标签上的文本信息
	{
		JLabel Label = new JLabel(s);
		Label.setBounds(65,a,100,40);
		Label.setFont(new java.awt.Font("粗体",1,21));
		Label.setForeground(Color.black);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //设置文本框，传入参数为文本框的横坐标
	{
		JTextField TextField = new JTextField();
		TextField.setBounds(170,a,160,35);
		TextField.setFont(new java.awt.Font("Dialog", 1, 18));
		return TextField;
	}
	
	
	public LoanQuery()
	{
		this.setTitle("贷款信息查询");
		this.setBounds(700,300,400,500);
		
		ImageIcon imageIcon = new ImageIcon("7.jpg");   //设置背景图片
		JPanel ImagePanel = new BackgroundPicture().DrawPicture(400, 500, imageIcon);
		this.setContentPane(ImagePanel);
		
		this.setLayout(null);              //实现绝对布局
		
		JLabel Label1 = new JLabel("贷款账号:");               //插入标签
		Label1.setBounds(65,50,220,40);
		Label1.setFont(new java.awt.Font("粗体",1,20));
		Label1.setForeground(Color.black);
		this.getContentPane().add(Label1);
		TextField1 = new JTextField();
		TextField1.setBounds(180,50,140,35);
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
		
		
		JButton Button1 = new JButton("查询");               //添加查询按钮
		Button1.setBounds(170, 110, 80,38);
		Button1.setFont(new java.awt.Font("Dialog", 1, 20));
		Button1.addActionListener(new ActionListener()           //点击按钮调用此函数查询
		{
			public void actionPerformed(ActionEvent e)
			{
				StartQuery();
			}
		});
		this.getContentPane().add(Button1);
		
		JLabel Label2 = SetJLabelLocation("贷款金额:",180);            //依次设置标签和文本框
		this.getContentPane().add(Label2);
		TextField2 = SetJTextFieldLocation(180);
		this.getContentPane().add(TextField2);
		
		JLabel Label3 = SetJLabelLocation("贷款支行:",260);
		this.getContentPane().add(Label3);
		TextField3 = SetJTextFieldLocation(260);
		this.getContentPane().add(TextField3);
		
		JLabel Label4 = SetJLabelLocation("已还贷款:",340);
		this.getContentPane().add(Label4);
		TextField4 = SetJTextFieldLocation(340);
		this.getContentPane().add(TextField4);
		
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		this.setResizable(false);                                      //设置窗体不可放大
		this.setVisible(true);                                        //设置窗体可见
	}
	
	public static void main(String[] args)
	{
		new LoanQuery();
	}
}
