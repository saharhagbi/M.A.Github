import Objects.Commit;
import com.google.gson.Gson;

public class TestDependencyWork
{
    public void foo()
    {
        Commit commitForChecking = null;
        Gson gson = new Gson();

        String str = gson.toJson("Working!!");
        System.out.println(str);
        System.out.println("Working!!");
    }

    public static void main(String[] args)
    {
        TestDependencyWork stam = new TestDependencyWork();
        stam.foo();
    }
}
