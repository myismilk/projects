package test;

import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;

public class Transfer extends JFrame 
{
	Connection con = new Verify().connection();     //�������ݿ�,ͬʱ���ؽӿ�con
	String RollOut, RollIn;
	double Amount;
	JTextField TextField1, TextField2, TextField3;
	
	public void StartTransfer()
	{
		RollOut = TextField1.getText();                         //��ȡ�洢���̵��������
		RollIn = TextField2.getText();							//	
		Amount =  Double.parseDouble(TextField3.getText());     //
		/*****��ʼ�������ݿ��еĴ洢����*****/
		try 
		{
			//callablestement��������sql sever�еĴ洢����
			//��һ���ʺ�Ϊ����ֵ������ȷ�ϴ洢�����Ƿ���ȷִ��
		    CallableStatement callableStatement = con.prepareCall("{? = call PTransfer(?,?,?)}");
		    //����ֵ
		    callableStatement.registerOutParameter(1, Types.INTEGER);
		    callableStatement.setString(2, RollOut);                   //�������ת���˻�
		    callableStatement.setString(3, RollIn);                    //�������ת���˻�
		    callableStatement.setDouble(4, Amount);                    //�������ת�˽��
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
	
	public JLabel SetJLabelLocation(String s, int a)        //���ñ�ǩ,�������Ϊ��ǩ�������Լ���ǩ�ϵ��ı���Ϣ
	{
		JLabel Label = new JLabel(s);
		Label.setFont(new java.awt.Font("Dialog", 1, 20));
		Label.setForeground(Color.BLACK);
		Label.setBounds(a,60,100,40);
		return Label;
	}
	
	public JTextField SetJTextFieldLocation(int a)             //�����ı��򣬴������Ϊ�ı���ĺ�����
	{
		JTextField TextField = new JTextField();
		TextField.setFont(new java.awt.Font("Dialog", 1, 16));
		TextField.setBounds(a,120,130,30);
		return TextField;
	}
	
	
	public Transfer()
	{
		this.setTitle("ת��");
		this.setBounds(550,320,750,380);
		
		ImageIcon imageIcon = new ImageIcon("4.jpg");           //ѡȡ����ͼƬ
		JPanel imagePanel = new BackgroundPicture().DrawPicture(750, 380, imageIcon);    //���ñ���ͼƬ������ 
		setContentPane(imagePanel);       //����д���JPanel��ӵ���������Ϊ����
		
		this.setLayout(null);             //�����ڱ���ͼƬ����֮��,ʵ�־��Բ���   ����ڱ�������֮ǰ�������޷����о��Բ���
		
		JLabel Label1 = SetJLabelLocation("ת���˻�",120);                   //���ñ�ǩ
		this.getContentPane().add(Label1);
		TextField1 = SetJTextFieldLocation(100);
		this.getContentPane().add(TextField1);
		
		JLabel Label2 = SetJLabelLocation("ת���˻�",330);
		this.getContentPane().add(Label2);
		TextField2 = SetJTextFieldLocation(310);
		this.getContentPane().add(TextField2);
		
		JLabel Label3 = SetJLabelLocation("ת�˽��",530);
		this.getContentPane().add(Label3);
		TextField3 = SetJTextFieldLocation(500);
		//��������enter�����ύ����
		TextField3.addKeyListener(new KeyListener()                 //������֮ǰ��¼�����еİ��»س���������¼����
		{  
		    public void keyPressed(KeyEvent e)                  //����ĳ����ʱ���ô˷���
		    {           
		        if (e.getKeyCode() == KeyEvent.VK_ENTER)      //if(e.getKeyChar() == '\n')
		        {  
		        	StartTransfer();
		        }
		    }
		    public void keyReleased(KeyEvent e) {}             //  �ͷ�ĳ����ʱ���ô˷�����
		    public void keyTyped(KeyEvent e) {}                //   ����ĳ����ʱ���ô˷�����		    		 
		});
		this.getContentPane().add(TextField3);
		
		JButton Button = new CircleButton("�ύ");                 //����Բ�ΰ�ť�ύ
		Button.setFont(new java.awt.Font("Dialog", 1, 18));
		Button.setBackground(Color.ORANGE);
		Button.setBounds(330,180,100,100);
		Button.addActionListener(new ActionListener()               //����ύ��ʼ����sql�е�ת�˴洢����
		{
			public void actionPerformed(ActionEvent e)
			{
				StartTransfer();
			}
		});
		this.getContentPane().add(Button);
		
		this.setResizable(false);
		this.setVisible(true);
		//�����˳�����,ֻ��Ҫ����ҳ���˳����򼴿�
		//this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
	}
	
	public static void main(String[] args)
	{
		new Transfer();
	}
}
