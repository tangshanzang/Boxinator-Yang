package boxinator.service;

import boxinator.entity.BoxOrder;
import boxinator.repository.BoxRepository;


public class BoxService {

    BoxRepository boxRepository;

    public BoxService(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    public boolean createOrder(BoxOrder newOrder){
        // add price calculation!
        // update cost before saving
        return boxRepository.addOrderToDB(newOrder);
    }
}
