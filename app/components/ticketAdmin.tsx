// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ref, onValue, remove } from 'firebase/database'; // Import from firebase/database
// import { database } from '../../lib/firebaseConfig'; // Importing the initialized Firebase Realtime Database

// type Ticket = {
//   id: string;
//   INCIDENT: string;
//   TTR: string;
//   CUSTOMER: string;
//   SUMMARY: string;
//   REPORTED_DATE: string;
//   OWNER_GROUP: string;
//   OWNER: string;
//   CUSTOMER_SEGMENT: string;
//   SERVICE_TYPE: string;
//   WITEL: string;
//   WORKZONE: string;
//   STATUS: string;
//   STATUS_DATE: string;
//   TICKET_ID_GAMAS: string;
//   REPORTED_BY: string;
//   CONTACT_PHONE: string;
//   CONTACT_NAME: string;
//   CONTACT_EMAIL: string;
//   BOOKING_DATE: string;
//   DESCRIPTION_ASSIGNMENT: string;
//   REPORTED_PRIORITY: string;
//   SOURCE_TICKET: string;
//   SUBSIDIARY: string;
//   EXTERNAL_TICKET_ID: string;
//   CHANNEL: string;
//   CUSTOMER_TYPE: string;
//   CLOSED_BY: string;
//   CLOSED_REOPEN_BY: string;
//   CUSTOMER_ID: string;
//   CUSTOMER_NAME: string;
//   SERVICE_ID: string;
//   SERVICE_NO: string;
//   SLG: string;
//   TECHNOLOGY: string;
//   LAPUL: string;
//   GAUL: string;
//   ONU_RX: string;
//   PENDING_REASON: string;
//   DATEMODIFIED: string;
//   INCIDENT_DOMAIN: string;
//   REGION: string;
//   SYMPTOM: string;
//   HIERARCHY_PATH: string;
//   SOLUTION: string;
//   DESCRIPTION_ACTUAL_SOLUTION: string;
//   KODE_PRODUK: string;
//   PERANGKAT: string;
//   TECHNICIAN: string;
//   DEVICE_NAME: string;
//   WORKLOG_SUMMARY: string;
//   CLASSIFICATION_FLAG: string;
//   REALM: string;
//   RELATED_TO_GAMAS: string;
//   TSC_RESULT: string;
//   SCC_RESULT: string;
//   TTR_AGENT: string;
//   TTR_MITRA: string;
//   TTR_NASIONAL: string;
//   TTR_PENDING: string;
//   TTR_REGION: string;
//   TTR_WITEL: string;
//   TTR_END_TO_END: string;
//   NOTE: string;
//   GUARANTE_STATUS: string;
//   RESOLVE_DATE: string;
//   SN_ONT: string;
//   TIPE_ONT: string;
//   MANUFACTURE_ONT: string;
//   IMPACTED_SITE: string;
//   CAUSE: string;
//   RESOLUTION: string;
//   NOTES_ESKALASI: string;
//   RK_INFORMATION: string;
// };

// const TicketEditPage: React.FC = () => {
//   const [tickets, setTickets] = useState<Ticket[]>([]);

//   useEffect(() => {
//     const ticketsRef = ref(database, 'tickets'); // Using the correct reference for Realtime Database

//     onValue(ticketsRef, (snapshot) => {
//       const data = snapshot.val();
//       const ticketsArray: Ticket[] = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
//       setTickets(ticketsArray);
//     });
//   }, []);

//   const handleEdit = (id: string) => {
//     // Placeholder for edit functionality
//     console.log(`Editing ticket with ID: ${id}`);
//   };

//   const handleDelete = (id: string) => {
//     const ticketRef = ref(database, `tickets/${id}`);

