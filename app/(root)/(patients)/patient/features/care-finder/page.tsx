"use client";
import React, { useState } from "react";
import HospitalList from "@/components/shared/HospitalList";
import HospitalLocation from "@/components/shared/HospitalLocation";
import useGlobalStore from "@/zustand/useProps";

type Props = {
  propName: string;
};

const page = () => {
  const { searchCity } = useGlobalStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
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
