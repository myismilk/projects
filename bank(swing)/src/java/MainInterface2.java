package test;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.sql.*;
import javax.swing.*;

public class MainInterface2 extends JFrame
{
	Connection con = new Verify().connection();       //�������ݿⲢ��ýӿ�
	PreparedStatement sql;               
	ResultSet res;                                //�����洢sql�еĲ�ѯ���
	String UserName = null;                        //��½�û�������
	String account_number = "A-101";                //�û����˺�
	
	public JButton SetJButtonLocation(String s, int a)          //�˺����������ù��ܰ�ť��λ��
	{
		JButton Button = new JButton(s);
		Button.setBounds(120,a,150,37);
		Button.setFont(new java.awt.Font("Dialog", 1, 18));
		this.getContentPane().add(Button);
		return Button;
	}
	public MainInterface2()
	{
		this.setTitle("�û�����");
		this.setBounds(700,300,380,350);
		
		ImageIcon imageIcon = new ImageIcon("8.jpg");          //���ô���ı���ͼƬ      
		JPanel ImagePanel = new BackgroundPicture().DrawPicture(400, 500, imageIcon);
		this.setContentPane(ImagePanel);
		
		this.setLayout(null);             //���Բ���
		/****��ȡ��¼�û�������****/
		try                            
		{
			sql = con.prepareStatement("SELECT customer_name FROM account, depositor "
					+ "WHERE account.account_number = depositor.account_number AND account.account_number = ?");
			sql.setString(1,account_number);
			res = sql.executeQuery();
			res.next();
			UserName = res.getString("customer_name");
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		
		/***�����ʺ���***/
		JLabel Label1 = new JLabel("��ӭ��¼," + UserName);
		Label1.setBounds(80,60,230,40);
		Label1.setFont(new java.awt.Font("Dialog", 1, 23));
		Label1.setBackground(Color.white);                  //���ñ�ǩ����ɫ
		Label1.setForeground(Color.magenta);                
		Label1.setOpaque(true);                            //���ñ�ǩ��͸��
		this.getContentPane().add(Label1);
		
		JButton Button1 = SetJButtonLocation("�˺�����ѯ", 150);      //���β��빦��ѡ��ť
		Button1.addActionListener(new ActionListener()              //����������û���ѯ����
		{
			public void actionPerformed(ActionEvent e)
			{
				new UserQuery().StartQuery(account_number);
			}
		});
		
		JButton Button2 = SetJButtonLocation("ת��", 210);
		Button2.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				new UserTransfer(account_number);
			}
		});
		
		/*JButton Button3 = SetJButtonLocation("������Ϣ��ѯ", 270);
		Button3.addActionListener(new ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				new UserLoanQuery();
			}
		});
		
		JButton Button4 = SetJButtonLocation("����", 330);*/
		
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
		this.setResizable(false);                         //������Դ�����зŴ����
		this.setVisible(true);
	}
	
	public static void main(String[] args)
	{
		new MainInterface2();
	}
}
