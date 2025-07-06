"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Panelpracownik() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    localStorage.removeItem("id");
    router.push("/");
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }
    try {
      await axios.get("http://127.0.0.1:8080/protected", {
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

  checkAuth();

  interface Time {
    id: number;
    inTime: string;
    outTime: string;
    date: string;
    workingTime: string;
  }

  const [times, setTimes] = useState<Time[]>([]);
  const fetchData = async (id) => {
    const response = await axios.get(
      "http://127.0.0.1:8080/getWorkerTimes/" + id.toString()
    );
    setTimes(response.data);
  };
  useEffect(() => {
    fetchData(localStorage.id);
  }, []);
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
            onClick={logout}
          >
            Wyloguj
          </button>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-full h-1 bg-gray-300"></div>

          <p className="text-2xl font-bold w-full">🗓 Historia odbić</p>
          {times.map((time) => (
            <div
              key={time.id}
              className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full"
            >
              <div className="text-lg font-bold">📆 {time.date}</div>
              <div className="text-lg font-bold">
                {time.inTime + " - " + time.outTime}
              </div>
              <div className="text-lg font-bold">⌛ {time.workingTime}</div>
            </div>
          ))}

          <div className="w-full h-1 bg-gray-300"></div>
        </div>
      </div>
    </main>
  );
  [];
}
