package boxinator.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnector {

    private static Connection connection;

    public static Connection connectToDB(){
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/box-jdbc", "root", "root");
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return connection;
    }
}
