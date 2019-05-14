package test;

import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;

public class Transfer extends JFrame 
{
	Connection con = new Verify().connection();     //连接数据库,同时返回接口con
	String RollOut, RollIn;
	double Amount;
	JTextField TextField1, TextField2, TextField3;
	
	public void StartTransfer()
	{
		RollOut = TextField1.getText();                         //获取存储过程的输入参数
		RollIn = TextField2.getText();							//	
		Amount =  Double.parseDouble(TextField3.getText());     //
		/*****开始调用数据库中的存储过程*****/
		try 
		{
			//callablestement用来调用sql sever中的存储过程
			//第一个问号为返回值，用来确认存储过程是否正确执行
		    CallableStatement callableStatement = con.prepareCall("{? = call PTransfer(?,?,?)}");
		    //返回值
		    callableStatement.registerOutParameter(1, Types.INTEGER);
		    callableStatement.setString(2, RollOut);                   //输入参数转出账户
		    callableStatement.setString(3, RollIn);                    //输入参数转入账户
		    callableStatement.setDouble(4, Amount);                    //输入参数转账金额
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
	
	public JLabel SetJLabelLocation(String s, int a)        //设置标签,传入参数为标签横坐标以及标签上的文本信息
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 20));
		Label.setForeground(Color.BLACK);
		Label.setBounds(a,60,100,40);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //设置文本框，传入参数为文本框的横坐标
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 16));
		TextField.setBounds(a,120,130,30);
		return TextField;
	}
	
	
	public Transfer()
	{
		this.setTitle("转账");
		this.setBounds(550,320,750,380);
		
		ImageIcon imageIcon = new ImageIcon("4.jpg");           //选取背景图片
		JPanel imagePanel = new BackgroundPicture().DrawPicture(750, 380, imageIcon);    //调用背景图片设置类 
		setContentPane(imagePanel);       //将重写后的JPanel添加到窗体中作为背景
		
		this.setLayout(null);             //声明在背景图片设置之后,实现绝对布局   如果在背景设置之前声明则无法进行绝对布局
		
		JLabel Label1 = SetJLabelLocation("转出账户",120);                   //设置标签
		this.getContentPane().add(Label1);
		TextField1 = SetJTextFieldLocation(100);
		this.getContentPane().add(TextField1);
		
		JLabel Label2 = SetJLabelLocation("转入账户",330);
		this.getContentPane().add(Label2);
		TextField2 = SetJTextFieldLocation(310);
		this.getContentPane().add(TextField2);
		
		JLabel Label3 = SetJLabelLocation("转账金额",530);
		this.getContentPane().add(Label3);
		TextField3 = SetJTextFieldLocation(500);
		//触发按下enter键的提交操作
		TextField3.addKeyListener(new KeyListener()                 //区别于之前登录操作中的按下回车键触发登录操作
		{  
		    public void keyPressed(KeyEvent e)                  //按下某个键时调用此方法
		    {           
		        if (e.getKeyCode() == KeyEvent.VK_ENTER)      //if(e.getKeyChar() == '\n')
		        {  
		        	StartTransfer();
		        }
		    }
		    public void keyReleased(KeyEvent e) {}             //  释放某个键时调用此方法。
		    public void keyTyped(KeyEvent e) {}                //   键入某个键时调用此方法。		    		 
		});
		this.getContentPane().add(TextField3);
		
		JButton Button = new CircleButton("提交");                 //设置圆形按钮提交
		Button.setFont(new java.awt.Font("Dialog", 1, 18));
		Button.setBackground(Color.ORANGE);
		Button.setBounds(330,180,100,100);
		Button.addActionListener(new ActionListener()               //点击提交开始运行sql中的转账存储过程
		{
			public void actionPerformed(ActionEvent e)
			{
				StartTransfer();
			}
		});
		this.getContentPane().add(Button);
		
		this.setResizable(false);
		this.setVisible(true);
		//避免退出程序,只需要在主页面退出程序即可
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
	}
	
	public static void main(String[] args)
	{
		new Transfer();
	}
}
