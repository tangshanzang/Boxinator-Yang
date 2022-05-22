package boxinator.repository;

import boxinator.db.DBConnector;
import boxinator.entity.BoxOrder;

import java.sql.*;
import java.util.ArrayList;
import java.util.Optional;

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

    public boolean addOrderToDB(BoxOrder newOrder){
        boolean savedToDB = true;

        try {
            PreparedStatement statement = connection.prepareStatement(
                    "INSERT INTO boxes (name, weight, colour, country, cost) VALUES (?,?,?,?,?)"
            );
            statement.setString(1, newOrder.getName());
            statement.setDouble(2, newOrder.getWeight());
            statement.setString(3, newOrder.getColour());
            statement.setString(4, newOrder.getCountry());
            statement.setDouble(5, newOrder.getCost());

            int resultSet = statement.executeUpdate();

            if(resultSet != 1){
                savedToDB = false;
            }

            statement.close();
            // connection.close()?

        } catch (SQLException e) {
            e.printStackTrace();
            savedToDB = false;
        }
        return savedToDB;
    }

    // get all orders
    public ArrayList<BoxOrder> getAllOrders(){
        ArrayList<BoxOrder> resultList = new ArrayList<>();

        try {
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * from boxes"
            );

            ResultSet result = statement.executeQuery();
            while(result.next()){
                BoxOrder tempOrder = new BoxOrder();
                String name = result.getString("name");
                System.out.println(name);

                tempOrder.setName(name);

                // test
                resultList.add(tempOrder);
            }




        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resultList;
    }

}
