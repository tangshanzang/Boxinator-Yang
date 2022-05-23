package boxinator.controller;

import boxinator.entity.BoxOrder;
import boxinator.service.BoxService;
import express.Express;

public class BoxController {

    private final Express app;
    private final BoxService boxService;

    public BoxController(Express app, BoxService boxService) {
        this.app = app;
        this.boxService = boxService;
        initWebSocketHandler();
    }

    private void initWebSocketHandler() {
        app.ws("/createorder", ws -> {
            ws.onMessage(ctx -> {
                boxService.createOrder(ctx.message(BoxOrder.class));
                ctx.send(boxService.getAllOrders());
            });
        });

        app.ws("/getorders", ws -> {
            ws.onMessage(ctx -> {
                ctx.send(boxService.getAllOrders());
            });
        });
    }
}