//     // Remove ticket from Firebase Realtime Database
//     remove(ticketRef)
//       .then(() => {
//         console.log(`Ticket with ID: ${id} deleted successfully.`);
//       })
//       .catch((error) => {
//         console.error(`Error deleting ticket with ID: ${id}`, error);
//       });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Tickets</h1>
//       <div className="overflow-x-auto bg-white p-4 rounded shadow">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 px-4 py-2">No</th>
//               <th className="border border-gray-300 px-4 py-2">Incident</th>
//               <th className="border border-gray-300 px-4 py-2">TTR</th>
//               <th className="border border-gray-300 px-4 py-2">Customer</th>
//               <th className="border border-gray-300 px-4 py-2">Summary</th>
//               <th className="border border-gray-300 px-4 py-2">Reported Date</th>
//               <th className="border border-gray-300 px-4 py-2">Owner Group</th>
//               <th className="border border-gray-300 px-4 py-2">Owner</th>
//               <th className="border border-gray-300 px-4 py-2">Customer Segment</th>
//               <th className="border border-gray-300 px-4 py-2">Service Type</th>
//               <th className="border border-gray-300 px-4 py-2">Witel</th>
//               <th className="border border-gray-300 px-4 py-2">Workzone</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//               <th className="border border-gray-300 px-4 py-2">Status Date</th>
//               <th className="border border-gray-300 px-4 py-2">Ticket ID GAMAS</th>
//               <th className="border border-gray-300 px-4 py-2">Reported By</th>
//               <th className="border border-gray-300 px-4 py-2">Contact Phone</th>
//               <th className="border border-gray-300 px-4 py-2">Contact Name</th>
//               <th className="border border-gray-300 px-4 py-2">Contact Email</th>
//               <th className="border border-gray-300 px-4 py-2">Booking Date</th>
//               <th className="border border-gray-300 px-4 py-2">Description Assignment</th>
//               <th className="border border-gray-300 px-4 py-2">Reported Priority</th>
//               <th className="border border-gray-300 px-4 py-2">Source Ticket</th>
//               <th className="border border-gray-300 px-4 py-2">Subsidiary</th>
//               <th className="border border-gray-300 px-4 py-2">External Ticket ID</th>
//               <th className="border border-gray-300 px-4 py-2">Channel</th>
//               <th className="border border-gray-300 px-4 py-2">Customer Type</th>
//               <th className="border border-gray-300 px-4 py-2">Closed By</th>
//               <th className="border border-gray-300 px-4 py-2">Closed/Reopen By</th>
//               <th className="border border-gray-300 px-4 py-2">Customer ID</th>
//               <th className="border border-gray-300 px-4 py-2">Customer Name</th>
//               <th className="border border-gray-300 px-4 py-2">Service ID</th>
//               <th className="border border-gray-300 px-4 py-2">Service No</th>
//               <th className="border border-gray-300 px-4 py-2">SLG</th>
//               <th className="border border-gray-300 px-4 py-2">Technology</th>
//               <th className="border border-gray-300 px-4 py-2">Lapul</th>
//               <th className="border border-gray-300 px-4 py-2">Gaul</th>
//               <th className="border border-gray-300 px-4 py-2">ONU RX</th>
//               <th className="border border-gray-300 px-4 py-2">Pending Reason</th>
//               <th className="border border-gray-300 px-4 py-2">Date Modified</th>
//               <th className="border border-gray-300 px-4 py-2">Incident Domain</th>
//               <th className="border border-gray-300 px-4 py-2">Region</th>
//               <th className="border border-gray-300 px-4 py-2">Symptom</th>
//               <th className="border border-gray-300 px-4 py-2">Hierarchy Path</th>
//               <th className="border border-gray-300 px-4 py-2">Solution</th>
//               <th className="border border-gray-300 px-4 py-2">Description Actual Solution</th>
//               <th className="border border-gray-300 px-4 py-2">Kode Produk</th>
//               <th className="border border-gray-300 px-4 py-2">Perangkat</th>
//               <th className="border border-gray-300 px-4 py-2">Technician</th>
//               <th className="border border-gray-300 px-4 py-2">Device Name</th>
//               <th className="border border-gray-300 px-4 py-2">Worklog Summary</th>
//               <th className="border border-gray-300 px-4 py-2">Classification Flag</th>
//               <th className="border border-gray-300 px-4 py-2">Realm</th>
//               <th className="border border-gray-300 px-4 py-2">Related to GAMAS</th>
//               <th className="border border-gray-300 px-4 py-2">TSC Result</th>
//               <th className="border border-gray-300 px-4 py-2">SCC Result</th>
//               <th className="border border-gray-300 px-4 py-2">TTR Agent</th>
//               <th className="border border-gray-300 px-4 py-2">TTR Mitra</th>
//               <th className="border border-gray-300 px-4 py-2">TTR Nasional</th>
//               <th className="border border-gray-300 px-4 py-2">TTR Pending</th>
//               <th className="border border-gray-300 px-4 py-2">TTR Region</th>
//               <th className="border border-gray-300 px-4 py-2">TTR Witel</th>
//               <th className="border border-gray-300 px-4 py-2">TTR End to End</th>
//               <th className="border border-gray-300 px-4 py-2">Note</th>
//               <th className="border border-gray-300 px-4 py-2">Guarantee Status</th>
//               <th className="border border-gray-300 px-4 py-2">Resolve Date</th>
//               <th className="border border-gray-300 px-4 py-2">SN ONT</th>
//               <th className="border border-gray-300 px-4 py-2">Tipe ONT</th>
//               <th className="border border-gray-300 px-4 py-2">Manufacture ONT</th>
//               <th className="border border-gray-300 px-4 py-2">Impacted Site</th>
//               <th className="border border-gray-300 px-4 py-2">Cause</th>
//               <th className="border border-gray-300 px-4 py-2">Resolution</th>
//               <th className="border border-gray-300 px-4 py-2">Notes Eskalasi</th>
//               <th className="border border-gray-300 px-4 py-2">RK Information</th>
//               <th className="border border-gray-300 px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.map((ticket, index) => (
//               <tr key={ticket.id} className="text-center">
//                 <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.INCIDENT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CUSTOMER}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SUMMARY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.REPORTED_DATE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.OWNER_GROUP}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.OWNER}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CUSTOMER_SEGMENT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SERVICE_TYPE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.WITEL}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.WORKZONE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.STATUS}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.STATUS_DATE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TICKET_ID_GAMAS}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.REPORTED_BY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CONTACT_PHONE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CONTACT_NAME}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CONTACT_EMAIL}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.BOOKING_DATE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.DESCRIPTION_ASSIGNMENT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.REPORTED_PRIORITY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SOURCE_TICKET}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SUBSIDIARY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.EXTERNAL_TICKET_ID}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CHANNEL}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CUSTOMER_TYPE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CLOSED_BY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CLOSED_REOPEN_BY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CUSTOMER_ID}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CUSTOMER_NAME}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SERVICE_ID}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SERVICE_NO}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SLG}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TECHNOLOGY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.LAPUL}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.GAUL}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.ONU_RX}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.PENDING_REASON}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.DATEMODIFIED}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.INCIDENT_DOMAIN}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.REGION}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SYMPTOM}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.HIERARCHY_PATH}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SOLUTION}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.DESCRIPTION_ACTUAL_SOLUTION}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.KODE_PRODUK}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.PERANGKAT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TECHNICIAN}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.DEVICE_NAME}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.WORKLOG_SUMMARY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CLASSIFICATION_FLAG}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.REALM}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.RELATED_TO_GAMAS}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TSC_RESULT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SCC_RESULT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR_AGENT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR_MITRA}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR_NASIONAL}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR_PENDING}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR_REGION}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR_WITEL}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TTR_END_TO_END}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.NOTE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.GUARANTE_STATUS}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.RESOLVE_DATE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SN_ONT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.TIPE_ONT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.MANUFACTURE_ONT}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.IMPACTED_SITE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.CAUSE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.RESOLUTION}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.NOTES_ESKALASI}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.RK_INFORMATION}</td>

