import Sidebar from "../components/sidebar"
import TicketTable from "../components/ticketTable"
import Header from "../components/header";

const Ticket = () => {
    return (
        <div >
            <Sidebar/>
            <div className="ms-64">
                <div>
                    <Header/>
                </div>
                <div>
                    <TicketTable/>
                </div>
            </div>
            
        </div>

        
    )
}

export default Ticket