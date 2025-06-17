"use client";

import { useRouter } from "next/navigation";

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

  return (
    <div className="w-screen h-screen flex">
      {/* LEWA STRONA */}
      <div className="w-1/2 h-full bg-[#111827] font-bold flex items-center justify-center text-[#252c3b]">
        <form
          onSubmit={handleClockSubmit}
          className="flex flex-col bg-[#aaaaaa] w-2/5 p-6 rounded items-center justify-center"
        >
          <div className="text-2xl mb-4">CLOCK IN / CLOCK OUT</div>
          <label className="mb-2">Enter your Employee ID</label>
          <input
            type="text"
            maxLength={4}
            inputMode="numeric"
            pattern="\d*"
            placeholder="eID"
            className="p-2 rounded text-black tracking-wider bg-[#252c3b38] 
            outline-none focus:outline-none focus:ring-0 mb-4"
          />
          <button
            type="submit"
            className="bg-[#252c3b] cursor-pointer text-[#F9FAFB] px-4 py-2 rounded font-semibold tracking-wide transition duration-200 hover:bg-[#1a1f2e]"
          >
            Proceed
          </button>
        </form>
      </div>

      {/* PRAWA STRONA */}
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
