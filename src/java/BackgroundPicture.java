package test;

import java.awt.*;
import javax.swing.*;

public class BackgroundPicture extends JFrame
{
	public JPanel DrawPicture(int a, int b, ImageIcon image)      //传入图片长宽以及图片
	{
		//Dimension将一个组件的长和宽封装在一起
		Dimension frameSize = new Dimension(a,b);         //重写JPanel方法来设置背景图片
		ImageIcon imageIcon = image;
		class ImagePanel extends JPanel                        //ImagePanel继承JPanel类,重载JPanel方法
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
