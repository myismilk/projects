package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;
import java.sql.*;

public class UserTransfer extends JFrame
{
	Connection con = new Verify().connection();   //�������ݿⲢ���ؽӿ�
	JTextField TextField1, TextField2;
	public void StartTransfer(String account_number)
	{
		String rollOut = TextField1.getText();                         //��ȡ�洢���̵��������
		double amount = Double.parseDouble(TextField2.getText());							//	
		/*****��ʼ�������ݿ��еĴ洢����*****/
		try 
		{
			//callablestement��������sql sever�еĴ洢����
			//��һ���ʺ�Ϊ����ֵ������ȷ�ϴ洢�����Ƿ���ȷִ��
		    CallableStatement callableStatement = con.prepareCall("{? = call PTransfer(?,?,?)}");
		    //����ֵ
		    callableStatement.registerOutParameter(1, Types.INTEGER);
		    callableStatement.setString(2, account_number);                   //�������ת���˻�
		    callableStatement.setString(3, rollOut);                    //�������ת���˻�
		    callableStatement.setDouble(4, amount);                    //�������ת�˽��
		    callableStatement.execute();                               //��ʼִ��ת�˹���
		    //��÷���ֵ
		    int ReturnValue=callableStatement.getInt(1);
		    if(ReturnValue == 0)                           
		    {
		    	//�洢������ȷִ���򵯳���ʾ��Ϣ
		    	JOptionPane.showMessageDialog(null, "ת�˳ɹ�!", "��ʾ",JOptionPane.INFORMATION_MESSAGE);
		    }
		    else
		    {
		    	//�����������ʾ��Ϣ
		    	JOptionPane.showMessageDialog(null, "ת��ʧ��!", "��ʾ",JOptionPane.ERROR_MESSAGE);
		    }
		    callableStatement.close();  //�رյ���
		}catch (Exception e1) 
		{
			e1.printStackTrace();
		}
	}
	
	public void SetJLabelLocation(String s, int x)        //���ñ�ǩ
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 18));
		Label.setOpaque(true);           //���ñ�ǩ��͸��
		Label.setBounds(x,40,80,35);
		this.getContentPane().add(Label);
	}
	
	public JTextField SetJTextFieldLocation(int x)             //�����ı���
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 20));
		TextField.setBounds(x,90,130,36);
		this.getContentPane().add(TextField);
		return TextField;
	}
	
	public UserTransfer(String account_number)
	{
		this.setTitle("ת��");
		this.setBounds(800,400,350,270);
		ImageIcon imageIcon = new ImageIcon("9.jpg");               //����ͼƬ����
		JPanel imagePanel = new BackgroundPicture().DrawPicture(400, 400, imageIcon);
		this.setContentPane(imagePanel);
		
		this.setLayout(null);              //ʵ�־��Բ���
		
		SetJLabelLocation("ת���˺�", 53);   //������ӱ�ǩ���ı���
		SetJLabelLocation("ת����", 210);
		TextField1 = SetJTextFieldLocation(30);           
		TextField2 = SetJTextFieldLocation(190);
		TextField2.addKeyListener(new KeyListener()
		{
			public void keyPressed(KeyEvent e)            //���»س����ô˺���
			{
				if (e.getKeyCode() == KeyEvent.VK_ENTER)      //if(e.getKeyChar() == '\n')
		        {  
		        	StartTransfer(account_number);
		        }
			}
			public void keyReleased(KeyEvent e) {};         //�ͷŻس������ô˺���
			public void keyTyped(KeyEvent e) {};              //����س������ô˺���
			
		});
		
		JButton Button = new JButton("�ύ");                     //�����ύ��ť
		Button.setFont(new java.awt.Font("Dialog", 1, 18));
		Button.setBounds(130,150,90,35);
		Button.addActionListener(new ActionListener()              //��������ô˺���
		{
			public void actionPerformed(ActionEvent e)
			{
				StartTransfer(account_number);          //��ʼִ�����ݿ��е�ת������
			}
		});
		this.getContentPane().add(Button);
		
		this.setLayout(null);               //ʵ�־��Բ���
		//this.setDefaultCloseOperation(this.EXIT_ON_CLOSE);
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new UserTransfer("A-101");
	}
}
