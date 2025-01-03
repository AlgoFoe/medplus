"use client";
import { CalendarPlus2 } from "lucide-react";
import useGlobalStore from "@/zustand/useProps";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const {setBookingStatus} = useGlobalStore()
  return (
    <div  className={`flex flex-col min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 `}>
      <header className="lg:sticky fixed top-16 sm:top-16 md:top-16 lg:top-0 z-10 w-full bg-lblue bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4 py-2">
          <div className="flex gap-2 items-center justify-between ">
            <div className="flex items-center gap-1">
              <div className="bg-lblue bg-opacity-50 rounded-lg p-2">
                <CalendarPlus2
                  className="text-blue w-8 h-8"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="hidden lg:block text-2xl sm:text-3xl lg:text-3xl font-bold text-blue ml-0 sm:ml-2 leading-6 sm:leading-6">
                  Health Calendar
                </h1>
                <p className="hidden lg:block text-blue-700 text-sm sm:text-base ml-0 sm:ml-2">
                  Your next appointment is just a click away—let&apos;s make your
                  health a priority!
                </p>
              </div>
            </div>
            <div className="relative lg:w-96 w-full md:w-96 sm:w-96 p-2 rounded-md">
              <button
                className="w-full text-xl font-bold tracking-tight px-3 py-2 rounded-md hover:border-2 transition-colors duration-500 ease-in-out text-white hover:text-blue hover:bg-white bg-blue dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white "
                onClick={()=>setBookingStatus(true)}
              >
                Book your Appointment
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
