package test;

import java.awt.*;
import javax.swing.*;
import java.sql.*;

public class UserQuery extends JFrame
{
	JTextField TextField1, TextField2;
	Connection con = new Verify().connection();
	public void StartQuery(String account_number)
	{
		try
		{
			//callǰû��?�򲻹ܷ���ֵ
			CallableStatement callableStatement = con.prepareCall("{call PQuery(?,?,?,?,?)}");
			//�������
			callableStatement.setString(5, account_number);
			//�������
			callableStatement.registerOutParameter(1, Types.VARCHAR);
			//�������
			callableStatement.registerOutParameter(2, Types.FLOAT);
			//�������
			callableStatement.registerOutParameter(3, Types.VARCHAR);
			//�������
			callableStatement.registerOutParameter(4, Types.VARCHAR);
			//��ʼִ�в�ѯ����
			callableStatement.execute();
			//����������
			double balance = callableStatement.getDouble(2);
			//����������
			String BranchName = callableStatement.getString(3);			
			/****������д���Ӧ�ı�����*****/
			TextField1.setText(BranchName);
			TextField2.setText(String.valueOf(balance));    //��doubleת����string,�����޷�д���ı�����
			
		} catch (Exception e1) 
		{
			e1.printStackTrace();
		}
	}
	
	public void SetJLabelLocation(String s, int x)             //���ñ�ǩλ��
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 21));
		Label.setBounds(40,x,90,38);
		Label.setOpaque(true);
		this.getContentPane().add(Label);
	}
	
	public JTextField SetJTextFieldLocation(int x)              //�����ı���λ��
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 20));
		TextField.setBounds(150,x,180,38);
		this.getContentPane().add(TextField);
		return TextField;
	}
	
	public UserQuery()
	{
		this.setTitle("����ѯ");
		this.setBounds(800,400,380,250);
		ImageIcon imageIcon = new ImageIcon("9.jpg");               //����ͼƬ����
		JPanel imagePanel = new BackgroundPicture().DrawPicture(380, 320, imageIcon);
		this.setContentPane(imagePanel);
		
		this.setLayout(null);               //ʵ�־��Բ���
		
		SetJLabelLocation("֧������",50);     //���β����ǩ���ı���
		TextField1 = SetJTextFieldLocation(50);
		SetJLabelLocation("�˻����",100);     //���β����ǩ���ı���
		TextField2 = SetJTextFieldLocation(100);
		
		//this.setDefaultCloseOperation(this.EXIT_ON_CLOSE);
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new UserQuery();
	}
}
