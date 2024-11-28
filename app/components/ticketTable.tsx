'use client'

import { SearchIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

interface Ticket {
  INC_KEY?: string;
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
  EXTERNAL_TICKET_TIER_3: string;
  CUSTOMER_CATEGORY: string;
  CLASSIFICATION_PATH: string;
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
            <tr className="bg-gray-100 text-sm text-center">
              {/* <th className="p-4">INC_KEY</th> */}
              <th className="p-4">INCIDENT</th>
              <th className="p-4">TTR_CUSTOMER</th>
              <th className="p-4">SUMMARY</th>
              <th className="p-4">REPORTED_DATE</th>
              <th className="p-4">OWNER_GROUP</th>
              <th className="p-4">OWN_ER</th>
              <th className="p-4">CUSTOMER_SEGMENT</th>
              <th className="p-4">SERVICE_TYPE</th>
              <th className="p-4">WITEL</th>
              <th className="p-4">WORKZONE</th>
              <th className="p-4">STA_TUS</th>
              <th className="p-4">STATUS_DATE</th>
              <th className="p-4">TICKET_ID_GAMAS</th>
              <th className="p-4">REPORTED_BY</th>
              <th className="p-4">CONTACT_PHONE</th>
              <th className="p-4">CONTACT_NAME</th>
              <th className="p-4">CONTACT_EMAIL</th>
              <th className="p-4">BOOKING_DATE</th>
              <th className="p-4">DESCRIPTION_ASSIGNMENT</th>
              <th className="p-4">REPORTED_PRIORITY</th>
              <th className="p-4">SOURCE_TICKET</th>
              <th className="p-4">SUBSIDIARY</th>
              <th className="p-4">EXTERNAL_TICKET_ID</th>
              <th className="p-4">CHANNEL</th>
              <th className="p-4">CUSTOMER_TYPE</th>
              <th className="p-4">CLOSED_BY</th>
              <th className="p-4">CLOSED_REOPEN_BY</th>
              <th className="p-4">CUSTOMER_ID</th>
              <th className="p-4">CUSTOMER_NAME</th>
              <th className="p-4">SERVICE_ID</th>
              <th className="p-4">SERVICE_NO</th>
              <th className="p-4">SLG</th>
              <th className="p-4">TECHNOLOGY</th>
              <th className="p-4">LAPUL</th>
              <th className="p-4">GAUL</th>
              <th className="p-4">ONU_RX</th>
              <th className="p-4">PENDING_REASON</th>
              <th className="p-4">DATEMODIFIED</th>
              <th className="p-4">INCIDENT_DOMAIN</th>
              <th className="p-4">REGION</th>
              <th className="p-4">SYMPTOM</th>
              <th className="p-4">HIERARCHY_PATH</th>
              <th className="p-4">SOLUTION</th>
              <th className="p-4">DESCRIPTION_ACTUAL_SOLUTION</th>
              <th className="p-4">KODE_PRODUK</th>
              <th className="p-4">PERANGKAT</th>
              <th className="p-4">TECHNICIAN</th>
              <th className="p-4">DEVICE_NAME</th>
              <th className="p-4">WORKLOG_SUMMARY</th>
              <th className="p-4">CLASSIFICATION_FLAG</th>
              <th className="p-4">REALM</th>
              <th className="p-4">RELATED_TO_GAMAS</th>
              <th className="p-4">TSC_RESULT</th>
              <th className="p-4">SCC_RESULT</th>
              <th className="p-4">TTR_AGENT</th>
              <th className="p-4">TTR_MITRA</th>
              <th className="p-4">TTR_NASIONAL</th>
              <th className="p-4">TTR_PENDING</th>
              <th className="p-4">TTR_REGION</th>
              <th className="p-4">TTR_WITEL</th>
              <th className="p-4">TTR_END_TO_END</th>
              <th className="p-4">NOTE</th>
              <th className="p-4">GUARANTE_STATUS</th>
              <th className="p-4">RESOLVE_DATE</th>
              <th className="p-4">SN_ONT</th>
              <th className="p-4">TIPE_ONT</th>
              <th className="p-4">MANUFACTURE_ONT</th>
              <th className="p-4">IMPACTED_SITE</th>
              <th className="p-4">CAUSE</th>
              <th className="p-4">RESOLUTION</th>
              <th className="p-4">NOTES_ESKALASI</th>
              <th className="p-4">RK_INFORMATION</th>
              <th className="p-4">EXTERNAL_TICKET_TIER_3</th>
              <th className="p-4">CUSTOMER_CATEGORY</th>
              <th className="p-4">CLASSIFICATION_PATH</th>

            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? currentData.map((ticket, index) => (
              <tr key={index} className="border-b text-sm text-center">
                {/* <td className="p-4">{ticket.INC_KEY || '-'}</td> */}
                <td className="p-4">{ticket.INCIDENT || '-'}</td>
                <td className="p-4">{ticket.TTR_CUSTOMER || '-'}</td>
                <td className="p-4">{ticket.SUMMARY || '-'}</td>
                <td className="p-4">{ticket.REPORTED_DATE || '-'}</td>
                <td className="p-4">{ticket.OWNER_GROUP || '-'}</td>
                <td className="p-4">{ticket.OWN_ER || '-'}</td>
                <td className="p-4">{ticket.CUSTOMER_SEGMENT || '-'}</td>
                <td className="p-4">{ticket.SERVICE_TYPE || '-'}</td>
                <td className="p-4">{ticket.WITEL || '-'}</td>
                <td className="p-4">{ticket.WORKZONE || '-'}</td>
                <td className="p-4">{ticket.STA_TUS || '-'}</td>
                <td className="p-4">{ticket.STATUS_DATE || '-'}</td>
                <td className="p-4">{ticket.TICKET_ID_GAMAS || '-'}</td>
                <td className="p-4">{ticket.REPORTED_BY || '-'}</td>
                <td className="p-4">{ticket.CONTACT_PHONE || '-'}</td>
                <td className="p-4">{ticket.CONTACT_NAME || '-'}</td>
                <td className="p-4">{ticket.CONTACT_EMAIL || '-'}</td>
                <td className="p-4">{ticket.BOOKING_DATE || '-'}</td>
                <td className="p-4">{ticket.DESCRIPTION_ASSIGNMENT || '-'}</td>
                <td className="p-4">{ticket.REPORTED_PRIORITY || '-'}</td>
                <td className="p-4">{ticket.SOURCE_TICKET || '-'}</td>
                <td className="p-4">{ticket.SUBSIDIARY || '-'}</td>
                <td className="p-4">{ticket.EXTERNAL_TICKET_ID || '-'}</td>
                <td className="p-4">{ticket.CHANNEL || '-'}</td>
                <td className="p-4">{ticket.CUSTOMER_TYPE || '-'}</td>
                <td className="p-4">{ticket.CLOSED_BY || '-'}</td>
                <td className="p-4">{ticket.CLOSED_REOPEN_BY || '-'}</td>
                <td className="p-4">{ticket.CUSTOMER_ID || '-'}</td>
                <td className="p-4">{ticket.CUSTOMER_NAME || '-'}</td>
                <td className="p-4">{ticket.SERVICE_ID || '-'}</td>
                <td className="p-4">{ticket.SERVICE_NO || '-'}</td>
                <td className="p-4">{ticket.SLG || '-'}</td>
                <td className="p-4">{ticket.TECHNOLOGY || '-'}</td>
                <td className="p-4">{ticket.LAPUL || '-'}</td>
                <td className="p-4">{ticket.GAUL || '-'}</td>
                <td className="p-4">{ticket.ONU_RX || '-'}</td>
                <td className="p-4">{ticket.PENDING_REASON || '-'}</td>
                <td className="p-4">{ticket.DATEMODIFIED || '-'}</td>
                <td className="p-4">{ticket.INCIDENT_DOMAIN || '-'}</td>
                <td className="p-4">{ticket.REGION || '-'}</td>
                <td className="p-4">{ticket.SYMPTOM || '-'}</td>
                <td className="p-4">{ticket.HIERARCHY_PATH || '-'}</td>
                <td className="p-4">{ticket.SOLUTION || '-'}</td>
                <td className="p-4">{ticket.DESCRIPTION_ACTUAL_SOLUTION || '-'}</td>
                <td className="p-4">{ticket.KODE_PRODUK || '-'}</td>
                <td className="p-4">{ticket.PERANGKAT || '-'}</td>
                <td className="p-4">{ticket.TECHNICIAN || '-'}</td>
                <td className="p-4">{ticket.DEVICE_NAME || '-'}</td>
                <td className="p-4">{ticket.WORKLOG_SUMMARY || '-'}</td>
                <td className="p-4">{ticket.CLASSIFICATION_FLAG || '-'}</td>
                <td className="p-4">{ticket.REALM || '-'}</td>
                <td className="p-4">{ticket.RELATED_TO_GAMAS || '-'}</td>
                <td className="p-4">{ticket.TSC_RESULT || '-'}</td>
                <td className="p-4">{ticket.SCC_RESULT || '-'}</td>
                <td className="p-4">{ticket.TTR_AGENT || '-'}</td>
                <td className="p-4">{ticket.TTR_MITRA || '-'}</td>
                <td className="p-4">{ticket.TTR_NASIONAL || '-'}</td>
                <td className="p-4">{ticket.TTR_PENDING || '-'}</td>
                <td className="p-4">{ticket.TTR_REGION || '-'}</td>
                <td className="p-4">{ticket.TTR_WITEL || '-'}</td>
                <td className="p-4">{ticket.TTR_END_TO_END || '-'}</td>
                <td className="p-4">{ticket.NOTE || '-'}</td>
                <td className="p-4">{ticket.GUARANTE_STATUS || '-'}</td>
                <td className="p-4">{ticket.RESOLVE_DATE || '-'}</td>
                <td className="p-4">{ticket.SN_ONT || '-'}</td>
                <td className="p-4">{ticket.TIPE_ONT || '-'}</td>
                <td className="p-4">{ticket.MANUFACTURE_ONT || '-'}</td>
                <td className="p-4">{ticket.IMPACTED_SITE || '-'}</td>
                <td className="p-4">{ticket.CAUSE || '-'}</td>
                <td className="p-4">{ticket.RESOLUTION || '-'}</td>
                <td className="p-4">{ticket.NOTES_ESKALASI || '-'}</td>
                <td className="p-4">{ticket.RK_INFORMATION || '-'}</td>
                <td className="p-4">{ticket.EXTERNAL_TICKET_TIER_3 || '-'}</td>
                <td className="p-4">{ticket.CUSTOMER_CATEGORY || '-'}</td>
                <td className="p-4">{ticket.CLASSIFICATION_PATH || '-'}</td>
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