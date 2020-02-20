package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.sql.*;

import javax.swing.*;

public class Query extends JFrame
{
	Connection con = new Verify().connection();     //�������ݿⲢ��÷��صĽӿ�con
	JTextField TextField1, TextField2, TextField3, TextField4, TextField5;
	ResultSet res;
	
	public void StartQuery()             //����sql sever�洢����
	{
		String a_c = TextField1.getText();             //��ȡ�洢���̵��������
		try
		{
			//callǰû��?�򲻹ܷ���ֵ
			CallableStatement callableStatement = con.prepareCall("{call PQuery(?,?,?,?,?)}");
			//�������
			callableStatement.setString(5, a_c);
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
			String CustomerName = callableStatement.getString(1);
			//����������
			double balance = callableStatement.getDouble(2);
			//����������
			String BranchName = callableStatement.getString(3);
			//����������
			String CustomerCity = callableStatement.getString(4);
			/****������д���Ӧ�ı�����*****/
			TextField2.setText(CustomerName);
			TextField3.setText(String.valueOf(balance));    //��doubleת����string,�����޷�д���ı�����
			TextField4.setText(BranchName);
			TextField5.setText(CustomerCity);
		} catch (Exception e1) 
		{
			e1.printStackTrace();
		}
	}
	
	
	public JLabel SetJLabelLocation(String s, int a)        //���ñ�ǩ,�������Ϊ��ǩ�������Լ���ǩ�ϵ��ı���Ϣ
	{
		JLabel Label = new JLabel(s);
		Label.setBounds(175,a,220,40);
		Label.setFont(new java.awt.Font("����",1,21));
		Label.setForeground(Color.yellow);
		this.getContentPane().add(Label);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //�����ı��򣬴������Ϊ�ı���ĺ�����
	{
		JTextField TextField = new JTextField();
		TextField.setBounds(280,a,160,35);
		TextField.setFont(new java.awt.Font("Dialog", 1, 18));
		this.getContentPane().add(TextField);
		return TextField;
	}
	
	
	public Query()
	{
		this.setTitle("��Ϣ��ѯ");      //���ô������
		this.setBounds(700,300,600,550);
		
		ImageIcon imageIcon = new ImageIcon("5.jpg");           //ѡȡ����ͼƬ
		JPanel imagePanel = new BackgroundPicture().DrawPicture(600, 550, imageIcon);    //���ñ�������    ��
		setContentPane(imagePanel); 
		
		this.setLayout(null);          //ʵ�־��Բ���
		
		JLabel Label1 = new JLabel("��������Ҫ��ѯ���˺�:");               //�����ǩ
		Label1.setBounds(65,50,220,40);
		Label1.setFont(new java.awt.Font("����",1,20));
		Label1.setForeground(Color.YELLOW);
		this.getContentPane().add(Label1);
		TextField1 = new JTextField();
		TextField1.setBounds(290,50,130,36);
		TextField1.setFont(new java.awt.Font("Dialog", 1, 18));
		/***keyPressed keyReleased keyTyped ������������ͬʱд��***/
		TextField1.addKeyListener(new KeyListener()            //ʵ�ְ��»س�����Ӧ
		{
			public void keyPressed(KeyEvent e)             //����ĳ����ʱ���ô˷���
			{
				if(e.getKeyCode() == KeyEvent.VK_ENTER)
				{
					StartQuery();
				}
			}
			public void keyReleased(KeyEvent e) {}          //�ͷ�ĳ����ʱ���ô˷���
		    public void keyTyped(KeyEvent e) {}             //����ĳ����ʱ���ô˷���  
		});
		this.getContentPane().add(TextField1);
		
		JButton Button = new JButton("��ѯ");                      //��Ӳ�ѯ��ť
		Button.setBounds(440, 50, 70, 36);
		Button.addActionListener(new ActionListener()       //�������ѯ��ť���ô˷���
		{
			public void actionPerformed(ActionEvent e)
			{
				StartQuery();                                //��ʼ��ѯ
			}
		});
		Button.setFont(new java.awt.Font("Dialog", 1, 17));
		this.getContentPane().add(Button);
		
		JLabel Label2 = SetJLabelLocation("�ͻ�����:",150);               //���β����ǩ���ı���
		TextField2 = SetJTextFieldLocation(150);
		
		JLabel Label3 = SetJLabelLocation("�˻����:",230);               
		TextField3 = SetJTextFieldLocation(230);
		
		JLabel Label4 = SetJLabelLocation("֧������:",310);               
		TextField4 = SetJTextFieldLocation(310);
		
		JLabel Label5 = SetJLabelLocation("�ͻ�����:",390);               
		TextField5 = SetJTextFieldLocation(390);
		
		this.setResizable(false);                                   //���ô����޷��Ŵ�
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);    
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new Query();
	}
}
