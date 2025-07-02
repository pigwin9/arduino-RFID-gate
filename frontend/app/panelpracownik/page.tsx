"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Panelpracownik() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">👋 Witaj w swoim panelu</h1>
            <p className="text-gray-600">
              Tutaj możesz przeglądać historię swoich odbić.
            </p>
          </div>
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950 transition cursor-pointer"
            onClick={() => router.push("/")}
          >
            Wyloguj
          </button>
        </div>

        <div className="flex gap-4 flex-wrap">
          
          <div className="w-full h-1 bg-gray-300"></div>

         <p className="text-2xl font-bold w-full">🗓 Historia odbić</p>

          <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div className="text-xs text-gray-500">2 dni temu</div>
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛4h 36min</div>
          </div>
           <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div className="text-xs text-gray-500">2 dni temu</div>
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛4h 36min</div>
          </div>

 <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div className="text-xs text-gray-500">2 dni temu</div>
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛4h 36min</div>
          </div>

 <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div className="text-xs text-gray-500">2 dni temu</div>
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛4h 36min</div>
          </div>

 <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div className="text-xs text-gray-500">2 dni temu</div>
            <div className="text-lg font-bold">📆 01.07.2025</div>
            <div className="text-lg font-bold">⌛4h 36min</div>
          </div>




          <div className="w-full h-1 bg-gray-300"></div>
        </div>
      </div>
    </main>
  );
}
