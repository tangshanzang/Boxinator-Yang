package boxinator.service;

import boxinator.repository.BoxRepository;


public class BoxService {

    BoxRepository boxRepository;

    public BoxService(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    public boolean createOrder(Object newOrder){
//        return boxRepository.addOrderToDB(newOrder);
        return false;
    }
}
