package chatRoom;

public class test {
    test(){
        System.out.println(this.getClass().getResource("/").getPath().replaceFirst("WEB-INF/classes/", ""));
    }
    public static void main(String[] args){
        new test();
    }
}
