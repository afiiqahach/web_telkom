'use client'

import { SearchIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

// 1. Definisikan tipe untuk ticket
interface Ticket {
  A?: string;
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

  // SUBSIDIARY?: string;
  // EXTERNAL_TICKET_ID?: string;
  // CHANNEL?: string;
  // CUSTOMER_TYPE?: string;
  // CLOSED_BY?: string;
  // CLOSED_REOPEN_BY?: string;
  // CUSTOMER_ID: string;
  // CUSTOMER_NAME: string;
  // SERVICE_ID: string;
  // SERVICE_NO: string;
  // SLG?: string;
  // TECHNOLOGY: string;
  // LAPUL?: string;
  // GAUL?: string;
  // ONU_RX?: string;
  // PENDING_REASON?: string;
  // DATEMODIFIED?: string;
  // INCIDENT_DOMAIN: string;
  // REGION: string;
  // SYMPTOM?: string;
  // HIERARCHY_PATH?: string;
  // SOLUTION?: string;
  // DESCRIPTION_ACTUAL_SOLUTION?: string;
  // KODE_PRODUK?: string;
  // PERANGKAT?: string;
  // TECHNICIAN?: string;
  // DEVICE_NAME?: string;
  // WORKLOG_SUMMARY?: string;
  // CLASSIFICATION_FLAG?: string;
  // REALM?: string;
  // RELATED_TO_GAMAS?: string;
  // TSC_RESULT?: string;
  // SCC_RESULT?: string;
  // TTR_AGENT?: string;
  // TTR_MITRA?: string;
  // TTR_NASIONAL?: string;
  // TTR_PENDING?: string;
  // TTR_REGION?: string;
  // TTR_WITEL?: string;
  // TTR_END_TO_END?: string;
  // NOTE?: string;
  // GUARANTE_STATUS?: string;
  // RESOLVE_DATE?: string;
  // SN_ONT?: string;
  // TIPE_ONT?: string;
  // MANUFACTURE_ONT?: string;
  // IMPACTED_SITE?: string;
  // CAUSE?: string;
  // RESOLUTION?: string;
}

const TicketTable: React.FC = () => {
  // 2. Tambahkan tipe Ticket[] pada useState
  const [data, setData] = useState<Ticket[]>([]);

  useEffect(() => {
    //fetch ticket dari API
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data: Ticket[]) => setData(data)) // Pastikan tipe data yang dikembalikan sesuai
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="bg-white pl-12 shadow-lg rounded-lg mt-5">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 border rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
            </svg>
          </button>
          <div className="relative w-[440px]">
            <input
              type="text"
              className="border rounded-lg p-2 pl-10 pr-4"
              placeholder="Search..."
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">+ Add customer</button>
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
              {/* <th className="p-4 text-left">SUBSIDIARY</th>
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
              <th className="p-4 text-left">RESOLUTION</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((ticket, index) => (
              <tr key={index}>
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
                {/* <td className="p-4">{ticket.INCIDENT}</td>
                <td className="p-4">{ticket.TTR_CUSTOMER}</td>
                <td className="p-4">{ticket.SUMMARY}</td>
                <td className="p-4">{ticket.REPORTED_DATE}</td>
                <td className="p-4">{ticket.OWNER_GROUP}</td>
                <td className="p-4">{ticket.OWNER}</td>
                <td className="p-4">{ticket.CUSTOMER_SEGMENT}</td>
                <td className="p-4">{ticket.SERVICE_TYPE}</td>
                <td className="p-4">{ticket.WITEL}</td>
                <td className="p-4">{ticket.WORKZONE}</td>
                <td className="p-4">{ticket.STATUS}</td>
                <td className="p-4">{ticket.STATUS_DATE}</td>
                <td className="p-4">{ticket.TICKET_ID_GAMAS}</td>
                <td className="p-4">{ticket.REPORTED_BY}</td>
                <td className="p-4">{ticket.CONTACT_PHONE}</td>
                <td className="p-4">{ticket.CONTACT_NAME}</td>
                <td className="p-4">{ticket.CONTACT_EMAIL}</td>
                <td className="p-4">{ticket.BOOKING_DATE}</td>
                <td className="p-4">{ticket.DESCRIPTION_ASSIGNMENT}</td>
                <td className="p-4">{ticket.REPORTED_PRIORITY}</td>
                <td className="p-4">{ticket.SOURCE_TICKET}</td> */}
                {/* <td className="p-4">{ticket.SUBSIDIARY}</td>
                <td className="p-4">{ticket.EXTERNAL_TICKET_ID}</td>
                <td className="p-4">{ticket.CHANNEL}</td>
                <td className="p-4">{ticket.CUSTOMER_TYPE}</td>
                <td className="p-4">{ticket.CLOSED_BY}</td>
                <td className="p-4">{ticket.CLOSED_REOPEN_BY}</td>
                <td className="p-4">{ticket.CUSTOMER_ID}</td>
                <td className="p-4">{ticket.CUSTOMER_NAME}</td>
                <td className="p-4">{ticket.SERVICE_ID}</td>
                <td className="p-4">{ticket.SERVICE_NO}</td>
                <td className="p-4">{ticket.SLG}</td>
                <td className="p-4">{ticket.TECHNOLOGY}</td>
                <td className="p-4">{ticket.LAPUL}</td>
                <td className="p-4">{ticket.GAUL}</td>
                <td className="p-4">{ticket.ONU_RX}</td>
                <td className="p-4">{ticket.PENDING_REASON}</td>
                <td className="p-4">{ticket.DATEMODIFIED}</td>
                <td className="p-4">{ticket.INCIDENT_DOMAIN}</td>
                <td className="p-4">{ticket.REGION}</td>
                <td className="p-4">{ticket.SYMPTOM}</td>
                <td className="p-4">{ticket.HIERARCHY_PATH}</td>
                <td className="p-4">{ticket.SOLUTION}</td>
                <td className="p-4">{ticket.DESCRIPTION_ACTUAL_SOLUTION}</td>
                <td className="p-4">{ticket.KODE_PRODUK}</td>
                <td className="p-4">{ticket.PERANGKAT}</td>
                <td className="p-4">{ticket.TECHNICIAN}</td>
                <td className="p-4">{ticket.DEVICE_NAME}</td>
                <td className="p-4">{ticket.WORKLOG_SUMMARY}</td>
                <td className="p-4">{ticket.CLASSIFICATION_FLAG}</td>
                <td className="p-4">{ticket.REALM}</td>
                <td className="p-4">{ticket.RELATED_TO_GAMAS}</td>
                <td className="p-4">{ticket.TSC_RESULT}</td>
                <td className="p-4">{ticket.SCC_RESULT}</td>
                <td className="p-4">{ticket.TTR_AGENT}</td>
                <td className="p-4">{ticket.TTR_MITRA}</td>
                <td className="p-4">{ticket.TTR_NASIONAL}</td>
                <td className="p-4">{ticket.TTR_PENDING}</td>
                <td className="p-4">{ticket.TTR_REGION}</td>
                <td className="p-4">{ticket.TTR_WITEL}</td>
                <td className="p-4">{ticket.TTR_END_TO_END}</td>
                <td className="p-4">{ticket.NOTE}</td>
                <td className="p-4">{ticket.GUARANTE_STATUS}</td>
                <td className="p-4">{ticket.RESOLVE_DATE}</td>
                <td className="p-4">{ticket.SN_ONT}</td>
                <td className="p-4">{ticket.TIPE_ONT}</td>
                <td className="p-4">{ticket.MANUFACTURE_ONT}</td>
                <td className="p-4">{ticket.IMPACTED_SITE}</td>
                <td className="p-4">{ticket.CAUSE}</td>
                <td className="p-4">{ticket.RESOLUTION}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketTable;
