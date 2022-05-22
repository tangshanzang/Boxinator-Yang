package boxinator;

import express.Express;


public class Application {
    Application() {
        Express app = new Express();
        app.listen(4000);
    }
}
