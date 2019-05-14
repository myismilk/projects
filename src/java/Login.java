package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;


public class Login extends JFrame
{
	String PassWord;
	String User;
	static JPasswordField jp=new JPasswordField(20);     //密码框设置密码最大长度
	JTextField Text = new JTextField();                  //用户名输入文本框
	JRadioButton Button1, Button2;                      //设置管理员与用户登录的选择按钮
	
	public void User()                                //用户名输入框
	{
		JLabel Label = new JLabel("user");
		Label.setBounds(140,70,100,50);
		Label.setFont(new java.awt.Font("Dialog",1,23));            //字体大小及样式设置
		Label.setForeground(Color.BLACK);                           //字体颜色设置 
		this.getContentPane().add(Label);
		
		Text.setBounds(200,75,150,35);
		Text.setFont(new java.awt.Font("Dialog", 1, 15));
		//Text.setEditable(false);                           //设置文本框为不可编辑
		this.getContentPane().add(Text);
	}
	
	
	public void StartLogin()
	{
		if(!Button1.isSelected() && !Button2.isSelected())
		{
			JOptionPane.showMessageDialog(null,"请选择登录身份!","错误提示",JOptionPane.ERROR_MESSAGE);  //为选择身份提示
		}
		else
		{
			String temp1 = String.valueOf(jp.getPassword());     //temp必须在此处声明
			String temp2 = String.valueOf(Text.getText());
			//使用MD5算法对输入的密码进行加密,并与数据库中的MD5密码进行比对
			if(new Verify().Check(temp2, new MD5().GetMD5Code(temp1), 1) && Button1.isSelected())         //密码以及身份确认
			{
				dispose();                                        //关闭当前界面
				new MainInterface();                              //进入管理员主界面
			}
			else if(new Verify().Check(temp2, new MD5().GetMD5Code(temp1), 2) && Button2.isSelected())         //密码以及身份确认
			{
				dispose();                                        //关闭当前界面
				new MainInterface2();                              //进入用户主界面
			}
			else
			{
				JOptionPane.showMessageDialog(null,"密码或用户名错误请重新输入!","错误提示",JOptionPane.ERROR_MESSAGE);  //错误提示
			}
		}
	}
	
	public void Password()                                  //密码输入框
	{
		JLabel Label = new JLabel("pw");
		Label.setBounds(148,120,100,50);
		Label.setFont(new java.awt.Font("Dialog",1,23));
		Label.setForeground(Color.BLACK);
		this.getContentPane().add(Label);
		
		jp.setEchoChar('*');
		jp.setCaretPosition(0);                                //设置鼠标位置
		jp.setBounds(200,130,150,35);
		jp.setFont(new java.awt.Font("Dialog", 1, 22));
		//也可以写为new keyListener()
		jp.addKeyListener(new java.awt.event.KeyAdapter()          //通过按下enter键触发登录操作,效果等同于鼠标点击登录按钮
		{
			//public void keypressed(KeyEvent e)
			public void keyTyped(java.awt.event.KeyEvent e)
			{
				if(e.getKeyChar() == '\n')                              //确认按下回车键
				{
					StartLogin();
				}
			}
		});
		this.getContentPane().add(jp);      
	}
	
	public void loginButton()                                       //登录按钮
	{
		JButton Button = new JButton("登录");
		Button.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				StartLogin();
			}
		});
		Button.setBounds(130,230,100,35);
		Button.setFont(new java.awt.Font("Dialog", 1, 15));
		this.getContentPane().add(Button);
	}
	
	public void rewriteButton()                                   //重置按钮
	{
		JButton Button = new JButton("重置");
		Button.addActionListener(new ActionListener()              //添加鼠标点击触发事件
		{
			public void actionPerformed(ActionEvent e)
			{
				jp.setText("");                                   //触发清空密码输入框的操作
			}
		});
		Button.setBounds(270,230,100,35);
		Button.setFont(new java.awt.Font("Dialog", 1, 15));
		this.getContentPane().add(Button);
	}
	
	public void Jurisdiction()                                  //权限选择设置
	{
		Button1 = new JRadioButton("管理员");                      //管理员按钮设置
		Button1.setBounds(160,185,90,35);
		Button1.setFont(new java.awt.Font("Dialog", 1, 18));
		Button1.addActionListener(new ActionListener()             //用户与管理员两个选择按钮最多只能是有一个处于选择状态，当点击其中一个时，另一个的选择状态必须为false
		{
			public void actionPerformed(ActionEvent e)              
			{
				Button2.setSelected(false);                   //点击管理员则用户的选择按钮选择状态变为false,以实现二选一的目的
			}
		});
		this.getContentPane().add(Button1);
		
		Button2 = new JRadioButton("用户");                        //用户按钮设置
		Button2.setBounds(250,185,90,35);
		Button2.setFont(new java.awt.Font("Dialog", 1, 18));
		Button2.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				Button1.setSelected(false);                    //点击用户则管理员的选择按钮选择状态变为false
			}
		});
		this.getContentPane().add(Button2);
	}
	
	public Login()
	{
		this.setTitle("登录银行管理系统");
		
		ImageIcon imageIcon = new ImageIcon("1.jpg");                               //选取背景图片
		JPanel imagePanel = new BackgroundPicture().DrawPicture(480, 350, imageIcon);    //调用背景设置     
		setContentPane(imagePanel);                                                //添加背景图片
		
		setLayout(null);                   //绝对布局声明需要在完成背景图片的设置之后
		
		User();
		Password();
		loginButton();
		rewriteButton();
		Jurisdiction();
		
    	this.setBounds(600,400,480,350);
    	this.setResizable(false);                                           //设置窗口固定大小,禁止放大
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);                    //用来退出程序,避免关闭窗口后进程仍在后台运行消耗内存
		setVisible(true);                                                 //设置可见
	}
	
	public static void main(String[] args)
	{
		new Login();
	}
	
}
