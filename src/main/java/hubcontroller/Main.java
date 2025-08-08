package hubcontroller;

import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        
        server.createContext("/spotify", new RequestHandler());
        server.createContext("/discord", new RequestHandler());
        server.createContext("/youtube", new RequestHandler());
        server.createContext("/screenshot", new RequestHandler());
        server.createContext("/google", new RequestHandler());
        server.createContext("/notion", new RequestHandler());
        server.createContext("/notionCalendar", new RequestHandler());
        server.createContext("/steam", new RequestHandler());
                
        server.setExecutor(null);
        server.start();
        System.out.println("Server avviato su http://localhost:8080/");
    }
}
