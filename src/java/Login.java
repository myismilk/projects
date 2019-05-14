package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;


public class Login extends JFrame
{
	String PassWord;
	String User;
	static JPasswordField jp=new JPasswordField(20);     //���������������󳤶�
	JTextField Text = new JTextField();                  //�û��������ı���
	JRadioButton Button1, Button2;                      //���ù���Ա���û���¼��ѡ��ť
	
	public void User()                                //�û��������
	{
		JLabel Label = new JLabel("user");
		Label.setBounds(140,70,100,50);
		Label.setFont(new java.awt.Font("Dialog",1,23));            //�����С����ʽ����
		Label.setForeground(Color.BLACK);                           //������ɫ���� 
		this.getContentPane().add(Label);
		
		Text.setBounds(200,75,150,35);
		Text.setFont(new java.awt.Font("Dialog", 1, 15));
		//Text.setEditable(false);                           //�����ı���Ϊ���ɱ༭
		this.getContentPane().add(Text);
	}
	
	
	public void StartLogin()
	{
		if(!Button1.isSelected() && !Button2.isSelected())
		{
			JOptionPane.showMessageDialog(null,"��ѡ���¼���!","������ʾ",JOptionPane.ERROR_MESSAGE);  //Ϊѡ�������ʾ
		}
		else
		{
			String temp1 = String.valueOf(jp.getPassword());     //temp�����ڴ˴�����
			String temp2 = String.valueOf(Text.getText());
			//ʹ��MD5�㷨�������������м���,�������ݿ��е�MD5������бȶ�
			if(new Verify().Check(temp2, new MD5().GetMD5Code(temp1), 1) && Button1.isSelected())         //�����Լ����ȷ��
			{
				dispose();                                        //�رյ�ǰ����
				new MainInterface();                              //�������Ա������
			}
			else if(new Verify().Check(temp2, new MD5().GetMD5Code(temp1), 2) && Button2.isSelected())         //�����Լ����ȷ��
			{
				dispose();                                        //�رյ�ǰ����
				new MainInterface2();                              //�����û�������
			}
			else
			{
				JOptionPane.showMessageDialog(null,"������û�����������������!","������ʾ",JOptionPane.ERROR_MESSAGE);  //������ʾ
			}
		}
	}
	
	public void Password()                                  //���������
	{
		JLabel Label = new JLabel("pw");
		Label.setBounds(148,120,100,50);
		Label.setFont(new java.awt.Font("Dialog",1,23));
		Label.setForeground(Color.BLACK);
		this.getContentPane().add(Label);
		
		jp.setEchoChar('*');
		jp.setCaretPosition(0);                                //�������λ��
		jp.setBounds(200,130,150,35);
		jp.setFont(new java.awt.Font("Dialog", 1, 22));
		//Ҳ����дΪnew keyListener()
		jp.addKeyListener(new java.awt.event.KeyAdapter()          //ͨ������enter��������¼����,Ч����ͬ���������¼��ť
		{
			//public void keypressed(KeyEvent e)
			public void keyTyped(java.awt.event.KeyEvent e)
			{
				if(e.getKeyChar() == '\n')                              //ȷ�ϰ��»س���
				{
					StartLogin();
				}
			}
		});
		this.getContentPane().add(jp);      
	}
	
	public void loginButton()                                       //��¼��ť
	{
		JButton Button = new JButton("��¼");
		Button.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				StartLogin();
			}
		});
		Button.setBounds(130,230,100,35);
		Button.setFont(new java.awt.Font("Dialog", 1, 15));
		this.getContentPane().add(Button);
	}
	
	public void rewriteButton()                                   //���ð�ť
	{
		JButton Button = new JButton("����");
		Button.addActionListener(new ActionListener()              //�������������¼�
		{
			public void actionPerformed(ActionEvent e)
			{
				jp.setText("");                                   //����������������Ĳ���
			}
		});
		Button.setBounds(270,230,100,35);
		Button.setFont(new java.awt.Font("Dialog", 1, 15));
		this.getContentPane().add(Button);
	}
	
	public void Jurisdiction()                                  //Ȩ��ѡ������
	{
		Button1 = new JRadioButton("����Ա");                      //����Ա��ť����
		Button1.setBounds(160,185,90,35);
		Button1.setFont(new java.awt.Font("Dialog", 1, 18));
		Button1.addActionListener(new ActionListener()             //�û������Ա����ѡ��ť���ֻ������һ������ѡ��״̬�����������һ��ʱ����һ����ѡ��״̬����Ϊfalse
		{
			public void actionPerformed(ActionEvent e)              
			{
				Button2.setSelected(false);                   //�������Ա���û���ѡ��ťѡ��״̬��Ϊfalse,��ʵ�ֶ�ѡһ��Ŀ��
			}
		});
		this.getContentPane().add(Button1);
		
		Button2 = new JRadioButton("�û�");                        //�û���ť����
		Button2.setBounds(250,185,90,35);
		Button2.setFont(new java.awt.Font("Dialog", 1, 18));
		Button2.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				Button1.setSelected(false);                    //����û������Ա��ѡ��ťѡ��״̬��Ϊfalse
			}
		});
		this.getContentPane().add(Button2);
	}
	
	public Login()
	{
		this.setTitle("��¼���й���ϵͳ");
		
		ImageIcon imageIcon = new ImageIcon("1.jpg");                               //ѡȡ����ͼƬ
		JPanel imagePanel = new BackgroundPicture().DrawPicture(480, 350, imageIcon);    //���ñ�������     
		setContentPane(imagePanel);                                                //��ӱ���ͼƬ
		
		setLayout(null);                   //���Բ���������Ҫ����ɱ���ͼƬ������֮��
		
		User();
		Password();
		loginButton();
		rewriteButton();
		Jurisdiction();
		
    	this.setBounds(600,400,480,350);
    	this.setResizable(false);                                           //���ô��ڹ̶���С,��ֹ�Ŵ�
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);                    //�����˳�����,����رմ��ں�������ں�̨���������ڴ�
		setVisible(true);                                                 //���ÿɼ�
	}
	
	public static void main(String[] args)
	{
		new Login();
	}
	
}
