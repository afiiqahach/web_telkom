'use client'
// Import ikon dari Heroicons
import { SearchIcon, UserIcon } from '@heroicons/react/outline';


const Header = () => {
  // // State untuk melacak tombol yang aktif
  // const [activeTab, setActiveTab] = useState<string>('Assets');

  // // Data menu
  // const menuItems = [
  //   'Assets',
  //   'Area',
  //   'Person Service',
  //   'Scheduling',
  //   'Incident Ticket',
  //   'Work Order',
  //   'SQM',
  //   'Profil'
  // ];

  return (
    <div className="flex justify-between items-center px-16 py-2 border-b">

      {/* Search Input */}
      <div className="relative w-[440px]"> 
        <input 
          type="text" 
          placeholder="Search in site" 
          className="border rounded-lg p-2 pl-10 pr-4 w-full" // Padding left ditambahkan untuk memberi ruang bagi ikon
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
      <div>
        <div className="w-60 h-[58px] relative">
          <div className="w-[239px] h-14 left-[1px] top-[1px] absolute border rounded-xl p-2"></div>
          <div className="w-6 h-6 left-[203px] top-[17px] absolute"></div>
          <div className="left-[73px] top-[11px] absolute">
              <div className="absolute text-[#232738] text-sm font-semibold">Afiqah</div>
              <div className="top-[21px] absolute text-[#bdbdbd] text-xs font-medium">Admin</div>
          </div>
          {/* Ikon Profil */}
          <div className="relative">
            <UserIcon className="h-14 w-14 text-black cursor-pointer px-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
