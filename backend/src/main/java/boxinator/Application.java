package boxinator;

import boxinator.controller.BoxController;
import boxinator.repository.BoxRepository;
import boxinator.service.BoxService;
import express.Express;


public class Application {
    Application() {
        Express app = new Express();
        app.listen(4000);

        new BoxController(app, new BoxService(new BoxRepository()));
    }
}
