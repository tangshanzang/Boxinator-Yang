package boxinator.service;

import boxinator.repository.BoxRepository;

import java.sql.SQLException;

public class BoxService {

    BoxRepository boxRepository;

    public BoxService(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }
}
