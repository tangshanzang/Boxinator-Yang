package boxinator.controller;

import boxinator.entity.BoxOrder;
import boxinator.service.BoxService;
import com.google.gson.Gson;
import express.Express;
import org.eclipse.jetty.util.ajax.JSON;

import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.util.List;

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

//                JSON.parse(boxService.getAllOrders());
                // create an object output stream from the output stream so we can send an object through it

            });
        });
    }
}
