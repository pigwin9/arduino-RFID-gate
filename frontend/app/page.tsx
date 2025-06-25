"use client";

import React, { useEffect, useState } from "react";

interface Worker {
  id: number;
  name: string;
  surname: string;
  status: number;
  photo?: string;
}

export default function Home() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/getWorkersStatus");
      if (!response.ok) throw new Error("Network response was not ok");
      const data: Worker[] = await response.json();
      setWorkers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const eventSource = new EventSource("http://localhost:8080/statusTick");
    eventSource.onmessage = () => fetchData();
    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      setError("Połączenie z serwerem zostało przerwane.");
      eventSource.close();
    };
    return () => eventSource.close();
  }, []);

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
      {/* przycisk logowania */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowLogin(true)}
          className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 transition"
        >
          Zaloguj
        </button>
      </div>

      {/* siatka kafelków */}
      <div className="grid grid-cols-10 gap-3">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className={`${
              worker.status === 1
                ? "bg-green-500 text-white"
                : "bg-white text-black"
            } border rounded-xl shadow-lg w-36 h-60 flex flex-col items-center justify-between p-3`}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
              {worker.photo ? (
                <img
                  src={worker.photo}
                  alt={`${worker.name} ${worker.surname}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-[10px] text-center text-gray-800 px-1">
                  Proszę zgłosić się<br />do Lidera
                </div>
              )}
            </div>

            <div className="text-[13px] text-center font-semibold leading-tight">
              {worker.name} <br />
              {worker.surname}
            </div>

            <div className="text-xs font-medium mt-1 flex items-center gap-1">
              {worker.status === 1 ? (
                <>
                  <span className="text-lg">🟢</span> Obecny
                </>
              ) : (
                <>
                  <span className="text-lg">🔴</span> Nieobecny
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* okno logowania */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4 text-center">Logowanie</h2>
            <form>
              <input
                type="text"
                placeholder="Login"
                className="w-full p-2 mb-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Hasło"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowLogin(false)}
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Zaloguj się
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

