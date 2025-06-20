"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const handleManageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleClockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/clockinfo");
  };

  interface Worker {
    id: number;
    name: string;
    surname: string;
    status: number;
  }

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/getWorkersStatus");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Worker[] = await response.json();
        setWorkers(data);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-screen h-screen flex">
      {/* left side */}
      <div className="w-1/2 h-full bg-[#111827] font-bold flex items-center justify-center text-[#252c3b]">
        <div>
          <h1>Users</h1>
          <ul>
            {workers.map((worker) => (
              <li key={worker.id}>
                {worker.name}, {worker.surname}, {worker.status}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* right side */}
      <div className="w-1/2 h-full bg-[#F9FAFB] flex font-bold items-center justify-center text-white">
        <form
          onSubmit={handleManageSubmit}
          className="flex flex-col bg-[#252c3b] w-2/5 p-6 rounded items-center justify-center"
        >
          <div className="text-2xl mb-4">MANAGE</div>
          <label className="mb-2">Enter your credentials</label>
          <input
            type="text"
            maxLength={4}
            inputMode="numeric"
            pattern="\d*"
            placeholder="Employee ID"
            className="p-2 rounded text-[#c0c0c0] tracking-wider 
            bg-[#aaaaaa41] mb-2 placeholder-[#aaaaaa] 
            outline-none focus:outline-none focus:ring-0"
          />
          <input
            type="password"
            maxLength={6}
            inputMode="numeric"
            pattern="\d*"
            placeholder="Passcode"
            className="p-2 rounded text-[#c0c0c0] tracking-wider 
            bg-[#aaaaaa41] placeholder-[#aaaaaa] 
            outline-none focus:outline-none focus:ring-0 mb-4"
          />
          <button
            type="submit"
            className="bg-[#F9FAFB] cursor-pointer text-[#252c3b] px-4 py-2 rounded font-semibold tracking-wide transition duration-200 hover:bg-[#e5e7eb]"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
