package boxinator.service;

import boxinator.entity.BoxOrder;
import boxinator.repository.BoxRepository;

import java.util.ArrayList;
import java.util.Optional;


public class BoxService {

    BoxRepository boxRepository;

    public BoxService(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    public String createOrder(BoxOrder newOrder){
        String msg = "";
        double calculatedCost = calculateCost(newOrder.getCountry(), newOrder.getWeight());
        newOrder.setCost(calculatedCost);

        if(boxRepository.addOrderToDB(newOrder)){
            msg = "Order has been saved to DB";
        }else{
            msg = "Order failed";
        }
        return msg;
    }

    public ArrayList<BoxOrder> getAllOrders(){
        return boxRepository.getAllOrders();
    }

    public double calculateCost(String country, Double weight){
        double calculatedCost = 0;
        switch (country) {
            case "sweden" -> {
                calculatedCost = weight * 1.3;
            }
            case "china" -> {
                calculatedCost = weight * 4;
            }
            case "brazil" -> {
                calculatedCost = weight * 8.6;
            }
            case "australia" -> {
                calculatedCost = weight * 7.2;
            }
        }
        return calculatedCost;
    }
}
