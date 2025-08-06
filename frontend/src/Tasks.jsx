import React from 'react';

function Tasks() {
    // Lista fittizia di task
    const fakeTasks = [
        { title: "Task 1", description: "Descrizione 1" },
        { title: "Task 2", description: "Descrizione 2" },
        { title: "Task 3", description: "Descrizione 3" },
        { title: "Task 4", description: "Descrizione 4" },
        { title: "Task 5", description: "Descrizione 5" },
        { title: "Task 6", description: "Descrizione 6" },
        { title: "Task 7", description: "Descrizione 7" },
        { title: "Task 8", description: "Descrizione 8" },
        { title: "Task 9", description: "Descrizione 9" },
        { title: "Task 10", description: "Descrizione 10" },
    ];

    return (
        <div
            className="rounded-2xl w-full max-w-xl border border-gray-700/20 bg-zinc-900/40 shadow-2xl overflow-hidden p-8 text-gray-200 backdrop-blur-xl">

            {/* Intestazione */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">Task</h1>
                <img
                    className="rounded-xl w-10 h-10 object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Microsoft_To-Do_icon.svg/1024px-Microsoft_To-Do_icon.svg.png"
                    alt="Tasks logo"
                />
            </div>

            {/* Contenitore scrollabile */}
            <div className="space-y-4 overflow-y-auto max-h-96 pr-2">
                {fakeTasks.map((task, index) => (
                    <div key={index}
                         className="bg-indigo-200/100 rounded-xl border-r-8 border-b-8 border-black p-4 shadow-md">
                        {/* Wrapper orizzontale per separare info e bottone */}
                        <div className="flex justify-between items-center">

                            {/* Parte sinistra: info task */}
                            <div>
                                <h2 className="text-xl font-semibold text-black">{task.title}</h2>
                                <p className="text-black text-sm">{task.description}</p>
                                <p className="text-black text-sm mt-1">MON 5:00 PM</p>
                            </div>

                            {/* Parte destra: bottone */}
                            <button
                                className="ml-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                                Completata
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Tasks;
