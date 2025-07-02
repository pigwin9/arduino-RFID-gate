"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Odbicia() {
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleEditClick = () => setShowPopup(true);
  const handleSave = () => setShowPopup(false);
  const handleCancel = () => {
    setShowPopup(false);
    setStartTime("");
    setEndTime("");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">Lista odbić</h1>
            <p className="text-gray-600">Imię i nazwisko pracownika</p>
          </div>
          <button
            className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition cursor-pointer"
            onClick={() => router.push("/panel/")}
          >
            Powrót do panelu
          </button>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-full h-1 bg-gray-300"></div>
          <p className="text-2xl font-bold w-full">✔ Status pracownika</p>

          <div className="bg-white rounded-xl px-6 py-4 shadow flex items-center gap-2">
            <span className="text-xl text-green-600">🟢</span>
            <div>
              <div className="text-xs text-gray-500">Zalogowany</div>
              <div className="text-lg font-bold">4h 36min</div>
            </div>
          </div>

          <div className="w-full h-1 bg-gray-300"></div>
        


          
          <div className="bg-gray-100 rounded-xl px-6 py-4 shadow  gap-2 w-full">
                    <div className="w-full h-min flex justify-between items-center">
            <p className="text-2xl font-bold w-full">🗓 Historia odbić</p>
            <button className="cursor-pointer 
            text-nowrap
            bg-slate-600 
            hover:bg-slate-700 
            transition
            mb-5
            rounded 
            text-white px-4 py-2">Dodaj odbicie</button>
        </div>
            <div className="w-full h-0.5 mb-5 bg-gray-300"></div>

        <div className="flex justify-between mb-3 items-center w-full">
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛7:43 - 15:06</div>
            <div>
              <button
                className="bg-slate-600 text-white px-3 py-2 rounded hover:bg-slate-700 mr-1 cursor-pointer transition"
                onClick={handleEditClick}
              >
                Edytuj odbicie
              </button>
              <button
                className="bg-red-400 text-white px-3 py-2 rounded hover:bg-red-500 mr-1 cursor-pointer transition"
              >
                Usuń odbicie
              </button>
            </div>
        </div>
                <div className="flex justify-between mb-3 items-center w-full">
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛7:43 - 15:06</div>
            <div>
              <button
                className="bg-slate-600 text-white px-3 py-2 rounded hover:bg-slate-700 mr-1 cursor-pointer transition"
                onClick={handleEditClick}
              >
                Edytuj odbicie
              </button>
              <button
                className="bg-red-400 text-white px-3 py-2 rounded hover:bg-red-500 mr-1 cursor-pointer transition"
              >
                Usuń odbicie
              </button>
            </div>
        </div>
                <div className="flex justify-between mb-3 items-center w-full">
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛7:43 - 15:06</div>
            <div>
              <button
                className="bg-slate-600 text-white px-3 py-2 rounded hover:bg-slate-700 mr-1 cursor-pointer transition"
                onClick={handleEditClick}
              >
                Edytuj odbicie
              </button>
              <button
                className="bg-red-400 text-white px-3 py-2 rounded hover:bg-red-500 mr-1 cursor-pointer transition"
              >
                Usuń odbicie
              </button>
            </div>
        </div>
                <div className="flex justify-between mb-3 items-center w-full">
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛7:43 - 15:06</div>
            <div>
              <button
                className="bg-slate-600 text-white px-3 py-2 rounded hover:bg-slate-700 mr-1 cursor-pointer transition"
                onClick={handleEditClick}
              >
                Edytuj odbicie
              </button>
              <button
                className="bg-red-400 text-white px-3 py-2 rounded hover:bg-red-500 mr-1 cursor-pointer transition"
              >
                Usuń odbicie
              </button>
            </div>
        </div>

          



        </div></div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-black">
            <h2 className="text-lg font-bold mb-4">Edytuj odbicie</h2>

            <label className="block mb-2">
              Godzina rozpoczęcia:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mt-1"
              />
            </label>

            <label className="block mb-4">
              Godzina zakończenia:
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mt-1"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Anuluj
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
