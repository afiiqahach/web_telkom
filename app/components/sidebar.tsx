import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-red-600 text-white w-60 h-screen flex flex-col gap-2 py-5 px-5">
      {/* <div className="p-5 text-xl font-bold">Assets & Area</div> */}
      <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Assets & Area</Link></div>
      <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Person Service</Link></div>
      <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Scheduling</Link></div>
      <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Incident Ticket</Link></div>
      <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">Work Order</Link></div>
      <div className="p-2 hover:bg-red-300 rounded-md"><Link href="#">SQM</Link></div>
    </div>
  );
};

export default Sidebar;
