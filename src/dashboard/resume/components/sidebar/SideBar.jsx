import { MoreVertical, Home, User, FileText, Settings } from "lucide-react";
import { createContext, useContext } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  return (
    <>
      <nav className="top-2 bottom-0 w-full bg-white border-t  md:relative md:w-auto md:h-screen md:border-t-0 ">
        <SidebarContext.Provider value={{ expanded: true }}>
          <ul className="mt-40 flex md:flex-col justify-around md:justify-start md:px-3 md:py-4">
            {children}
          </ul>
        </SidebarContext.Provider>

        
      </nav>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
    return (
      <li
        onClick={onClick}
        className={`relative flex items-center py-2 px-3 md:my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}
      >
        {icon}
        <span className="ml-3 hidden md:block">{text}</span>
        {alert && <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />}
      </li>
    );
  }
  

