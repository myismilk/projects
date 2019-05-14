package test;

import java.awt.*;
import javax.swing.*;

public class Icon extends JFrame             //实现图片大小的随意调节
{
	public JButton SetImage(int a, int b, int c, int d)        //传入位置及图片的大小设置参数
	{
		JButton jb1 = new JButton();    
		jb1.setBounds(a, b, c, d);  
		ImageIcon ii = new ImageIcon("2.gif");  
		//根据按钮大小改变图片大小  
		Image temp = ii.getImage().getScaledInstance(jb1.getWidth(), jb1.getHeight(), ii.getImage().SCALE_DEFAULT);  
		ii = new ImageIcon(temp);    //重新设置ii
		jb1.setIcon(ii);          //设置按钮的图片
		return jb1;               //将此图片按钮返回
	}
}
