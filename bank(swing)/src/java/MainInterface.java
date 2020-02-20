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
		setTitle("����Ա����");
		this.setBounds(700,300,400,390);
		
		ImageIcon imageIcon = new ImageIcon("3.jpg");            //ѡȡ����ͼƬ
		JPanel imagePanel = new BackgroundPicture().DrawPicture(400, 390, imageIcon);    //���ñ�������     
		setContentPane(imagePanel);                                                //��ӱ���ͼƬ
		
		this.setLayout(null);                                 //ʵ�־��Բ���
		
		JButton b1 = new Icon().SetImage(110, 54, 27, 27);          //����ת�˰�ťǰ����װ�ε�ͼƬ
		b1.setBorderPainted(false);                          //����ʾ��ť�ı߽�
		this.getContentPane().add(b1);
		JButton Button1 = new JButton("ת��");
		Button1.setBounds(160,50,125,34);                  
		Button1.addActionListener(new ActionListener()            //�������������¼�
		{
			public void actionPerformed(ActionEvent e)
			{
				new Transfer();                           //����ת��ҳ��
			}
		});
		this.getContentPane().add(Button1);
		
		JButton b2 = new Icon().SetImage(110, 118, 27, 27);
		b2.setBorderPainted(false);
		this.getContentPane().add(b2);
		JButton Button2 = new JButton("�˺���Ϣ��ѯ");
		Button2.setBounds(160,115,125,34);
		Button2.addActionListener(new ActionListener()          //��������ѯ��������
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
		JButton Button3 = new JButton("����");
		Button3.setBounds(160,175,125,34);
		Button3.addActionListener(new ActionListener()         //�������黹����ҳ��
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
		JButton Button4 = new JButton("������Ϣ��ѯ");
		Button4.setBounds(160,235,125,34);
		Button4.addActionListener(new ActionListener()         //������������Ϣ��ѯҳ��
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
		JButton Button5 = new JButton("����");
		Button5.setBounds(160,295,125,34);
		this.getContentPane().add(Button5);
		
		this.addWindowListener(new WindowAdapter()            //�˳�����ȷ��,��ӵ���˳���ť�ļ����¼�
		{
			   public void windowClosing(WindowEvent e)
			   {
				   int i = JOptionPane.showConfirmDialog(null, "��ȷ��Ҫ�˳�������", "ȷ�Ϲر�",JOptionPane.YES_NO_OPTION);
				   if(i == JOptionPane.YES_OPTION)           //ѡ��������κθı�,ѡ�����˳�����
					   System.exit(0);
			   }
		});
		
		this.setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);     //ȷ���˳���������ǽ����رմ���
		this.setResizable(false);                         //���ô��ڹ̶���С,��ֹ�Ŵ�
		this.setVisible(true);           //���ÿɼ�
	}
	
	public static void main(String[] args)
	{
		new MainInterface();
	} 
}
