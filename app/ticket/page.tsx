import Sidebar from "../components/sidebar"
import TicketTable from "../components/ticketTable"
import Header from "../components/header";

const Ticket = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="flex">
                <div>
                    <Sidebar/>
                </div>
                <div>
                    <TicketTable/>
                </div>
            </div>
            
        </div>

        
    )
}

export default Ticket