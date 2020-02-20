package rent;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@WebServlet("/landlordFileUpload")
public class landlordFileUpload extends HttpServlet {
    private String makeFileName(String fileName) {
        //使用下划线把UUID和文件名分割开来，后面可能会解析文件名的。
        return UUID.randomUUID().toString() + "_" + fileName;
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        try {
            String roomType = "";//户型
            String description = "";//上传的描述信息
            String rent = "";//租金
            String addr = "";//房屋地址
            String maxRenter = "";//房屋最多容纳房客
            Connection conn = DBUtil.getConn();
            HttpSession session = request.getSession();
            String userName = (String) session.getAttribute("userName");
            int userId = (int) session.getAttribute(session.getId());
            //设置文件存储路径
            String path = request.getSession().getServletContext().getRealPath("/")+"pictureRent/" + userName;
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
                    if (name.equals("roomType")) {
                        roomType = fileItem.getString("UTF-8");
                    }else if(name.equals("description")){
                        description = fileItem.getString("UTF-8");
                    }else if(name.equals("rent")){
                        rent = fileItem.getString("UTF-8");
                    }else if(name.equals("addr")){
                        addr = fileItem.getString("UTF-8");
                    }else{
                        maxRenter = fileItem.getString("UTF-8");
                    }
                }else{//处理上传的图片
                    //String fileName = fileItem.getName();
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
                    path ="../pictureRent/"+userName+"/"+fileName;
                    //System.out.println(title + " " + description + " "+ tel+" "+"picture"+"/"+fileName);
                }
            }
            //将数据存入数据库
            //更新room表
            CallableStatement callableStatement = conn.prepareCall("call returnRoomId(?,?,?,?,?,?)");
            callableStatement.setString(2, roomType);
            callableStatement.setString(3, description);
            callableStatement.setString(4, rent);
            callableStatement.setString(5,maxRenter);
            callableStatement.setString(6,addr);
            callableStatement.execute();
            int returnRoomId = callableStatement.getInt(1);
            //更新landlord表
            String sql = "insert into landlord(id,roomId) values(?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, userId);
            ps.setInt(2, returnRoomId);
            ps.executeUpdate();
            //更新photo表
            String sql02 = "insert into photo(photoPath,roomId) values(?,?)";
            PreparedStatement ps02 = conn.prepareStatement(sql02);
            ps02.setString(1, path);
            ps02.setInt(2, returnRoomId);
            ps02.executeUpdate();
            ps02.close();
            ps.close();
            callableStatement.close();
            response.sendRedirect("rent/landlord.html?loginName=" + session.getAttribute("userName"));
        }  catch (Exception e) {
            e.printStackTrace();
        }
    }
}
