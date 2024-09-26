import Sidebar from "../components/sidebar"
import Header from "../components/header";
import Footer from "../components/footer";

const Dashboard = () =>{
  return (
    <div>
      <Sidebar/>
      <div className="ms-64">
          <Header />
        <div className="flex">
          <div className="pt-32 justify-center gap-[60px] inline-flex">
            <div className="h-[520px] p-[60px] flex-col justify-start items-start gap-6 inline-flex">
                <div className="self-stretch text-black text-[40px] font-bold">Welcome to ARINA <br />Dashboard</div>
                <div className="self-stretch text-black">Manage your assets and services efficiently</div>
            </div>
            <div className="grow justify-start items-start pl-32 flex">
              <img src="img/bot.png" alt="bot" />
            </div>
            <div>
              <Footer />
            </div>
          </div>  
        </div>  
      </div>
    </div>
    
    
  )
}

export default Dashboard  