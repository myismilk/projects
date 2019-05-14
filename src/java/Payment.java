package test;

import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;

public class Payment extends JFrame
{
	Connection con = new Verify().connection();       //连接数据库并返回接口
	JTextField TextField1, TextField2;      //将显示信息的文本框设置成全局变量
	public JLabel SetJLabelLocation(String s, int a)        //设置标签,传入参数为标签横坐标以及标签上的文本信息
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 22));
		Label.setForeground(Color.BLACK);
		Label.setBounds(a,80,100,35);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //设置文本框，传入参数为文本框的横坐标
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 20));
		TextField.setBounds(a,130,140,35);
		return TextField;
	}
	
	
	public void StartPay()          //调用数据库中的存储过程来完成还款
	{
		String l_n = TextField1.getText();  //依次获取文本框中的参数
		String p_a = TextField2.getText();
		
		try
		{
			//call前没加?则不管返回值
			CallableStatement callableStatement = con.prepareCall("{? = call PPayment(?, ?)}");
			//输入参数
			callableStatement.setString(2, l_n);
			//输入参数
			callableStatement.setString(3, p_a);
			//将返回值设置为int类型
			callableStatement.registerOutParameter(1, Types.VARCHAR);
			//开始执行查询过程
			callableStatement.execute();
			//获得返回值
			int returnValue = callableStatement.getInt(1);
			if(returnValue == 0)
			{
				JOptionPane.showMessageDialog(null, "还款成功", "提示", JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, "还款失败", "提示", JOptionPane.ERROR_MESSAGE);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	
	public Payment()
	{
		this.setTitle("还款");             //标题设置
		this.setBounds(550,320,510,450);           //设置窗体位置及大小
		
		/*******设置背景图片*********/
		ImageIcon imageIcon = new ImageIcon("6.jpg");  
		JPanel imagePanel = new BackgroundPicture().DrawPicture(960, 450, imageIcon); //使用重写的JPanel方法
		this.setContentPane(imagePanel);
		
		this.setLayout(null);             //绝对布局
		
		JLabel Label1 = SetJLabelLocation("贷款账号",80);
		this.getContentPane().add(Label1);
		TextField1 = SetJTextFieldLocation(60);
		this.getContentPane().add(TextField1);
		
		JLabel Label2 = SetJLabelLocation("还款金额",300);
		this.getContentPane().add(Label2);
		TextField2 = SetJTextFieldLocation(300);
		TextField2.addKeyListener(new KeyListener()
		{
			public void keyPressed(KeyEvent e)          //按下回车键调用此方法
			{
				if(e.getKeyCode() == KeyEvent.VK_ENTER)
				{
					StartPay();
				}
			}
			public void keyReleased(KeyEvent e) {}     //释放回车键调用此方法
			public void keyTyped(KeyEvent e) {}           //键入回车键调用此方法
		});
		this.getContentPane().add(TextField2);
		
		JButton Button = new CircleButton("确认还款");           //调用圆形按钮
		Button.setBounds(200,210,100,100);
		Button.setFont(new java.awt.Font("Dialog", 1, 15));
		Button.setBackground(Color.ORANGE);
		Button.addActionListener(new ActionListener()       //点击连接数据库进行还贷操作
		{
			public void actionPerformed(ActionEvent e)
			{
				StartPay();
			}
		});
		this.getContentPane().add(Button);
		
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE); //记得最终注释
		this.setResizable(false);
		this.setVisible(true);           //设置窗体可视
	}
	
	public static void main(String[] args)
	{
		new Payment();
	}
}
