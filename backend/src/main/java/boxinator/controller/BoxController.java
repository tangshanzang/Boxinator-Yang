package boxinator.controller;

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

//            ws.onConnect(ctx ->
//                System.out.println("connected"));

            ws.onMessage(ctx -> {
                System.out.println(ctx.message());
            });
//
//        app.ws("/createBox", ws -> {
//            ws.onMessage(ctx -> {
//                System.out.println('1');
//                ctx.send(boxService);
//            });
//        });
        });
    }
}
