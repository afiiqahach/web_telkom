/* eslint-disable @next/next/no-img-element */
const Header = () => {
    return (
      <div className="flex justify-between items-center p-4 border-b ">
        <div className="justify-start flex">
        <img src="img/logokecil.png" alt="bot" />
        <h1 className="text-2xl font-bold justify-start ps-4">ARINA</h1>
        </div>
        <div className="list-none items-center justify-center gap-12 inline-flex">
          <li>Assets</li>
          <li>Area</li>
          <li>Person Service</li>
          <li>Scheduling</li>
          <li>Incident Ticket</li>
          <li>Work Order</li>
          <li>SQM</li>
          <li>Profil</li>
        </div>
        
        <div className="flex space-x-4">
          <input type="text" placeholder="Search in site" className="border p-2 rounded" />
        </div>
        
      </div>
    );
  };
  
  export default Header;
  