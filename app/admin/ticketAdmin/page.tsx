import Sidebar from "@/app/components/sidebarAdmin"
import TicketEditPage from "@/app/components/ticketAdmin"
import Header from "@/app/components/headerAdmin";

const Ticket = () => {
    return (
        <div >
            <Sidebar/>
            <div className="ms-64">
                <div>
                    <Header/>
                </div>
                <div>
                    <TicketEditPage/>
                </div>
            </div>            
        </div>
    )
}

export default Ticket