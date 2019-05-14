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
	Connection con = new Verify().connection();       //�������ݿⲢ���ؽӿ�
	JTextField TextField1, TextField2;      //����ʾ��Ϣ���ı������ó�ȫ�ֱ���
	public JLabel SetJLabelLocation(String s, int a)        //���ñ�ǩ,�������Ϊ��ǩ�������Լ���ǩ�ϵ��ı���Ϣ
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 22));
		Label.setForeground(Color.BLACK);
		Label.setBounds(a,80,100,35);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //�����ı��򣬴������Ϊ�ı���ĺ�����
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 20));
		TextField.setBounds(a,130,140,35);
		return TextField;
	}
	
	
	public void StartPay()          //�������ݿ��еĴ洢��������ɻ���
	{
		String l_n = TextField1.getText();  //���λ�ȡ�ı����еĲ���
		String p_a = TextField2.getText();
		
		try
		{
			//callǰû��?�򲻹ܷ���ֵ
			CallableStatement callableStatement = con.prepareCall("{? = call PPayment(?, ?)}");
			//�������
			callableStatement.setString(2, l_n);
			//�������
			callableStatement.setString(3, p_a);
			//������ֵ����Ϊint����
			callableStatement.registerOutParameter(1, Types.VARCHAR);
			//��ʼִ�в�ѯ����
			callableStatement.execute();
			//��÷���ֵ
			int returnValue = callableStatement.getInt(1);
			if(returnValue == 0)
			{
				JOptionPane.showMessageDialog(null, "����ɹ�", "��ʾ", JOptionPane.INFORMATION_MESSAGE);
			}
			else
			{
				JOptionPane.showMessageDialog(null, "����ʧ��", "��ʾ", JOptionPane.ERROR_MESSAGE);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	
	public Payment()
	{
		this.setTitle("����");             //��������
		this.setBounds(550,320,510,450);           //���ô���λ�ü���С
		
		/*******���ñ���ͼƬ*********/
		ImageIcon imageIcon = new ImageIcon("6.jpg");  
		JPanel imagePanel = new BackgroundPicture().DrawPicture(960, 450, imageIcon); //ʹ����д��JPanel����
		this.setContentPane(imagePanel);
		
		this.setLayout(null);             //���Բ���
		
		JLabel Label1 = SetJLabelLocation("�����˺�",80);
		this.getContentPane().add(Label1);
		TextField1 = SetJTextFieldLocation(60);
		this.getContentPane().add(TextField1);
		
		JLabel Label2 = SetJLabelLocation("������",300);
		this.getContentPane().add(Label2);
		TextField2 = SetJTextFieldLocation(300);
		TextField2.addKeyListener(new KeyListener()
		{
			public void keyPressed(KeyEvent e)          //���»س������ô˷���
			{
				if(e.getKeyCode() == KeyEvent.VK_ENTER)
				{
					StartPay();
				}
			}
			public void keyReleased(KeyEvent e) {}     //�ͷŻس������ô˷���
			public void keyTyped(KeyEvent e) {}           //����س������ô˷���
		});
		this.getContentPane().add(TextField2);
		
		JButton Button = new CircleButton("ȷ�ϻ���");           //����Բ�ΰ�ť
		Button.setBounds(200,210,100,100);
		Button.setFont(new java.awt.Font("Dialog", 1, 15));
		Button.setBackground(Color.ORANGE);
		Button.addActionListener(new ActionListener()       //����������ݿ���л�������
		{
			public void actionPerformed(ActionEvent e)
			{
				StartPay();
			}
		});
		this.getContentPane().add(Button);
		
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE); //�ǵ�����ע��
		this.setResizable(false);
		this.setVisible(true);           //���ô������
	}
	
	public static void main(String[] args)
	{
		new Payment();
	}
}
