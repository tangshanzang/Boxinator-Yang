package boxinator.service;

import boxinator.entity.BoxOrder;
import boxinator.repository.BoxRepository;


public class BoxService {

    BoxRepository boxRepository;

    public BoxService(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    public boolean createOrder(BoxOrder newOrder){
        double calculatedCost = calculateCost(newOrder.getCountry(), newOrder.getWeight());
        newOrder.setCost(calculatedCost);
        return boxRepository.addOrderToDB(newOrder);
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
