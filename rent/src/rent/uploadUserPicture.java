package rent;


import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import rent.DBUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@WebServlet("/uploadUserPicture")
public class uploadUserPicture extends HttpServlet {
    private String makeFileName(String fileName) {
        return UUID.randomUUID().toString() + "_" + fileName;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        String userName = (String) session.getAttribute("userName");
        int userId = (int) session.getAttribute(session.getId());
        try {
            String path = request.getSession().getServletContext().getRealPath("/")+"userPicture/" + userName;
            //File testfile = new File(test);
            //testfile.mkdirs();
            //System.out.println(test);
            //String path = this.getClass().getResource("/").getPath().replaceFirst("out/artifacts/chenhui_war_exploded/WEB-INF/classes/", "web/")+"userPicture/" + userName;
            //System.out.println(path);
            File file = new File(path);
            if (!file.exists()) {
                file.mkdirs();
            }
            //获取上传的图片
            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload fileUpload = new ServletFileUpload(factory);
            fileUpload.setHeaderEncoding("UTF-8");
            List<FileItem> list = fileUpload.parseRequest(request);
            for (FileItem fileItem : list){
                //跳过普通项
                if(!fileItem.isFormField()){
                    //设置日期格式用来生成文件名
                    SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHH_mm_ss_SSS");
                    String time  = df.format(new Date());
                    String fileName = makeFileName(time)+".jpg";
                    //System.out.println(fileName);
                    InputStream inputStream = fileItem.getInputStream();
                    FileOutputStream outputStream = new FileOutputStream(path+"/"+fileName);
                    byte[] bytes = new byte[1024];
                    int len = 0;
                    while((len=inputStream.read(bytes))>0){
                        outputStream.write(bytes,0,len);
                    }
                    inputStream.close();
                    outputStream.close();
                    //删除临时文件
                    fileItem.delete();
                    path = "../userPicture/"+userName+"/"+fileName;
                    //System.out.println(path);
                }
            }
            Connection conn = DBUtil.getConn();
            String sql = "insert into userpath(id,photoPath) values (?,?)";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1,userId);
            preparedStatement.setString(2,path);
            preparedStatement.executeUpdate();
            out.println("图片上传成功！");
        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }
}
