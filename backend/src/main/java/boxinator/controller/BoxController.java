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
//                System.out.println(ctx.message());
                ctx.send(boxService.createOrder(ctx.message(BoxOrder.class)));
            });
        });

        app.ws("/getorders", ws -> {
            ws.onMessage(ctx -> {
                ctx.send(boxService.getAllOrders());
//                System.out.println(boxService.getAllOrders());
            });
        });
    }
}
