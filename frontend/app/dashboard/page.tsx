"use client";

export default function DashboardPage() {
  return (
    <div className="h-screen w-screen bg-[#F9FAFB] text-[#252c3b] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-center max-w-xl">
        Welcome to the dashboard! Here you can manage employee data, track attendance,
        and view reports.
      </p>
    </div>
  );
}
