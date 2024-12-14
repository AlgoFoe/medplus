"use client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import HospitalList from "@/components/shared/HospitalList";
import HospitalLocation from "@/components/shared/HospitalLocation";

type Props = {
  propName: string;
};

const page: React.FC<Props> = ({ propName }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Find Nearby Hospitals
          </h1>
          <p className="text-muted-foreground">
            Your health matters—find the care you need, right where you are!
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Enter the location"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full ">
            <HospitalList/>
        </div>
        <div className="w-full ">
          <HospitalLocation/>
        </div>
      </div>
    </div>
  );
};

export default page;
