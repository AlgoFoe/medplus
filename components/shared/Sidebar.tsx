"use client";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import ThemeSwitch from "./ThemeSwitch";

import {
  BriefcaseMedical,
  House,
  Star,
  UserRound,
  Stethoscope,
} from "lucide-react";

const iconMap = {
  "/FaHome": <House />,
  "/FaStar": <Star />,
  "/FaBriefcaseMedical": <BriefcaseMedical />,
  "/FaUser": <UserRound />,
  "/FaStethoscope": <Stethoscope />,
};

const Sidebar = () => {
  const pathname = usePathname();
  const baseRoute = "/" + pathname.split("/").slice(1, 3).join("/");
  return (
    <aside>
      <div className="sidebar">
        <div className="flex size-full flex-col gap-4">
          <Link href="/" className="sidebar-logo pl-5">
            <Image
              src="/assets/images/logo-large.png"
              alt="logo"
              width={180}
              height={30}
              />
          </Link>

          <nav className="sidebar-nav">
            <SignedIn>
              <ul className="sidebar-nav_elements">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route == baseRoute;
                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive ? "bg-blue text-white" : "text-gray-700"
                      }`}
                    >
                      <Link className="sidebar-link" href={link.route}>
                        <span
                          className={`sidebar-icon ${
                            isActive && "brightness-200"
                          }`}
                        >
                          {iconMap[link.icon]}
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="sidebar-nav_elements">
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route == pathname;
                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive ? "bg-blue text-white" : "text-gray-700"
                      }`}
                    >
                      <Link className="sidebar-link" href={link.route}>
                        <span
                          className={`sidebar-icon ${
                            isActive && "brightness-200"
                          }`}
                        >
                          {iconMap[link.icon]}
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
                <li className="hover:cursor-pointer hover:bg-gray-200 rounded-lg pr-15 pt-1 pb-1 flex-center cursor-pointer pl-2.5 mt-1 mb-1">
                  <UserButton
                    showName
                    appearance={{
                      elements: {
                        userButtonBox: {
                          paddingRight: "125px",
                          whiteSpace: "nowrap",
                        },
                        userButtonAvatarBox: {
                          width: "1.4rem",
                          height: "1.4rem",
                        },
                        userButtonOuterIdentifier: {
                          marginLeft: "-9px",
                        },
                      },
                    }}
                  />
                </li>
                <li className="pl-1 pt-1">
                  <ThemeSwitch />
                </li>
              </ul>
            </SignedIn>
            <SignedOut>
              <Button asChild className="button bg-green-gradient bg-cover">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
