"use client";

import { useRouter } from "next/navigation";

const Sidebar = () => {

  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/admin");
  };

  const navigateToTicket = () => {
    router.push("/admin/ticketAdmin");
  };

  const navigateToSettings = () => {
    router.push("/admin/settings");
  };

  return (
    <div className="fixed left-0 w-64 h-full bg-[#104C98] text-white shadow-lg">
      <div className="p-4">
        {/* Sidebar items */}
        <div
          className="mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
          onClick={navigateToDashboard}
        >
          Dashboard
        </div>
        <div
          className="mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
          onClick={navigateToTicket}
        >
          Ticket
        </div>
        <div
          className="mb-4 p-2 hover:bg-[#083d6b] rounded-md cursor-pointer"
          onClick={navigateToSettings}
        >
          Setting
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
