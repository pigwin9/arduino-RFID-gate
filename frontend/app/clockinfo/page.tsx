"use client";

import { useRouter } from "next/navigation";

export default function ClockInfoPage() {
  const router = useRouter();

  const handleReturn = () => {
    router.push("/");
  };

  return (
    <div className="h-screen w-screen bg-[#111827] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Clock Information</h1>
      <p className="text-lg text-center max-w-xl text-gray-300 mb-6">
        Your clock-in has been registered successfully. Please proceed to your station
        or return to the main screen.
      </p>
      <button
        onClick={handleReturn}
        className="bg-[#F9FAFB] cursor-pointer text-[#252c3b] px-5 py-2 rounded font-semibold tracking-wide transition duration-200 hover:bg-[#e5e7eb]"
      >
        Return to Home
      </button>
    </div>
  );
}
