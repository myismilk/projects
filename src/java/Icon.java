package test;

import java.awt.*;
import javax.swing.*;

public class Icon extends JFrame             //ʵ��ͼƬ��С���������
{
	public JButton SetImage(int a, int b, int c, int d)        //����λ�ü�ͼƬ�Ĵ�С���ò���
	{
		JButton jb1 = new JButton();    
		jb1.setBounds(a, b, c, d);  
		ImageIcon ii = new ImageIcon("2.gif");  
		//���ݰ�ť��С�ı�ͼƬ��С  
		Image temp = ii.getImage().getScaledInstance(jb1.getWidth(), jb1.getHeight(), ii.getImage().SCALE_DEFAULT);  
		ii = new ImageIcon(temp);    //��������ii
		jb1.setIcon(ii);          //���ð�ť��ͼƬ
		return jb1;               //����ͼƬ��ť����
	}
}
