package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;
import java.sql.*;

public class LoanQuery extends JFrame
{
	JTextField TextField1, TextField2, TextField3, TextField4;
	Connection con = new Verify().connection();
	public void StartQuery()
	{
		String l_n = TextField1.getText();
		
		try
		{
			//callǰû��?�򲻹ܷ���ֵ
			CallableStatement callableStatement = con.prepareCall("{call PQueryLoan(?, ?, ?, ?)}");
			//�������
			callableStatement.setString(1, l_n);
			//�������
			callableStatement.registerOutParameter(2,Types.DOUBLE);
			//�������
			callableStatement.registerOutParameter(3,Types.VARCHAR);
			//�������
			callableStatement.registerOutParameter(4,Types.DOUBLE);
			//��ʼִ�в�ѯ����
			callableStatement.execute();
			//���������������ܶ�
			double totalLoanAmount = callableStatement.getDouble(2);
			//����������֧������
			String branchName = callableStatement.getString(3);
			//�����������ѻ�����
			double paidAmount = callableStatement.getDouble(4);
			TextField2.setText(String.valueOf(totalLoanAmount));    //���ν���ѯ��������Ӧ���ı�����
			TextField3.setText(branchName);
			TextField4.setText(String.valueOf(paidAmount));
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public JLabel SetJLabelLocation(String s, int a)        //���ñ�ǩ,�������Ϊ��ǩ�������Լ���ǩ�ϵ��ı���Ϣ
	{
		JLabel Label = new JLabel(s);
		Label.setBounds(65,a,100,40);
		Label.setFont(new java.awt.Font("����",1,21));
		Label.setForeground(Color.black);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //�����ı��򣬴������Ϊ�ı���ĺ�����
	{
		JTextField TextField = new JTextField();
		TextField.setBounds(170,a,160,35);
		TextField.setFont(new java.awt.Font("Dialog", 1, 18));
		return TextField;
	}
	
	
	public LoanQuery()
	{
		this.setTitle("������Ϣ��ѯ");
		this.setBounds(700,300,400,500);
		
		ImageIcon imageIcon = new ImageIcon("7.jpg");   //���ñ���ͼƬ
		JPanel ImagePanel = new BackgroundPicture().DrawPicture(400, 500, imageIcon);
		this.setContentPane(ImagePanel);
		
		this.setLayout(null);              //ʵ�־��Բ���
		
		JLabel Label1 = new JLabel("�����˺�:");               //�����ǩ
		Label1.setBounds(65,50,220,40);
		Label1.setFont(new java.awt.Font("����",1,20));
		Label1.setForeground(Color.black);
		this.getContentPane().add(Label1);
		TextField1 = new JTextField();
		TextField1.setBounds(180,50,140,35);
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
		
		
		JButton Button1 = new JButton("��ѯ");               //��Ӳ�ѯ��ť
		Button1.setBounds(170, 110, 80,38);
		Button1.setFont(new java.awt.Font("Dialog", 1, 20));
		Button1.addActionListener(new ActionListener()           //�����ť���ô˺�����ѯ
		{
			public void actionPerformed(ActionEvent e)
			{
				StartQuery();
			}
		});
		this.getContentPane().add(Button1);
		
		JLabel Label2 = SetJLabelLocation("������:",180);            //�������ñ�ǩ���ı���
		this.getContentPane().add(Label2);
		TextField2 = SetJTextFieldLocation(180);
		this.getContentPane().add(TextField2);
		
		JLabel Label3 = SetJLabelLocation("����֧��:",260);
		this.getContentPane().add(Label3);
		TextField3 = SetJTextFieldLocation(260);
		this.getContentPane().add(TextField3);
		
		JLabel Label4 = SetJLabelLocation("�ѻ�����:",340);
		this.getContentPane().add(Label4);
		TextField4 = SetJTextFieldLocation(340);
		this.getContentPane().add(TextField4);
		
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		this.setResizable(false);                                      //���ô��岻�ɷŴ�
		this.setVisible(true);                                        //���ô���ɼ�
	}
	
	public static void main(String[] args)
	{
		new LoanQuery();
	}
}
