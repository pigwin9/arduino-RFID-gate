"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Panel() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showDate, setDate] = useState(true);
  const [showDate2, setDate2] = useState(false);
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }
    try {
      await axios.get("http://127.0.0.1:8080/adminProtected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("admin");
      localStorage.removeItem("id");
      router.push("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    localStorage.removeItem("id");
    router.push("/");
  };

  checkAuth();

  interface Worker {
    id: number;
    name: string;
    surname: string;
    status: number;
  }

  interface WorkingTime {
    id: number;
    worker: number;
    time_in: string;
    time_out: string;
    workingTime: string;
  }
  const [times, setTimes] = useState<Time[]>([]);
  const getWorkerTimes = async (id) => {
    console.log(id);
    const response = await axios.get(
      "http://127.0.0.1:8080/getWorkerTimes/" + id.toString()
    );
    setTimes(response.data);
    console.log(response.data);
  };

  const [menagedWorker, setMenagedWorker] = useState<Worker | null>(null);
  const manageWorker = async (id, name, surname, status) => {
    setMenagedWorker({ id: id, name: name, surname: surname, status: status });
    setShowLogin(true);
    console.log(id);
    const response = await axios.get(
      "http://127.0.0.1:8080/getWorkerTimes/" + id.toString()
    );
    setTimes(response.data);
    console.log(response.data);
  };

  const [workers, setWorkers] = useState<Worker[]>([]);
  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8080/getWorkersStatus");
    setWorkers(response.data);
    //filter present workerss
  };

  useEffect(() => {
    fetchData();
    const eventSource = new EventSource("http://localhost:8080/statusTick");
    eventSource.onmessage = () => {
      fetchData();
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">
              👋 Witaj w panelu zarządzania
            </h1>
            <p className="text-gray-600">
              Tutaj możesz przeglądać i edytować odbicia pracowników.
            </p>
          </div>
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950 transition cursor-pointer"
            onClick={logout}
          >
            Wyloguj
          </button>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-full h-1 bg-gray-300"></div>
          <p className="text-2xl font-bold w-full">📊Statystyki</p>
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
              <div className="text-lg font-bold">
                {workers.filter((w) => w.status === 1).length}
              </div>
            </div>
          </div>
          <div className="w-full h-1 bg-gray-300"></div>
          <p className="text-2xl font-bold w-full">📋Lista pracowników</p>
          {
            //show current workers
            workers
              .filter((w) => w.status === 1)
              .map((worker) => (
                <div
                  key={worker.id}
                  className="bg-green-400 rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full"
                >
                  <div>
                    <span className="text-xl">👤</span>{" "}
                    {worker.name + " " + worker.surname}
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        manageWorker(
                          worker.id,
                          worker.name,
                          worker.surname,
                          worker.status
                        )
                      }
                      className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 mr-1 cursor-pointer transition"
                    >
                      Zarządzaj
                    </button>
                  </div>
                </div>
              ))
          }
          {
            //show workers
            workers
              .filter((w) => w.status === 0)
              .map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full"
                >
                  <div>
                    <span className="text-xl">👤</span>{" "}
                    {worker.name + " " + worker.surname}
                  </div>
                  <div>
                    <button className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 mr-1 cursor-pointer transition">
                      Zarządzaj
                    </button>
                  </div>
                </div>
              ))
          }
          <div className="w-full h-1 bg-gray-300"></div>
        </div>
      </div>
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4 text-center">
              {menagedWorker.name + " " + menagedWorker.surname}
            </h2>
            <form>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowLogin(false)}
                >
                  Anuluj
                </button>
                <button
                  onClick={() => getWorkerTimes(menagedWorker.id)}
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Zaloguj się
                </button>
              </div>
            </form>
            <div className="flex-grow overflow-y-auto p-4 max-h-[75vh]">
              {/* Tutaj umieszczasz swoją listę */}
              {times.map((time) => (
                <form
                  key={time.id}
                  className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full list-item"
                >
                  <div className="text-lg font-bold">
                    {time.inTime + " - " + time.outTime}
                  </div>
                  <div className="text-lg font-bold">⌛ {time.workingTime}</div>
                </form>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
