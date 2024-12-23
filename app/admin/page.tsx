import Sidebar from "../components/sidebarAdmin"
import TicketEditPage from "../components/ticketAdmin"
import Header from "../components/headerAdmin";

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