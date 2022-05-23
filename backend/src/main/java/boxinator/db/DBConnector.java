package boxinator.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConnector {

    private static Connection connection;

    public static Connection connectToDB(){
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/","root","root");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }
}
