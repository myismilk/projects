package chatRoom;


import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@WebServlet("/receiveFile")
public class receiveFile extends HttpServlet {
    private String makeFileName(String fileName) {
        //使用下划线把UUID和文件名分割开来，后面可能会解析文件名
        return UUID.randomUUID().toString() + "_" + fileName;
    }

    private static final long serialVersionUID = 1L;
    //private String uploadPath = this.getClass().getResource("/").getPath().replaceFirst("out/artifacts/chenhui_war_exploded/WEB-INF/classes/", "web/") + "file/"; // 文件存储目录

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uploadPath = request.getSession().getServletContext().getRealPath("/")+"file/";
        String path = ""; //存储文件完整路径
        String showPath = "";//用于显示的文件路径
        HttpSession session = request.getSession();
        int userId = (int) session.getAttribute(session.getId());
        int roomId = 0;
        //System.out.println("exit!");
        try {
            // Create a factory for disk-based file items
            DiskFileItemFactory factory = new DiskFileItemFactory();
            // Create a new file upload handler
            ServletFileUpload upload = new ServletFileUpload(factory);
            upload.setHeaderEncoding("UTF-8");
            // Set overall request size constraint
            upload.setSizeMax(4194304); // 设置最大文件尺寸，这里是4MB

            List<FileItem> list = upload.parseRequest(request);
            for (FileItem fileItem : list) {
                if (fileItem.isFormField()) {
                    roomId = Integer.parseInt(fileItem.getString("UTF-8"));
                    //System.out.println(val);
                } else {
                    String tempName = fileItem.getName();
                    //System.out.println(tempName);
                    SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHH_mm_ss_SSS");//设置日期格式
                    String time = df.format(new Date());
                    String fileName = makeFileName(time) + tempName.substring(tempName.lastIndexOf("."), tempName.length());
                    //System.out.println(fileName);
                    InputStream inputStream = fileItem.getInputStream();
                    FileOutputStream outputStream = new FileOutputStream(uploadPath + "/" + fileName);
                    byte[] bytes = new byte[1024];
                    int len = 0;
                    while ((len = inputStream.read(bytes)) > 0) {
                        outputStream.write(bytes, 0, len);
                    }
                    inputStream.close();
                    outputStream.close();
                    //删除临时文件的数据
                    fileItem.delete();
                    //System.out.println("upload succeed");
                    path = "../file/" + fileName;
                    showPath = tempName;
                    //System.out.println(path+" "+showPath);
                }
            }
            String inputContent = path + "+" + showPath;
            Connection conn = DBUtil.getConn();
            String sql = "insert into message(fromId,toId,msg,roomId) values(?,?,?,?)";
            PreparedStatement preparedStatement = conn.prepareStatement(sql);
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, -1);
            preparedStatement.setString(3, inputContent.trim());
            preparedStatement.setInt(4, roomId);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
