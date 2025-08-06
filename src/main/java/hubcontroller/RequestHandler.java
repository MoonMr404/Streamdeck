package hubcontroller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;

public class RequestHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // Aggiungi header CORS per permettere chiamate da browser
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");

        // Gestisci richieste OPTIONS (preflight CORS)
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
            return;
        }

        String path = exchange.getRequestURI().getPath();

        String response = "Azione non riconosciuta";
        int statusCode = 404;

        try {
            switch (path) {
                case "/spotify":
                    Runtime.getRuntime().exec("open -a Spotify");
                    response = "Spotify avviato";
                    statusCode = 200;
                    break;
                case "/discord":
                    Runtime.getRuntime().exec("open -a Discord");
                    response = "Discord avviato";
                    statusCode = 200;
                    break;
                case "/google":
                    Runtime.getRuntime().exec("open -a Google");
                    response = "Google avviato";
                    statusCode = 200;
                    break;
                
                default:
                    response = "Comando sconosciuto: " + path;
                    statusCode = 404;
            }
        } catch (IOException e) {
            response = "Errore nell'avvio dell'app: " + e.getMessage();
            statusCode = 500;
        }

        byte[] bytes = response.getBytes("UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
