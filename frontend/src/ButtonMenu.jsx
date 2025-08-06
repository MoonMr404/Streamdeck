import React, { useState } from 'react';

function ButtonMenu() {
    const [message, setMessage] = useState(""); // stato messaggio

    const funcButtons = [
        { funcName: "Home", funcIcon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png", functionURL: "/home" },
        { funcName: "Task", funcIcon: "https://cdn-icons-png.flaticon.com/512/3176/3176364.png", functionURL: "/tasks" },
        { funcName: "Meteo", funcIcon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", functionURL: "/weather" },
        { funcName: "Spotify", funcIcon: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Black.png", functionURL: "/spotify" },
        { funcName: "Discord", funcIcon: "https://www.svgrepo.com/show/333523/discord-alt.svg", functionURL: "/discord" },
        { funcName: "Note", funcIcon: "https://cdn-icons-png.flaticon.com/512/1828/1828925.png", functionURL: "/notes" },
        { funcName: "Profilo", funcIcon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", functionURL: "/profile" },
        { funcName: "Impostazioni", funcIcon: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png", functionURL: "/settings" }
    ];

    const fetchMessage = (endpoint) => {
        console.log("Chiamata a endpoint:", endpoint); // DEBUG

        const serverURL = 'http://192.168.178.112:8080' + endpoint;

        fetch(serverURL)
            .then(res => {
                if (!res.ok) throw new Error("Server Response Error");
                return res.text();
            })
            .then(text => {
                console.log("Risposta server:", text);
                setMessage(text);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setMessage("Errore messaggio");
            });
    };

    return (
        <div>
            {/* Messaggio di feedback */}
            <div className="text-white mb-4 text-center">{message}</div>

            {/* Container principale */}
            <div className="rounded-2xl w-full max-w-8xl border border-gray-700/20 bg-zinc-900/40 shadow-2xl overflow-hidden p-8 text-gray-200 backdrop-blur-xl">

                {/* Intestazione */}
                <div className="flex justify-center items-center mb-10 w-full">
                    <h1 className="text-3xl font-bold text-center">Functions</h1>
                </div>

                {/* Contenitore dei pulsanti */}
                <div className="grid grid-cols-4 gap-4">
                    {funcButtons.map((func) => (
                        <div key={func.funcName} className="flex justify-center items-center">
                            <div className="w-full flex justify-center bg-gray-300 p-1 rounded-xl">
                                <button
                                    onClick={() => fetchMessage(func.functionURL)}
                                    className="flex flex-col items-center justify-center space-y-2 bg-indigo-500/80 hover:bg-indigo-600 transition p-4 rounded-xl h-[120px] w-full shadow-md min-w-s"
                                >
                                    <img src={func.funcIcon} alt={func.funcName} className="w-10 h-10" />
                                    <span className="text-white font-medium">{func.funcName}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ButtonMenu;
