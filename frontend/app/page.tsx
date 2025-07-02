"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [currentPage, setCurrentPage] = useState(1);
  
  const workersPerPage = 17;
  const router = useRouter();
  const totalPages = Math.ceil(workers.length / workersPerPage);
  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = workers.slice(indexOfFirstWorker, indexOfLastWorker);

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

    const autoSlide = setInterval(() => {
      setCurrentPage((prev) => (prev >= totalPages ? 1 : prev + 1));
    }, 10000);

    const eventSource = new EventSource("http://localhost:8080/statusTick");
    eventSource.onmessage = () => fetchData();
    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      setError("Połączenie z serwerem zostało przerwane.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
      clearInterval(autoSlide);
    };
  }, [totalPages]);

  const totalPresent = workers.filter((w) => w.status === 1).length;

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <main className="min-h-screen p-4 bg-[#f7f9fc]">
      {/* Statystyki */}
      <div className="flex gap-4 mb-4">
        <div className="bg-white rounded-xl px-6 py-4 shadow flex items-center gap-2">
          <span className="text-xl">👥</span>
          <div>
            <div className="text-xs text-gray-500">Łącznie</div>
            <div className="text-lg font-bold">{workers.length}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl px-6 py-4 shadow flex items-center gap-2">
          <span className="text-xl text-green-600">🟢</span>
          <div>
            <div className="text-xs text-gray-500">Obecni</div>
            <div className="text-lg font-bold">{totalPresent}</div>
          </div>
        </div>
      </div>

      {/* Siatka kafelków */}
      <div className="grid grid-cols-9 grid-rows-2 gap-4">
        {currentWorkers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white text-black rounded-2xl shadow-md w-40 h-72 p-4 flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-xs text-gray-500 mb-2">
                Brak <br /> zdjęcia
              </div>
              <div className="text-center font-semibold text-sm">
                {worker.name} <br /> {worker.surname}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {worker.status === 1 ? "Obecny" : "Nieobecny"}
              </div>
            </div>
            <div className="text-2xl">
              {worker.status === 1 ? "🟢" : "🔴"}
            </div>
          </div>
        ))}
      </div>

      {/* Paginacja */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded shadow text-sm font-medium ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Przycisk logowania */}
      <div className="fixed bottom-4 right-4  z-50">
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 bg-violet-800 px-4 py-2 rounded shadow hover:bg-violet-950 duration-100"
        >
          <span className="text-lg ">🔐</span> Zaloguj
        </button>
      </div>

      {/* Okno logowania */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4 text-center">Logowanie</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push("/panel");

              }}
            >
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
