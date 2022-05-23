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

    // create DB if not exists
    public void initDB(){
        try {
            Statement st = connection.createStatement();
            int Result = st.executeUpdate("CREATE DATABASE IF NOT EXISTS boxinator");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // create table if not exists
    public void initTable(){
        try{
            initDB();

            String query = "CREATE TABLE IF NOT EXISTS boxinator.boxes( "
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
                    "INSERT INTO boxinator.boxes (name, weight, colour, country, cost) VALUES (?,?,?,?,?)"
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
        initTable();
        ArrayList<BoxOrder> resultList = new ArrayList<>();

        try {
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * from boxinator.boxes"
            );

            ResultSet result = statement.executeQuery();
            while(result.next()){
                BoxOrder tempOrder = new BoxOrder();
                //name
                String name = result.getString("name");
                tempOrder.setName(name);
                //weight
                double weight = result.getDouble("weight");
                tempOrder.setWeight(weight);
                //colour
                String colour = result.getString("colour");
                tempOrder.setColour(colour);
                //country
                String country = result.getString("country");
                tempOrder.setCountry(country);
                //cost
                double cost = result.getDouble("cost");
                tempOrder.setCost(cost);
                //add to list
                resultList.add(tempOrder);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return resultList;
    }

}
