package hubcontroller;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class RequestHandler implements HttpHandler {

    int count = 0;

    public boolean isProcessRunning(String processName) {
        try {
            Process process = Runtime.getRuntime().exec("ps -e");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.toLowerCase().contains(processName.toLowerCase())) {
                    return true;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // CORS headers
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");

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
                    if (!isProcessRunning("Spotify")) {
                        Runtime.getRuntime().exec("open -a Spotify");
                        response = "Spotify avviato";
                    } else {
                        Runtime.getRuntime().exec("pkill -f Spotify");
                        response = "Spotify chiuso";
                    }
                    statusCode = 200;
                    break;

                case "/discord":
                    if (!isProcessRunning("Discord")) {
                        Runtime.getRuntime().exec("open -a Discord");
                        response = "Discord avviato";
                    } else {
                        Runtime.getRuntime().exec("pkill -f Discord");
                        response = "Discord chiuso";
                    }
                    statusCode = 200;
                    break;

                case "/google":
                    if (!isProcessRunning("Google Chrome")) {
                        Runtime.getRuntime().exec(new String[]{"open", "-a", "Google Chrome"});
                        response = "Google Chrome avviato";
                    } else {
                        Runtime.getRuntime().exec(new String[]{"pkill", "-f", "Google Chrome"});
                        response = "Google Chrome chiuso";
                    }
                    statusCode = 200;
                    break;


                case "/notion":
                    if (!isProcessRunning("Notion")) {
                        Runtime.getRuntime().exec("open -a Notion");
                        response = "Notion avviato";
                    } else {
                        Runtime.getRuntime().exec("pkill -f Notion");
                        response = "Notion chiuso";
                    }
                    statusCode = 200;
                    break;

                case "/notionCalendar":
                    if (!isProcessRunning("Notion Calendar")) {
                        Runtime.getRuntime().exec(new String[]{"open", "-a", "Notion Calendar"});
                        response = "Notion Calendar avviato";
                    } else {
                        Runtime.getRuntime().exec(new String[]{"pkill", "-f", "Notion Calendar"});
                        response = "Notion Calendar chiuso";
                    }
                    statusCode = 200;
                    break;
                case "/steam":
                    if (!isProcessRunning("Steam")) {
                        Runtime.getRuntime().exec(new String[]{"open", "-a", "Steam"});
                        response = "Steam avviato";
                    } else {
                        Runtime.getRuntime().exec(new String[]{"pkill", "-f", "Steam"});
                        response = "Steam chiuso";
                    }
                    statusCode = 200;
                    break;

                case "/screenshot":
                    String screen = "screenshot" + count + ".png";
                    String filePath = System.getProperty("user.home") + "/Desktop/" + screen;
                    Runtime.getRuntime().exec(new String[]{"screencapture", filePath});
                    response = "Screenshot " + count + ".png salvato";
                    System.out.println(response);
                    count++;
                    statusCode = 200;
                    break;

                default:
                    response = "Comando sconosciuto: " + path;
                    statusCode = 404;
            }
        } catch (IOException e) {
            response = "Errore nell'avvio/chiusura dell'app: " + e.getMessage();
            statusCode = 500;
        }

        byte[] bytes = response.getBytes("UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