//                 <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
//                   <button
//                     onClick={() => handleEdit(ticket.id)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(ticket.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TicketEditPage;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ref, onValue, query, limitToFirst } from 'firebase/database'; // Import from firebase/database
// // import { ref, onValue, remove, query, limitToFirst } from 'firebase/database'; // Import from firebase/database
// import { database } from '../../lib/firebaseConfig'; // Importing the initialized Firebase Realtime Database

// type Ticket = {
  // id: string;
  // INCIDENT: string;
  // TTR: string;
  // CUSTOMER: string;
  // SUMMARY: string;
  // REPORTED_DATE: string;
  // OWNER_GROUP: string;
  // OWNER: string;
  // CUSTOMER_SEGMENT: string;
  // SERVICE_TYPE: string;
  // WITEL: string;
  // WORKZONE: string;
  // STATUS: string;
  // STATUS_DATE: string;
  // TICKET_ID_GAMAS: string;
  // REPORTED_BY: string;
  // CONTACT_PHONE: string;
  // CONTACT_NAME: string;
  // CONTACT_EMAIL: string;
  // BOOKING_DATE: string;
  // DESCRIPTION_ASSIGNMENT: string;
  // REPORTED_PRIORITY: string;
  // SOURCE_TICKET: string;
  // SUBSIDIARY: string;
  // EXTERNAL_TICKET_ID: string;
  // CHANNEL: string;
  // CUSTOMER_TYPE: string;
  // CLOSED_BY: string;
  // CLOSED_REOPEN_BY: string;
  // CUSTOMER_ID: string;
  // CUSTOMER_NAME: string;
  // SERVICE_ID: string;
  // SERVICE_NO: string;
  // SLG: string;
  // TECHNOLOGY: string;
  // LAPUL: string;
  // GAUL: string;
  // ONU_RX: string;
  // PENDING_REASON: string;
  // DATEMODIFIED: string;
  // INCIDENT_DOMAIN: string;
  // REGION: string;
  // SYMPTOM: string;
  // HIERARCHY_PATH: string;
  // SOLUTION: string;
  // DESCRIPTION_ACTUAL_SOLUTION: string;
  // KODE_PRODUK: string;
  // PERANGKAT: string;
  // TECHNICIAN: string;
  // DEVICE_NAME: string;
  // WORKLOG_SUMMARY: string;
  // CLASSIFICATION_FLAG: string;
  // REALM: string;
  // RELATED_TO_GAMAS: string;
  // TSC_RESULT: string;
  // SCC_RESULT: string;
  // TTR_AGENT: string;
  // TTR_MITRA: string;
  // TTR_NASIONAL: string;
  // TTR_PENDING: string;
  // TTR_REGION: string;
  // TTR_WITEL: string;
  // TTR_END_TO_END: string;
  // NOTE: string;
  // GUARANTE_STATUS: string;
  // RESOLVE_DATE: string;
  // SN_ONT: string;
  // TIPE_ONT: string;
  // MANUFACTURE_ONT: string;
  // IMPACTED_SITE: string;
  // CAUSE: string;
  // RESOLUTION: string;
  // NOTES_ESKALASI: string;
  // RK_INFORMATION: string;
