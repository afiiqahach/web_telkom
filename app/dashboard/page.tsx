import Sidebar from "../components/sidebar"
import Header from "../components/header";

const Dashboard = () =>{
  return (
    <div>
      <div className="flex-1">
        <Header />
        <div>
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
            </div>
          </div>
        </div>
      </div>
      <div>
      <h1 className="">Welcome to ARINA <br/> Dashboard</h1>
      <img src="img/bot.png" alt="bot" />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  )
}

export default Dashboard