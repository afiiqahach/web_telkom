'use client'

import { SearchIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

interface Ticket {
  A?: string; // Asumsikan ini adalah kolom tanggal
  B?: string;
  C?: string;
  D?: string;
  E?: string;
  F?: string;
  G?: string;
  H?: string;
  I?: string;
  J?: string;
  K?: string;
  L?: string;
  M?: string;
  N?: string;
  O?: string;
  P?: string;
  Q?: string;
  R?: string;
  S?: string;
  T?: string;
  U?: string;
  V?: string;
  W?: string;
  X?: string;
  Y?: string;
  Z?: string;
  AA?: string;
  AB?: string;
  AC?: string;
  AD?: string;
  AE?: string;
  AF?: string;
  AG?: string;
  AH?: string;
  AI?: string;
  AJ?: string;
  AK?: string;
  AL?: string;
  AM?: string;
  AN?: string;
  AO?: string;
  AP?: string;
  AQ?: string;
  AR?: string;
  A_S?: string;
  A_T?: string;
  AU?: string;
  AV?: string;
  AW?: string;
  AX?: string;
  AY?: string;
  AZ?: string;
  BA?: string;
  BB?: string;
  BC?: string;
  BD?: string;
  BE?: string;
  BF?: string;
  BG?: string;
  BH?: string;
  BI?: string;
  BJ?: string;
  BK?: string;
  BL?: string;
  BM?: string;
  BN?: string;
  BO?: string;
  BP?: string;
  BQ?: string;
  BR?: string;
  BS?: string;
  BT?: string;
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
    if (startDate && endDate && ticket.D) {
      const ticketDate = new Date(ticket.D);
      isWithinDateRange = ticketDate >= new Date(startDate) && ticketDate <= new Date(endDate);
    }

    // Filter berdasarkan pencarian
    const isMatchingSearch = ticket.A?.toLowerCase().includes(searchQuery.toLowerCase());

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
            <th className="p-4 text-left">A</th>
              <th className="p-4 text-left">B</th>
              <th className="p-4 text-left">C</th>
              <th className="p-4 text-left">D</th>
              <th className="p-4 text-left">E</th>
              <th className="p-4 text-left">F</th>
              <th className="p-4 text-left">G</th>
              <th className="p-4 text-left">H</th>
              <th className="p-4 text-left">I</th>
              <th className="p-4 text-left">J</th>
              <th className="p-4 text-left">K</th>
              <th className="p-4 text-left">L</th>
              <th className="p-4 text-left">M</th>
              <th className="p-4 text-left">N</th>
              <th className="p-4 text-left">O</th>
              <th className="p-4 text-left">P</th>
              <th className="p-4 text-left">Q</th>
              <th className="p-4 text-left">R</th>
              <th className="p-4 text-left">S</th>
              <th className="p-4 text-left">T</th>
              <th className="p-4 text-left">U</th>
              <th className="p-4 text-left">V</th>
              <th className="p-4 text-left">W</th>
              <th className="p-4 text-left">X</th>
              <th className="p-4 text-left">Y</th>
              <th className="p-4 text-left">Z</th>
              <th className="p-4 text-left">AA</th>
              <th className="p-4 text-left">AB</th>
              <th className="p-4 text-left">AC</th>
              <th className="p-4 text-left">AD</th>
              <th className="p-4 text-left">AE</th>
              <th className="p-4 text-left">AF</th>
              <th className="p-4 text-left">AG</th>
              <th className="p-4 text-left">AH</th>
              <th className="p-4 text-left">AI</th>
              <th className="p-4 text-left">AJ</th>
              <th className="p-4 text-left">AK</th>
              <th className="p-4 text-left">AL</th>
              <th className="p-4 text-left">AM</th>
              <th className="p-4 text-left">AN</th>
              <th className="p-4 text-left">AO</th>
              <th className="p-4 text-left">AP</th>
              <th className="p-4 text-left">AQ</th>
              <th className="p-4 text-left">AR</th>
              <th className="p-4 text-left">A_S</th>
              <th className="p-4 text-left">A_T</th>
              <th className="p-4 text-left">AU</th>
              <th className="p-4 text-left">AV</th>
              <th className="p-4 text-left">AW</th>
              <th className="p-4 text-left">AX</th>
              <th className="p-4 text-left">AY</th>
              <th className="p-4 text-left">AZ</th>
              <th className="p-4 text-left">BA</th>
              <th className="p-4 text-left">BB</th>
              <th className="p-4 text-left">BC</th>
              <th className="p-4 text-left">BD</th>
              <th className="p-4 text-left">BE</th>
              <th className="p-4 text-left">BF</th>
              <th className="p-4 text-left">BG</th>
              <th className="p-4 text-left">BH</th>
              <th className="p-4 text-left">BI</th>
              <th className="p-4 text-left">BJ</th>
              <th className="p-4 text-left">BK</th>
              <th className="p-4 text-left">BL</th>
              <th className="p-4 text-left">BM</th>
              <th className="p-4 text-left">BN</th>
              <th className="p-4 text-left">BO</th>
              <th className="p-4 text-left">BP</th>
              <th className="p-4 text-left">BQ</th>
              <th className="p-4 text-left">BR</th>
              <th className="p-4 text-left">BS</th>
              <th className="p-4 text-left">BT</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? currentData.map((ticket, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="p-4">{ticket.A}</td>
                <td className="p-4">{ticket.B}</td>
                <td className="p-4">{ticket.C}</td>
                <td className="p-4">{ticket.D}</td>
                <td className="p-4">{ticket.E}</td>
                <td className="p-4">{ticket.F}</td>
                <td className="p-4">{ticket.G}</td>
                <td className="p-4">{ticket.H}</td>
                <td className="p-4">{ticket.I}</td>
                <td className="p-4">{ticket.J}</td>
                <td className="p-4">{ticket.K}</td>
                <td className="p-4">{ticket.L}</td>
                <td className="p-4">{ticket.M}</td>
                <td className="p-4">{ticket.N}</td>
                <td className="p-4">{ticket.O}</td>
                <td className="p-4">{ticket.P}</td>
                <td className="p-4">{ticket.Q}</td>
                <td className="p-4">{ticket.R}</td>
                <td className="p-4">{ticket.S}</td>
                <td className="p-4">{ticket.T}</td>
                <td className="p-4">{ticket.U}</td>
                <td className="p-4">{ticket.V}</td>
                <td className="p-4">{ticket.W}</td>
                <td className="p-4">{ticket.X}</td>
                <td className="p-4">{ticket.Y}</td>
                <td className="p-4">{ticket.Z}</td>
                <td className="p-4">{ticket.AA}</td>
                <td className="p-4">{ticket.AB}</td>
                <td className="p-4">{ticket.AC}</td>
                <td className="p-4">{ticket.AD}</td>
                <td className="p-4">{ticket.AE}</td>
                <td className="p-4">{ticket.AF}</td>
                <td className="p-4">{ticket.AG}</td>
                <td className="p-4">{ticket.AH}</td>
                <td className="p-4">{ticket.AI}</td>
                <td className="p-4">{ticket.AJ}</td>
                <td className="p-4">{ticket.AK}</td>
                <td className="p-4">{ticket.AL}</td>
                <td className="p-4">{ticket.AM}</td>
                <td className="p-4">{ticket.AN}</td>
                <td className="p-4">{ticket.AO}</td>
                <td className="p-4">{ticket.AP}</td>
                <td className="p-4">{ticket.AQ}</td>
                <td className="p-4">{ticket.AR}</td>
                <td className="p-4">{ticket.A_S}</td>
                <td className="p-4">{ticket.A_T}</td>
                <td className="p-4">{ticket.AU}</td>
                <td className="p-4">{ticket.AV}</td>
                <td className="p-4">{ticket.AW}</td>
                <td className="p-4">{ticket.AX}</td>
                <td className="p-4">{ticket.AY}</td>
                <td className="p-4">{ticket.AZ}</td>
                <td className="p-4">{ticket.BA}</td>
                <td className="p-4">{ticket.BB}</td>
                <td className="p-4">{ticket.BC}</td>
                <td className="p-4">{ticket.BD}</td>
                <td className="p-4">{ticket.BE}</td>
                <td className="p-4">{ticket.BF}</td>
                <td className="p-4">{ticket.BG}</td>
                <td className="p-4">{ticket.BH}</td>
                <td className="p-4">{ticket.BI}</td>
                <td className="p-4">{ticket.BJ}</td>
                <td className="p-4">{ticket.BK}</td>
                <td className="p-4">{ticket.BL}</td>
                <td className="p-4">{ticket.BM}</td>
                <td className="p-4">{ticket.BN}</td>
                <td className="p-4">{ticket.BO}</td>
                <td className="p-4">{ticket.BP}</td>
                <td className="p-4">{ticket.BQ}</td>
                <td className="p-4">{ticket.BR}</td>
                <td className="p-4">{ticket.BS}</td>
                <td className="p-4">{ticket.BT}</td>
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
