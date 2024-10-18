'use client'

import { SearchIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

interface Ticket {
  INCIDENT?: string;
  TTR_CUSTOMER?: string;
  SUMMARY?: string;
  REPORTED_DATE?: string;
  OWNER_GROUP?: string;
  OWN_ER?: string;
  CUSTOMER_SEGMENT?: string;
  SERVICE_TYPE?: string;
  WITEL?: string;
  WORKZONE?: string;
  STA_TUS?: string;
  STATUS_DATE?: string;
  TICKET_ID_GAMAS?: string;
  REPORTED_BY?: string;
  CONTACT_PHONE?: string;
  CONTACT_NAME?: string;
  CONTACT_EMAIL?: string;
  BOOKING_DATE?: string;
  DESCRIPTION_ASSIGNMENT?: string;
  REPORTED_PRIORITY?: string;
  SOURCE_TICKET?: string;
  SUBSIDIARY?: string;
  EXTERNAL_TICKET_ID?: string;
  CHANNEL?: string;
  CUSTOMER_TYPE?: string;
  CLOSED_BY?: string;
  CLOSED_REOPEN_BY?: string;
  CUSTOMER_ID?: string;
  CUSTOMER_NAME?: string;
  SERVICE_ID?: string;
  SERVICE_NO?: string;
  SLG?: string;
  TECHNOLOGY?: string;
  LAPUL?: string;
  GAUL?: string;
  ONU_RX?: string;
  PENDING_REASON?: string;
  DATEMODIFIED?: string;
  INCIDENT_DOMAIN?: string;
  REGION?: string;
  SYMPTOM?: string;
  HIERARCHY_PATH?: string;
  SOLUTION?: string;
  DESCRIPTION_ACTUAL_SOLUTION?: string;
  KODE_PRODUK?: string;
  PERANGKAT?: string;
  TECHNICIAN?: string;
  DEVICE_NAME?: string;
  WORKLOG_SUMMARY?: string;
  CLASSIFICATION_FLAG?: string;
  REALM?: string;
  RELATED_TO_GAMAS?: string;
  TSC_RESULT?: string;
  SCC_RESULT?: string;
  TTR_AGENT?: string;
  TTR_MITRA?: string;
  TTR_NASIONAL?: string;
  TTR_PENDING?: string;
  TTR_REGION?: string;
  TTR_WITEL?: string;
  TTR_END_TO_END?: string;
  NOTE?: string;
  GUARANTE_STATUS?: string;
  RESOLVE_DATE?: string;
  SN_ONT?: string;
  TIPE_ONT?: string;
  MANUFACTURE_ONT?: string;
  IMPACTED_SITE?: string;
  CAUSE?: string;
  RESOLUTION?: string;
  NOTES_ESKALASI?: string;
  RK_INFORMATION?: string;
}

const TicketTable: React.FC = () => {
  const [data, setData] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data dari API
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data: Ticket[]) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Filter data berdasarkan tanggal dan query pencarian
  const filteredData = data.filter((ticket) => {
    // Filter berdasarkan tanggal
    let isWithinDateRange = true;
    if (startDate && endDate && ticket.REPORTED_DATE) {
      const ticketDate = new Date(ticket.REPORTED_DATE);
      isWithinDateRange = ticketDate >= new Date(startDate) && ticketDate <= new Date(endDate);
    }

    // Filter berdasarkan pencarian
    const isMatchingSearch = ticket.INCIDENT?.toLowerCase().includes(searchQuery.toLowerCase());

    // Kembalikan data yang sesuai dengan kedua filter
    return isWithinDateRange && isMatchingSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(event.target.value));
  };

  // Fungsi untuk mengganti jumlah item per halaman
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset ke halaman 1 setiap kali jumlah item per halaman berubah
  };

  // Fungsi untuk menangani penekanan tombol Enter
  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setCurrentPage(1); // Reset ke halaman 1 saat melakukan pencarian
    }
  };

  return (
    <div className="bg-white pl-12 shadow-lg rounded-lg">
      <div className="flex justify-between items-center py-4 mt-20">
        <div className="flex items-center">
          <div className="relative w-[300px]">
            <input
              type="text"
              className="border rounded-lg p-2 pl-10 pr-4 text-sm"
              placeholder="Search by ticket number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update query pencarian
              onKeyPress={handleSearchKeyPress} // Tangani penekanan tombol Enter
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="text-sm">
          <label htmlFor="startDate" className="mr-2">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-1 mr-4"
          />

          <label htmlFor="endDate" className="mr-2">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg p-1 text-sm"
          />
        </div>

        <div className="text-sm">
          <label htmlFor="itemsPerPage" className="mr-2 ml-14">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded-lg p-1"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </div>

        <div className="text-sm">
          <label htmlFor="pageSelect" className="mr-2">Page:</label>
          <select
            id="pageSelect"
            value={currentPage}
            onChange={handlePageChange}
            className="border rounded-lg p-1"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm mr-7">+ Add customer</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto min-w-max">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-4 text-left">INCIDENT</th>
              <th className="p-4 text-left">TTR_CUSTOMER</th>
              <th className="p-4 text-left">SUMMARY</th>
              <th className="p-4 text-left">REPORTED_DATE</th>
              <th className="p-4 text-left">OWNER_GROUP</th>
              <th className="p-4 text-left">OWN_ER</th>
              <th className="p-4 text-left">CUSTOMER_SEGMENT</th>
              <th className="p-4 text-left">SERVICE_TYPE</th>
              <th className="p-4 text-left">WITEL</th>
              <th className="p-4 text-left">WORKZONE</th>
              <th className="p-4 text-left">STA_TUS</th>
              <th className="p-4 text-left">STATUS_DATE</th>
              <th className="p-4 text-left">TICKET_ID_GAMAS</th>
              <th className="p-4 text-left">REPORTED_BY</th>
              <th className="p-4 text-left">CONTACT_PHONE</th>
              <th className="p-4 text-left">CONTACT_NAME</th>
              <th className="p-4 text-left">CONTACT_EMAIL</th>
              <th className="p-4 text-left">BOOKING_DATE</th>
              <th className="p-4 text-left">DESCRIPTION_ASSIGNMENT</th>
              <th className="p-4 text-left">REPORTED_PRIORITY</th>
              <th className="p-4 text-left">SOURCE_TICKET</th>
              <th className="p-4 text-left">SUBSIDIARY</th>
              <th className="p-4 text-left">EXTERNAL_TICKET_ID</th>
              <th className="p-4 text-left">CHANNEL</th>
              <th className="p-4 text-left">CUSTOMER_TYPE</th>
              <th className="p-4 text-left">CLOSED_BY</th>
              <th className="p-4 text-left">CLOSED_REOPEN_BY</th>
              <th className="p-4 text-left">CUSTOMER_ID</th>
              <th className="p-4 text-left">CUSTOMER_NAME</th>
              <th className="p-4 text-left">SERVICE_ID</th>
              <th className="p-4 text-left">SERVICE_NO</th>
              <th className="p-4 text-left">SLG</th>
              <th className="p-4 text-left">TECHNOLOGY</th>
              <th className="p-4 text-left">LAPUL</th>
              <th className="p-4 text-left">GAUL</th>
              <th className="p-4 text-left">ONU_RX</th>
              <th className="p-4 text-left">PENDING_REASON</th>
              <th className="p-4 text-left">DATEMODIFIED</th>
              <th className="p-4 text-left">INCIDENT_DOMAIN</th>
              <th className="p-4 text-left">REGION</th>
              <th className="p-4 text-left">SYMPTOM</th>
              <th className="p-4 text-left">HIERARCHY_PATH</th>
              <th className="p-4 text-left">SOLUTION</th>
              <th className="p-4 text-left">DESCRIPTION_ACTUAL_SOLUTION</th>
              <th className="p-4 text-left">KODE_PRODUK</th>
              <th className="p-4 text-left">PERANGKAT</th>
              <th className="p-4 text-left">TECHNICIAN</th>
              <th className="p-4 text-left">DEVICE_NAME</th>
              <th className="p-4 text-left">WORKLOG_SUMMARY</th>
              <th className="p-4 text-left">CLASSIFICATION_FLAG</th>
              <th className="p-4 text-left">REALM</th>
              <th className="p-4 text-left">RELATED_TO_GAMAS</th>
              <th className="p-4 text-left">TSC_RESULT</th>
              <th className="p-4 text-left">SCC_RESULT</th>
              <th className="p-4 text-left">TTR_AGENT</th>
              <th className="p-4 text-left">TTR_MITRA</th>
              <th className="p-4 text-left">TTR_NASIONAL</th>
              <th className="p-4 text-left">TTR_PENDING</th>
              <th className="p-4 text-left">TTR_REGION</th>
              <th className="p-4 text-left">TTR_WITEL</th>
              <th className="p-4 text-left">TTR_END_TO_END</th>
              <th className="p-4 text-left">NOTE</th>
              <th className="p-4 text-left">GUARANTE_STATUS</th>
              <th className="p-4 text-left">RESOLVE_DATE</th>
              <th className="p-4 text-left">SN_ONT</th>
              <th className="p-4 text-left">TIPE_ONT</th>
              <th className="p-4 text-left">MANUFACTURE_ONT</th>
              <th className="p-4 text-left">IMPACTED_SITE</th>
              <th className="p-4 text-left">CAUSE</th>
              <th className="p-4 text-left">RESOLUTION</th>
              <th className="p-4 text-left">NOTES_ESKALASI</th>
              <th className="p-4 text-left">RK_INFORMATION</th>

            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? currentData.map((ticket, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="p-4">{ticket.INCIDENT || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_CUSTOMER || 'No Data'}</td>
                <td className="p-4">{ticket.SUMMARY || 'No Data'}</td>
                <td className="p-4">{ticket.REPORTED_DATE || 'No Data'}</td>
                <td className="p-4">{ticket.OWNER_GROUP || 'No Data'}</td>
                <td className="p-4">{ticket.OWN_ER || 'No Data'}</td>
                <td className="p-4">{ticket.CUSTOMER_SEGMENT || 'No Data'}</td>
                <td className="p-4">{ticket.SERVICE_TYPE || 'No Data'}</td>
                <td className="p-4">{ticket.WITEL || 'No Data'}</td>
                <td className="p-4">{ticket.WORKZONE || 'No Data'}</td>
                <td className="p-4">{ticket.STA_TUS || 'No Data'}</td>
                <td className="p-4">{ticket.STATUS_DATE || 'No Data'}</td>
                <td className="p-4">{ticket.TICKET_ID_GAMAS || 'No Data'}</td>
                <td className="p-4">{ticket.REPORTED_BY || 'No Data'}</td>
                <td className="p-4">{ticket.CONTACT_PHONE || 'No Data'}</td>
                <td className="p-4">{ticket.CONTACT_NAME || 'No Data'}</td>
                <td className="p-4">{ticket.CONTACT_EMAIL || 'No Data'}</td>
                <td className="p-4">{ticket.BOOKING_DATE || 'No Data'}</td>
                <td className="p-4">{ticket.DESCRIPTION_ASSIGNMENT || 'No Data'}</td>
                <td className="p-4">{ticket.REPORTED_PRIORITY || 'No Data'}</td>
                <td className="p-4">{ticket.SOURCE_TICKET || 'No Data'}</td>
                <td className="p-4">{ticket.SUBSIDIARY || 'No Data'}</td>
                <td className="p-4">{ticket.EXTERNAL_TICKET_ID || 'No Data'}</td>
                <td className="p-4">{ticket.CHANNEL || 'No Data'}</td>
                <td className="p-4">{ticket.CUSTOMER_TYPE || 'No Data'}</td>
                <td className="p-4">{ticket.CLOSED_BY || 'No Data'}</td>
                <td className="p-4">{ticket.CLOSED_REOPEN_BY || 'No Data'}</td>
                <td className="p-4">{ticket.CUSTOMER_ID || 'No Data'}</td>
                <td className="p-4">{ticket.CUSTOMER_NAME || 'No Data'}</td>
                <td className="p-4">{ticket.SERVICE_ID || 'No Data'}</td>
                <td className="p-4">{ticket.SERVICE_NO || 'No Data'}</td>
                <td className="p-4">{ticket.SLG || 'No Data'}</td>
                <td className="p-4">{ticket.TECHNOLOGY || 'No Data'}</td>
                <td className="p-4">{ticket.LAPUL || 'No Data'}</td>
                <td className="p-4">{ticket.GAUL || 'No Data'}</td>
                <td className="p-4">{ticket.ONU_RX || 'No Data'}</td>
                <td className="p-4">{ticket.PENDING_REASON || 'No Data'}</td>
                <td className="p-4">{ticket.DATEMODIFIED || 'No Data'}</td>
                <td className="p-4">{ticket.INCIDENT_DOMAIN || 'No Data'}</td>
                <td className="p-4">{ticket.REGION || 'No Data'}</td>
                <td className="p-4">{ticket.SYMPTOM || 'No Data'}</td>
                <td className="p-4">{ticket.HIERARCHY_PATH || 'No Data'}</td>
                <td className="p-4">{ticket.SOLUTION || 'No Data'}</td>
                <td className="p-4">{ticket.DESCRIPTION_ACTUAL_SOLUTION || 'No Data'}</td>
                <td className="p-4">{ticket.KODE_PRODUK || 'No Data'}</td>
                <td className="p-4">{ticket.PERANGKAT || 'No Data'}</td>
                <td className="p-4">{ticket.TECHNICIAN || 'No Data'}</td>
                <td className="p-4">{ticket.DEVICE_NAME || 'No Data'}</td>
                <td className="p-4">{ticket.WORKLOG_SUMMARY || 'No Data'}</td>
                <td className="p-4">{ticket.CLASSIFICATION_FLAG || 'No Data'}</td>
                <td className="p-4">{ticket.REALM || 'No Data'}</td>
                <td className="p-4">{ticket.RELATED_TO_GAMAS || 'No Data'}</td>
                <td className="p-4">{ticket.TSC_RESULT || 'No Data'}</td>
                <td className="p-4">{ticket.SCC_RESULT || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_AGENT || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_MITRA || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_NASIONAL || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_PENDING || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_REGION || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_WITEL || 'No Data'}</td>
                <td className="p-4">{ticket.TTR_END_TO_END || 'No Data'}</td>
                <td className="p-4">{ticket.NOTE || 'No Data'}</td>
                <td className="p-4">{ticket.GUARANTE_STATUS || 'No Data'}</td>
                <td className="p-4">{ticket.RESOLVE_DATE || 'No Data'}</td>
                <td className="p-4">{ticket.SN_ONT || 'No Data'}</td>
                <td className="p-4">{ticket.TIPE_ONT || 'No Data'}</td>
                <td className="p-4">{ticket.MANUFACTURE_ONT || 'No Data'}</td>
                <td className="p-4">{ticket.IMPACTED_SITE || 'No Data'}</td>
                <td className="p-4">{ticket.CAUSE || 'No Data'}</td>
                <td className="p-4">{ticket.RESOLUTION || 'No Data'}</td>
                <td className="p-4">{ticket.NOTES_ESKALASI || 'No Data'}</td>
                <td className="p-4">{ticket.RK_INFORMATION || 'No Data'}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
