"use client";
import { Input } from "@/components/ui/input";
import { HousePlus, Search } from "lucide-react";
import useGlobalStore from "@/zustand/useProps";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const {searchCity,setSearchCity} = useGlobalStore();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-100 to-blue-200">
      <header className="lg:sticky fixed top-16 sm:top-16 md:top-16 lg:top-0 z-10 w-full bg-lblue bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4 py-2">
          <div className="flex gap-2 items-center justify-between ">
            <div className="flex items-center gap-1">
              <div className="bg-lblue bg-opacity-50 rounded-lg p-2">
                <HousePlus className="text-blue w-8 h-8" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <h1 className="hidden lg:block text-2xl sm:text-3xl lg:text-3xl font-bold text-blue ml-0 sm:ml-2 leading-6 sm:leading-6">
                  Find Nearby Hospitals
                </h1>
                <p className="hidden lg:block text-blue-700 text-sm sm:text-base ml-0 sm:ml-2">
                  Your health matters—find the care you need, right where you
                  are!
                </p>
              </div>
            </div>
            <div className="relative lg:w-96 w-full ">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Enter the location"
                className="pl-8"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
