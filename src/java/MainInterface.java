package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import javax.swing.*;

public class MainInterface extends JFrame
{
	public MainInterface()
	{
		setTitle("管理员界面");
		this.setBounds(700,300,400,390);
		
		ImageIcon imageIcon = new ImageIcon("3.jpg");            //选取背景图片
		JPanel imagePanel = new BackgroundPicture().DrawPicture(400, 390, imageIcon);    //调用背景设置     
		setContentPane(imagePanel);                                                //添加背景图片
		
		this.setLayout(null);                                 //实现绝对布局
		
		JButton b1 = new Icon().SetImage(110, 54, 27, 27);          //设置转账按钮前用来装饰的图片
		b1.setBorderPainted(false);                          //不显示按钮的边界
		this.getContentPane().add(b1);
		JButton Button1 = new JButton("转账");
		Button1.setBounds(160,50,125,34);                  
		Button1.addActionListener(new ActionListener()            //添加鼠标点击监听事件
		{
			public void actionPerformed(ActionEvent e)
			{
				new Transfer();                           //进入转账页面
			}
		});
		this.getContentPane().add(Button1);
		
		JButton b2 = new Icon().SetImage(110, 118, 27, 27);
		b2.setBorderPainted(false);
		this.getContentPane().add(b2);
		JButton Button2 = new JButton("账号信息查询");
		Button2.setBounds(160,115,125,34);
		Button2.addActionListener(new ActionListener()          //点击进入查询操作界面
		{
			public void actionPerformed(ActionEvent e)
			{
				new Query();
			}
		});
		this.getContentPane().add(Button2);
		
		
		JButton b3 = new Icon().SetImage(110, 180, 27, 27);
		b3.setBorderPainted(false);
		this.getContentPane().add(b3);
		JButton Button3 = new JButton("还贷");
		Button3.setBounds(160,175,125,34);
		Button3.addActionListener(new ActionListener()         //点击进入归还贷款页面
		{
			public void actionPerformed(ActionEvent e)
			{
				new Payment();
			}
		});
		this.getContentPane().add(Button3);
		
		
		JButton b4 = new Icon().SetImage(110, 238, 27, 27);
		b4.setBorderPainted(false);
		this.getContentPane().add(b4);
		JButton Button4 = new JButton("贷款信息查询");
		Button4.setBounds(160,235,125,34);
		Button4.addActionListener(new ActionListener()         //点击进入贷款信息查询页面
		{
			public void actionPerformed(ActionEvent e)
			{
				new LoanQuery();
			}
		});
		this.getContentPane().add(Button4);
		
		
		JButton b5 = new Icon().SetImage(110, 300, 27, 27);
		b5.setBorderPainted(false);
		this.getContentPane().add(b5);
		JButton Button5 = new JButton("待定");
		Button5.setBounds(160,295,125,34);
		this.getContentPane().add(Button5);
		
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
		this.setResizable(false);                         //设置窗口固定大小,禁止放大
		this.setVisible(true);           //设置可见
	}
	
	public static void main(String[] args)
	{
		new MainInterface();
	} 
}
