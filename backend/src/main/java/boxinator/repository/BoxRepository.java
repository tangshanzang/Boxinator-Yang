package boxinator.repository;

import boxinator.db.DBConnector;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class BoxRepository {
    // connect to JDBC
    Connection connection = DBConnector.connectToDB();

    public BoxRepository(){
        initTable();
    }

    // create table if not exists
    public void initTable(){
        try{
            String query = "create table if not exists boxes( "
                    + " id INT PRIMARY KEY not Null AUTO_INCREMENT,"
                    + " name VARCHAR(80) not NULL,"
                    + " weight DOUBLE not NULL,"
                    + " colour VARCHAR(80) not NULL,"
                    + " country VARCHAR(80) not NULL,"
                    + " cost DOUBLE not NULL)";

            Statement statement = connection.createStatement();

            statement.executeUpdate(query);
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }

//    addOrderToDB

}
