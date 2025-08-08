import React, { useState } from 'react';

function App() {
    const [message, setMessage] = useState("");

    const funcButtons = [
        { funcName: "YouTube", funcIcon: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png", functionURL: "/youtube" },
        { funcName: "Task", funcIcon: "https://www.freeiconspng.com/thumbs/photography-icon-png/photography-icon-png-0.png", functionURL: "/screenshot" },
        { funcName: "Meteo", funcIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png", functionURL: "/google" },
        { funcName: "Spotify", funcIcon: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green-300x300.png", functionURL: "/spotify" },
        { funcName: "Discord", funcIcon: "https://www.svgrepo.com/show/333523/discord-alt.svg", functionURL: "/discord" },
        { funcName: "Notion", funcIcon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", functionURL: "/notion" },
        { funcName: "NotionCalendar", funcIcon: "https://www.svgrepo.com/show/35457/calendar-symbol.svg", functionURL: "/notionCalendar" },
        { funcName: "Steam", funcIcon: "https://images.icon-icons.com/2428/PNG/512/steam_black_logo_icon_147078.png", functionURL: "/steam" },
        { funcName: "Aggiungi", funcIcon: "https://static.thenounproject.com/png/961411-200.png", functionURL: "/addNewButton" }
    ];

    const fetchMessage = (endpoint) => {
        const serverURL = 'http://192.168.178.112:8080' + endpoint;

        fetch(serverURL)
            .then(res => {
                if (!res.ok) throw new Error("Server Response Error");
                return res.text();
            })
            .then(text => setMessage(text))
            .catch(err => {
                console.error("Fetch error:", err);
                setMessage("Errore messaggio");
            });
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
            <div className="rounded-2xl w-full max-w-screen-xl mx-auto border border-gray-400/20 bg-zinc-900/40 shadow-2xl overflow-hidden p-6 text-gray-200 backdrop-blur-xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {funcButtons.map((func) => (
                        <div key={func.funcName} className="flex justify-center items-center w-full">
                            <button
                                onClick={() => fetchMessage(func.functionURL)}
                                className="flex flex-col items-center justify-center space-y-2 bg-zinc-700 hover:bg-zinc-800 transition-all p-4 rounded-xl h-36 w-full shadow-md"
                            >
                                <img
                                    src={func.funcIcon}
                                    alt={func.funcName}
                                    className="w-14 h-14 object-contain"
                                />
                                
                            </button>
                        </div>
                    ))}
                </div>
                {message && (
                    <div className="mt-6 text-center text-sm text-green-400">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
