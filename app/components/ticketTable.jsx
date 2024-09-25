const ticketTable = () => {
return (
<div className="bg-white p-6 shadow-lg rounded-lg mt-5">
    <table className="min-w-full table-auto">
        <thead>
            <tr className="bg-gray-100">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Rate</th>
                <th className="p-4 text-left">Balance</th>
                <th className="p-4 text-left">Deposit</th>
            </tr>
        </thead>
        <tbody>
            {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b">
                    <td className="p-4">{ticket.name}</td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${ticket.status === "Paid" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                            {ticket.status}
                        </span>
                    </td>
                    <td className="p-4">${ticket.rate.toFixed(2)}</td>
                    <td className={`p-4 ${ticket.balance < 0? "text-red-500" : ""}`}>${ticket.balance.toFixed(2)}</td>
                    <td className="p-4">${ticket.deposit.toFixed(2)}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
);
};

export default ticketTable;