package test;

import java.awt.*;
import javax.swing.*;

public class BackgroundPicture extends JFrame
{
	public JPanel DrawPicture(int a, int b, ImageIcon image)      //����ͼƬ�����Լ�ͼƬ
	{
		//Dimension��һ������ĳ��Ϳ��װ��һ��
		Dimension frameSize = new Dimension(a,b);         //��дJPanel���������ñ���ͼƬ
		ImageIcon imageIcon = image;
		class ImagePanel extends JPanel                        //ImagePanel�̳�JPanel��,����JPanel����
		{
			 Dimension d;
			 Image image;
			 public ImagePanel(Dimension d, Image image) 
			 {
				 super();
				 this.d = d;
				 this.image = image;
			 }
			 @Override
			 public void paintComponent(Graphics g) 
			 {
				 super.paintComponent(g);
				 g.drawImage(image, 0, 0, d.width, d.height, this);
			 }
		}
		ImagePanel imagePanel = new ImagePanel(frameSize, imageIcon.getImage());     
		return imagePanel;
	}
}