// };

// const TicketEditPage: React.FC = () => {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [pageSize, setPageSize] = useState<number>(50); // Default page size
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   useEffect(() => {
//     // Fetch tickets based on pageSize and pageNumber
//     const ticketsRef = ref(database, 'tickets');
//     const ticketsQuery = query(ticketsRef, limitToFirst(pageSize * pageNumber)); // Adjust the limit based on pageSize and pageNumber

//     onValue(ticketsQuery, (snapshot) => {
//       const data = snapshot.val();
//       const ticketsArray: Ticket[] = data
//         ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
//         : [];
//       setTickets(ticketsArray);
//       setFilteredTickets(ticketsArray);
//     });
//   }, [pageSize, pageNumber]);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);
  
//     if (query.trim() === "") {
//       // Jika kotak pencarian kosong, tampilkan semua tiket
//       setFilteredTickets(tickets);
//       return;
//     }
  
//     // Filter tiket berdasarkan kolom INCIDENT
//     const filtered = tickets.filter((ticket) =>
//       ticket.INCIDENT.toLowerCase().includes(query)
//     );
//     setFilteredTickets(filtered);
//   };

//   // const handleEdit = (id: string) => {
//   //   alert(`Edit functionality for Ticket ID: ${id} is under development.`);
//   // };

//   // const handleDelete = (id: string) => {
//   //   if (window.confirm(`Are you sure you want to delete Ticket ID: ${id}?`)) {
//   //     const ticketRef = ref(database, `tickets/${id}`);
//   //     remove(ticketRef)
//   //       .then(() => {
//   //         console.log(`Ticket with ID: ${id} deleted successfully.`);
//   //         setTickets((prevTickets) =>
//   //           prevTickets.filter((ticket) => ticket.id !== id)
//   //         );
//   //         setFilteredTickets((prevFilteredTickets) =>
//   //           prevFilteredTickets.filter((ticket) => ticket.id !== id)
//   //         );
//   //       })
//   //       .catch((error) => {
//   //         console.error(`Error deleting ticket with ID: ${id}`, error);
//   //       });
//   //   }
//   // };

//   // Pagination controls
//   const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPageSize(Number(event.target.value));
//     setPageNumber(1); // Reset to the first page when page size changes
//   };

//   const handlePrevPage = () => {
//     if (pageNumber > 1) {
//       setPageNumber(pageNumber - 1);
//     }
//   };

//   const handleNextPage = () => {
//     setPageNumber(pageNumber + 1);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen mt-20">
//       <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      
//       <div className="flex items-center justify-between mb-4">
//       <div>
//           <input
//             type="text"
//             placeholder="Search by incident ..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="border p-2 rounded w-64"
//           />
//         </div>

//       <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//           <label htmlFor="pageSize" className="mr-2">Show</label>
//           <select
//             id="pageSize"
//             value={pageSize}
//             onChange={handlePageSizeChange}
//             className="border p-2 rounded"
//           >
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//             <option value={500}>500</option>
//           </select>
//           <span className="px-5">per page</span>
//         </div>
//       </div>
//       </div>
      

//       <div className="overflow-x-auto bg-white p-4 rounded shadow">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 px-4 py-2">No</th>
//               <th className="border border-gray-300 px-4 py-2">Incident</th>
//               <th className="border border-gray-300 px-4 py-2">Reported Date</th>
//               <th className="border border-gray-300 px-4 py-2">Summary</th>
//               <th className="border border-gray-300 px-4 py-2">Status</th>
//               <th className="border border-gray-300 px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTickets.map((ticket, index) => (
//               <tr key={ticket.id} className="text-center">
//                 <td className="border border-gray-300 px-4 py-2">{(pageNumber - 1) * pageSize + index + 1}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.INCIDENT}</td>
//                 {/* <td className="border border-gray-300 px-4 py-2">{ticket.CUSTOMER}</td> */}
//                 <td className="border border-gray-300 px-4 py-2">{ticket.REPORTED_DATE}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.SUMMARY}</td>
//                 <td className="border border-gray-300 px-4 py-2">{ticket.STATUS}</td>
//                 <td className="border border-gray-300 px-4 py-2">
//                   <div className="flex justify-center gap-2">
//                     <button
//                       onClick={() => (window.location.href = "/admin/edit")}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     {/* <button
//                       onClick={() => handleDelete(ticket.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button> */}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={handlePrevPage}
//           disabled={pageNumber === 1}
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//         >
//           Prev
//         </button>
//         <span>Page {pageNumber}</span>
//         <button
//           onClick={handleNextPage}
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TicketEditPage;


'use client';

import React, { useEffect, useState } from 'react';
import { ref, onValue, query, limitToFirst } from 'firebase/database'; // Import from firebase/database
import { database } from '../../lib/firebaseConfig'; // Importing the initialized Firebase Realtime Database

type Ticket = {
  id: string;
  INCIDENT: string;
  TTR: string;
  CUSTOMER: string;
  SUMMARY: string;
  REPORTED_DATE: string;
  OWNER_GROUP: string;
  OWNER: string;
  CUSTOMER_SEGMENT: string;
  SERVICE_TYPE: string;
  WITEL: string;
  WORKZONE: string;
  STATUS: string | object; // Allow STATUS to be string or object
  STATUS_DATE: string;
  // ... other properties
};

const TicketEditPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(50); // Default page size
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    // Fetch tickets based on pageSize and pageNumber
    const ticketsRef = ref(database, 'tickets');
    const ticketsQuery = query(ticketsRef, limitToFirst(pageSize * pageNumber)); // Adjust the limit based on pageSize and pageNumber

    onValue(ticketsQuery, (snapshot) => {
      const data = snapshot.val();
      const ticketsArray: Ticket[] = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            // Ensure STATUS is always a string for rendering
            STATUS: typeof data[key].STATUS === 'object' ? JSON.stringify(data[key].STATUS) : data[key].STATUS,
          }))
        : [];
      setTickets(ticketsArray);
      setFilteredTickets(ticketsArray);
    });
  }, [pageSize, pageNumber]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      // Show all tickets if search box is empty
      setFilteredTickets(tickets);
      return;
    }

    // Filter tickets based on INCIDENT
    const filtered = tickets.filter((ticket) =>
      ticket.INCIDENT.toLowerCase().includes(query)
    );
    setFilteredTickets(filtered);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPageNumber(1); // Reset to the first page when page size changes
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
  
      <div className="flex items-center justify-between mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by incident ..."
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded w-64"
          />
        </div>
  
        <div className="flex items-center">
          <label htmlFor="pageSize" className="mr-2">Show</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border p-2 rounded"
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
          <span className="px-5">per page</span>
        </div>
      </div>
  
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">No</th>
              <th className="border border-gray-300 px-4 py-2">Incident</th>
              <th className="border border-gray-300 px-10 py-2">Reported Date</th>
              <th className="border border-gray-300 px-4 py-2">Summary</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket, index) => (
              <tr key={ticket.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {(pageNumber - 1) * pageSize + index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ticket.INCIDENT}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ticket.REPORTED_DATE}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {ticket.SUMMARY}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {typeof ticket.STATUS === 'string' ? (
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        ticket.STATUS.toLowerCase() === "backend"
                          ? "bg-blue-100 text-blue-600"
                          : ticket.STATUS.toLowerCase() === "analysis"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {ticket.STATUS.toUpperCase()}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600">
                      Unknown
                    </span>
                  )}
                </td>
                <td className="border border-gray-300 px-10 py-2">
                <button
                  onClick={() => window.location.href = `/admin/ticketDetail?ticketId=${ticket.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                  Detail
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Prev
        </button>
        <span>Page {pageNumber}</span>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
  
};

export default TicketEditPage;
