package chatRoom;


import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@WebServlet("/infoChange")
public class infoChange extends HttpServlet {
    private String makeFileName(String fileName) {
        //使用下划线把UUID和文件名分割开来，后面可能会解析文件名的。
        return UUID.randomUUID().toString() + "_" + fileName;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setCharacterEncoding("UTF-8");
        try {
            String nickName = "";//昵称
            String signature = "";//个性签名
            Connection conn = DBUtil.getConn();
            HttpSession session = request.getSession();
            String userName = (String) session.getAttribute("userName");
            int userId = (int) session.getAttribute(session.getId());
            String path = request.getSession().getServletContext().getRealPath("/")+"picture/" + userName;
            //String path = "/IDEA/web/picture";
            String dir = path;
            //如果该目录不存在，就创建目录
            File file = new File(dir);
            if (!file.exists()) {
                //System.out.println("make new file!!!");
                file.mkdirs();
            }
            //获取上传文件的相关操作
            DiskFileItemFactory factory = new DiskFileItemFactory();
            ServletFileUpload fileUpload = new ServletFileUpload(factory);
            fileUpload.setHeaderEncoding("UTF-8");
            List<FileItem> list = fileUpload.parseRequest(request);
            for (FileItem fileItem : list) {
                //处理表单中的普通输入项
                if (fileItem.isFormField()) {
                    String name = fileItem.getFieldName();
                    if (name.equals("inputNickName")) {
                        nickName = fileItem.getString("UTF-8");
                    }else if(name.equals("textareaSignature")){
                        signature = fileItem.getString("UTF-8");
                    }
                }else{//处理上传的图片
                    //String fileName = fileItem.getName();
                    String tempName = fileItem.getName();
                    if(tempName.equals("")){
                        path="";
                    }else{
                        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHH_mm_ss_SSS");//设置日期格式
                        String time = df.format(new Date());
                        //fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
                        String fileName = makeFileName(time)+".jpg";
                        InputStream inputStream = fileItem.getInputStream();
                        FileOutputStream outputStream = new FileOutputStream(path + "/"+fileName);
                        byte[] bytes = new byte[1024];
                        int len = 0;
                        while((len=inputStream.read(bytes))>0){
                            outputStream.write(bytes,0,len);
                        }
                        inputStream.close();
                        outputStream.close();
                        //删除临时文件的数据
                        fileItem.delete();
                        //System.out.println(path);
                        path ="../picture/"+userName+"/"+fileName;
                        //System.out.println(title + " " + description + " "+ tel+" "+"picture"+"/"+fileName);
                    }
                }
            }
            //System.out.println(path);
            //调用事务更新userInfo表以及photoPath表
            CallableStatement callableStatement = conn.prepareCall("call infoChange(?,?,?,?)");
            callableStatement.setInt(1,userId);
            callableStatement.setString(2,nickName);
            callableStatement.setString(3,signature);
            callableStatement.setString(4,path);
            callableStatement.executeUpdate();
        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
