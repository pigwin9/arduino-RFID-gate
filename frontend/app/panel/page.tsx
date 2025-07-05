"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Panel() {
  const router = useRouter();

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
      router.push("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    router.push("/");
  };

  useEffect(() => {
    checkAuth();
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
              <div className="text-lg font-bold">100</div>
            </div>
          </div>

          <div className="bg-white rounded-xl px-6 py-4 shadow flex items-center gap-2">
            <span className="text-xl text-green-600">🟢</span>
            <div>
              <div className="text-xs text-gray-500">Obecni</div>
              <div className="text-lg font-bold">80</div>
            </div>
          </div>

          <div className="bg-white rounded-xl px-6 py-4 shadow flex items-center gap-2">
            <span className="text-xl text-red-600">🔴</span>
            <div>
              <div className="text-xs text-gray-500">Nieobecni</div>
              <div className="text-lg font-bold">20</div>
            </div>
          </div>

          <div className="w-full h-1 bg-gray-300"></div>

          <p className="text-2xl font-bold w-full">📋Lista pracowników</p>
          <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div>
              <span className="text-xl">👤</span> Kacper Tąpolski
            </div>
            <div>
              <button
                onClick={() => router.push("/panel/odbicia")}
                className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 mr-1 cursor-pointer transition"
              >
                Zarządzaj odbiciami
              </button>
              <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 cursor-pointer transition">
                Usuń pracownika
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div>
              <span className="text-xl">👤</span> Jakub Sinkiewicz
            </div>
            <div>
              <button
                onClick={() => router.push("/panel/odbicia")}
                className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 mr-1 cursor-pointer transition"
              >
                Zarządzaj odbiciami
              </button>
              <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 cursor-pointer transition">
                Usuń pracownika
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl px-6 py-4 shadow flex justify-between items-center gap-2 w-full">
            <div>
              <span className="text-xl">👤</span> Maciej Sobiś
            </div>
            <div>
             <button
                onClick={() => router.push("/panel/odbicia")}
                className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 mr-1 cursor-pointer transition"
              >
                Zarządzaj odbiciami
              </button>
              <button className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 cursor-pointer transition">
                Usuń pracownika
              </button>
            </div>
          </div>

          <div className="w-full h-1 bg-gray-300"></div>
        </div>
      </div>
    </main>
  );
}
