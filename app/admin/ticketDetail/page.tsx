'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ref, onValue, update } from 'firebase/database';
import { database } from '@/lib/firebaseConfig';
import { jsPDF } from 'jspdf';
import Header from '@/app/components/headerAdmin';

type Ticket = {
  INCIDENT?: string;
  SUMMARY?: string;
  REPORTED_DATE?: string;
  STATUS?: string;
  OWNER_GROUP?: string;
  CUSTOMER_SEGMENT?: string;
  SERVICE_TYPE?: string;
  WITEL?: string;
  REGION?: string;
  [key: string]: string | undefined;
};

const TicketDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketId = searchParams.get('ticketId');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTicket, setEditedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (ticketId) {
      const ticketRef = ref(database, `tickets/${ticketId}`);
      onValue(ticketRef, (snapshot) => {
        const data = snapshot.val();
        setTicket(data);
        setEditedTicket(data);
      });
    }
  }, [ticketId]);

  const handleEditChange = (key: string, value: string) => {
    if (editedTicket) {
      setEditedTicket({
        ...editedTicket,
        [key]: value,
      });
    }
  };

  const handleSave = () => {
    if (ticketId && editedTicket) {
      const ticketRef = ref(database, `tickets/${ticketId}`);
      update(ticketRef, editedTicket).then(() => {
        setEditMode(false);
      });
    }
  };

  // Function to generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text(`Ticket Details: ${ticket?.INCIDENT}`, 10, 10);
  
    let yPosition = 20; // Initial Y position for content
    const pageHeight = doc.internal.pageSize.height; // Total page height
    const margin = 10; // Margin for content from the top and sides
    const lineHeight = 10; // Distance between each line of text
  
    // Adding ticket summary with text wrapping
    if (ticket?.SUMMARY) {
      doc.setFontSize(10);
      const summaryText = `Summary: ${ticket.SUMMARY}`;
      doc.text(summaryText, margin, yPosition, { maxWidth: 180 }); // Set a max width for the text to wrap
      yPosition += 10 + (summaryText.split('\n').length * lineHeight); // Adjust Y position based on text length
  
      // Check if content exceeds page height and add new page if necessary
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin; // Reset Y position for the new page
      }
    }
  
    // Adding each ticket detail
    Object.entries(ticket || {}).forEach(([key, value]) => {
      if (key !== 'INCIDENT' && key !== 'SUMMARY') {
        const text = `${key.replace(/_/g, ' ')}: ${value || '-'}`;
        doc.text(text, margin, yPosition, { maxWidth: 180 });
        yPosition += lineHeight;
  
        // Check if content exceeds page height and add new page if necessary
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin; // Reset Y position for the new page
        }
      }
    });
  
    // Save the generated PDF
    doc.save(`ticket_${ticket?.INCIDENT}.pdf`);
  };

  // Function to download CSV
  const downloadCSV = () => {
    if (!ticket) return;

    // Create CSV headers (keys)
    const headers = Object.keys(ticket).map(key => key.replace(/_/g, ' ').toUpperCase());
    
    // Create CSV rows (values)
    const values = Object.values(ticket).map(value => value || '-');
    
    // Create CSV content by joining headers and values
    const csvContent = [
      headers.join(','), // First line is the header
      values.join(','),  // Second line is the row data
    ].join('\n'); // Join them with newline characters
    
    // Create a Blob and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ticket_${ticket.INCIDENT}.csv`;
    link.click();
  };

  const getStatusColor = (status: string | undefined) => {
    if (status === 'BACKEND') return 'bg-blue-100 text-blue-600';
    if (status === 'ANALYSIS') return 'bg-green-100 text-green-600';
    return 'bg-gray-300 text-black'; // Default color if no status matches
  };

  if (!ticketId || !ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Header />
        <p className="text-lg text-gray-500">Loading ticket details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="bg-white shadow rounded-lg p-6 mt-20">
        <button
          onClick={() => router.push('/admin/ticketAdmin')}
          className="mb-4 bg-blue-500 hover:bg-[#083d6b] text-white px-4 py-2 rounded"
        >
          Back to Tickets
        </button>
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Ticket Details: {ticket.INCIDENT}
        </h1>
        {ticket.SUMMARY && (
          <h2 className="text-lg font-bold text-gray-600 mb-4">{ticket.SUMMARY}</h2>
        )}
        
        {/* Status with conditional color */}
        <h3
          className={`text-lg font-semibold p-3 rounded-md w-fit ${getStatusColor(ticket.STATUS)}`}
        >
          Status: {ticket.STATUS || 'N/A'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(ticket).map(([key, value]) => (
            <div key={key} className="bg-gray-100 p-4 rounded-md mt-5">
              <p className="text-sm text-gray-500 font-semibold">
                {key.replace(/_/g, ' ')}
              </p>
              {editMode ? (
                <input
                  type="text"
                  value={(editedTicket && editedTicket[key as keyof Ticket]) || ''}
                  onChange={(e) => handleEditChange(key, e.target.value)}
                  className="w-full border p-2 rounded mt-2"
                />
              ) : (
                <p className="text-gray-800">{value || '-'}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit Ticket
            </button>
          )}
        </div>

        {/* Button to download PDF */}
        <button
          onClick={downloadPDF}
          className="bg-[#083d6b] hover:bg-[#083d6bc5] text-white px-4 py-2 rounded mt-4"
        >
          Download as PDF
        </button>

        {/* Button to download CSV */}
        <button
          onClick={downloadCSV}
          className="bg-[#083d6b] hover:bg-[#083d6bc5] text-white px-4 py-2 rounded mt-4 ml-3"
        >
          Download as CSV
        </button>
      </div>
    </div>
  );
};

export default TicketDetailPage;