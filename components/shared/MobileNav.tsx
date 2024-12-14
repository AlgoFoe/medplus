"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { navLinks } from "@/constants";
import { DialogTitle } from "@radix-ui/react-dialog";
import ThemeSwitch from "./ThemeSwitch";
import { BriefcaseMedical, House, Menu, Star, UserRound,Stethoscope } from "lucide-react";
const iconMap = {
  "/FaHome": <House />,
  "/FaStar": <Star />,
  "/FaBriefcaseMedical": <BriefcaseMedical />,
  "/FaUser": <UserRound />,
  "/FaStethoscope": <Stethoscope />,
};
const MobileNav = () => {
  const pathname = usePathname();
  const baseRoute = "/" + pathname.split("/").slice(1, 3).join("/");
  
  return (
    <header className="header flex items-center justify-between p-4 z-10">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/logo-small.png"
          alt="logo"
          width={60}
          height={51}
        />
      </Link>
      <nav className="flex items-center gap-4">
        <SignedIn>
          <UserButton />
          <ThemeSwitch />
          <Sheet>
            <SheetTrigger asChild>
              <button title="Menu">
              <Menu />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="sheet-content sm:w-64 p-4 flex flex-col justify-between">
              <div>
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-4">
                  <Image
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={152}
                    height={23}
                  />
                  <ul className="flex flex-col gap-2">
                    {navLinks
                      .filter(link => link.label !== "Profile")
                      .map((link) => {
                        const isActive = link.route === baseRoute;
                        return (
                          <li key={link.route} className={`bg-gray-100 ${isActive && 'bg-gray-300'} rounded-lg p-1`}>
                            <Link
                              href={link.route}
                              className={`flex items-center gap-2 p-2 text-lg font-bold ${
                                isActive ? "text-green-100" : "text-dark-700"
                              }`}
                            >
                              <span>
                                {iconMap[link.icon]}
                              </span>
                              <span>{link.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-400 rounded-lg p-1 mt-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 p-2 text-lg font-bold text-dark-700"
                >
                  <span>{iconMap["/FaUser"]}</span>
                  <span>Profile</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="bg-green-gradient">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
