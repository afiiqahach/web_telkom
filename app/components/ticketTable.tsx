// const TicketTable = () => {
// return (
// <div className="bg-white p-6 shadow-lg rounded-lg mt-5">
//     <table className="min-w-full table-auto">
//         <thead>
//             <tr className="bg-gray-100">
//                 <th className="p-4 text-left">Name</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Rate</th>
//                 <th className="p-4 text-left">Balance</th>
//                 <th className="p-4 text-left">Deposit</th>
//             </tr>
//         </thead>
//         <tbody>
//             {TicketTable.map((ticket) => (
//                 <tr key={ticket.id} className="border-b">
//                     <td className="p-4">{ticket.name}</td>
//                     <td className="p-4">
//                         <span className={`px-2 py-1 rounded-full text-sm ${ticket.status === "Paid" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
//                             {ticket.status}
//                         </span>
//                     </td>
//                     <td className="p-4">${ticket.rate.toFixed(2)}</td>
//                     <td className={`p-4 ${ticket.balance < 0? "text-red-500" : ""}`}>${ticket.balance.toFixed(2)}</td>
//                     <td className="p-4">${ticket.deposit.toFixed(2)}</td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
// </div>
// );
// };

// export default TicketTable;




// Jika menggunakan TypeScript, kita bisa mendefinisikan tipe Ticket
interface Ticket {
  id: number;
  name: string;
  status: string;
  rate: number;
  balance: number;
  deposit: number;
}

// Data ticket (ini bisa berasal dari API atau state)
const tickets: Ticket[] = [
  { id: 1, name: "Ann Culhane", status: "Open", rate: 70.00, balance: -270.00, deposit: 500.00 },
  { id: 2, name: "Ahmad Rosser", status: "Paid", rate: 70.00, balance: 270.00, deposit: 500.00 },
  { id: 3, name: "Zain Calzoni", status: "Open", rate: 70.00, balance: -20.00, deposit: 500.00 },
  { id: 4, name: "Leo Stanton", status: "Inactive", rate: 70.00, balance: 600.00, deposit: 500.00 },
  { id: 5, name: "Kaiya Vetrovs", status: "Open", rate: 70.00, balance: -350.00, deposit: 500.00 },
  // Tambahkan data lainnya sesuai kebutuhan
];

const TicketTable: React.FC = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-5">
      <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 border rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
              </svg>
            </button>
            <input
              type="text"
              className="p-2 border rounded-lg"
              placeholder="Search..."
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">+ Add customer</button>
        </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="p-4 text-left">INCIDENT</th>
            <th className="p-4 text-left">TTR CUSTOMER</th>
            <th className="p-4 text-left">SUMMARY</th>
            <th className="p-4 text-left">REPORTED DATE</th>
            <th className="p-4 text-left">OWNER GROUP</th>
            <th className="p-4 text-left">OWNER</th>
            <th className="p-4 text-left">CUSTOMER SEGMENT</th>
            <th className="p-4 text-left">SERVICE TYPE</th>
            <th className="p-4 text-left">WITEL</th>
            <th className="p-4 text-left">WORKZONE</th>
            <th className="p-4 text-left">STATUS</th>
            <th className="p-4 text-left">STATUS DATE</th>
            <th className="p-4 text-left">TICKET ID GAMAS</th>
            <th className="p-4 text-left">REPORTED BY</th>
            <th className="p-4 text-left">CONTACT PHONE</th>
            <th className="p-4 text-left">CONTACT NAME</th>
            <th className="p-4 text-left">CONTACT EMAIL</th>
            <th className="p-4 text-left">BOOKING DATE</th>
            <th className="p-4 text-left">DESCRIPTION ASSIGMENT</th>
            <th className="p-4 text-left">REPORTED PRIORITY</th>
            <th className="p-4 text-left">SOURCE TICKET</th>
            <th className="p-4 text-left">SUBSIDIARY</th>
            <th className="p-4 text-left">EXTERNAL TICKET ID</th>
            <th className="p-4 text-left">CHANNEL</th>
            <th className="p-4 text-left">CUSTOMER TYPE</th>
            <th className="p-4 text-left">CLOSED BY</th>
            <th className="p-4 text-left">CLOSED / REOPEN by</th>
            <th className="p-4 text-left">CUSTOMER ID</th>
            <th className="p-4 text-left">CUSTOMER NAME</th>
            <th className="p-4 text-left">SERVICE ID</th>
            <th className="p-4 text-left">SERVICE NO</th>
            <th className="p-4 text-left">SLG</th>
            <th className="p-4 text-left">TECHNOLOGY</th>
            <th className="p-4 text-left">LAPUL</th>
            <th className="p-4 text-left">GAUL</th>
            <th className="p-4 text-left">ONU RX</th>
            <th className="p-4 text-left">PENDING REASON</th>
            <th className="p-4 text-left">DATEMODIFIED</th>
            <th className="p-4 text-left">INCIDENT DOMAIN</th>
            <th className="p-4 text-left">REGION</th>
            <th className="p-4 text-left">SYMPTOM</th>
            <th className="p-4 text-left">HIERARCHY PATH</th>
            <th className="p-4 text-left">SOLUTION</th>
            <th className="p-4 text-left">DESCRIPTION ACTUAL SOLUTION</th>
            <th className="p-4 text-left">KODE PRODUK</th>
            <th className="p-4 text-left">PERANGKAT</th>
            <th className="p-4 text-left">TECHNICIAN</th>
            <th className="p-4 text-left">DEVICE NAME</th>
            <th className="p-4 text-left">WORKLOG SUMMARY</th>
            <th className="p-4 text-left">CLASSIFICATION FLAG</th>
            <th className="p-4 text-left">REALM</th>
            <th className="p-4 text-left">RELATED TO GAMAS</th>
            <th className="p-4 text-left">TSC RESULT</th>
            <th className="p-4 text-left">SCC RESULT</th>
            <th className="p-4 text-left">TTR AGENT</th>
            <th className="p-4 text-left">TTR MITRA</th>
            <th className="p-4 text-left">TTR NASIONAL</th>
            <th className="p-4 text-left">TTR PENDING</th>
            <th className="p-4 text-left">TTR REGION</th>
            <th className="p-4 text-left">TTR WITEL</th>
            <th className="p-4 text-left">TTR END TO END</th>
            <th className="p-4 text-left">NOTE</th>
            <th className="p-4 text-left">GUARANTE STATUS</th>
            <th className="p-4 text-left">RESOLVE DATE</th>
            <th className="p-4 text-left">SN ONT</th>
            <th className="p-4 text-left">TIPE ONT</th>
            <th className="p-4 text-left">MANUFACTURE ONT</th>
            <th className="p-4 text-left">IMPACTED SITE</th>
            <th className="p-4 text-left">CAUSE</th>
            <th className="p-4 text-left">RESOLUTION</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-b">
              <td className="p-4">{ticket.name}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    ticket.status === "Paid"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="p-4">${ticket.rate.toFixed(2)}</td>
              <td className={`p-4 ${ticket.balance < 0 ? "text-red-500" : ""}`}>
                ${ticket.balance.toFixed(2)}
              </td>
              <td className="p-4">${ticket.deposit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
