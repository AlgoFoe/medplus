"use client";
import React, { useState } from "react";

interface Hospital {
  _id: number;
  name: string;
  address: string;
  pincode: string;
}

const hospitals: Hospital[] = [
  {
    _id: 1,
    name: "Tejnaksh Healthcares Institute Of Urology",
    address: "Sakri Road",
    pincode: "424001",
  },
  {
    _id: 2,
    name: "Yash Kidney Care Center",
    address: "Plot No. 6/640, Opp. Hotel Ganpati Palace, Malegaon Road",
    pincode: "424001",
  },
  {
    _id: 3,
    name: "Yash Kidney Care Center",
    address: "Plot No. 6/640, Opp. Hotel Ganpati Palace, Malegaon Road",
    pincode: "424001",
  },
  {
    _id: 4,
    name: "Yash Kidney Care Center",
    address: "Plot No. 6/640, Opp. Hotel Ganpati Palace, Malegaon Road",
    pincode: "424001",
  },
  {
    _id: 5,
    name: "Yash Kidney Care Center",
    address: "Plot No. 6/640, Opp. Hotel Ganpati Palace, Malegaon Road",
    pincode: "424001",
  },
  {
    _id: 6,
    name: "Yash Kidney Care Center",
    address: "Plot No. 6/640, Opp. Hotel Ganpati Palace, Malegaon Road",
    pincode: "424001",
  },
];

const HospitalList: React.FC = () => {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

  const toggleCheckbox = (index: number) => {
    setCheckedIndex(checkedIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full h-full flex flex-col items-center">
        <h2 className="text-lg font-semibold w-full text-center p-2">
          We found {hospitals.length} results, all hospitals are cashless
        </h2>
        <div className="flex space-x-4 overflow-x-auto w-full p-4">
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="p-4 w-28 min-w-[250px] sm:min-w-[300px] md:min-w-[400px] rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-shadow duration-300 flex-shrink-0 space-y-3 bg-gradient-to-br from-lblue to-blue border border-gray-200"
            >
              {/* Checkbox */}
              <label className="flex items-center cursor-pointer space-x-3 float-right">
                <input
                  type="checkbox"
                  checked={checkedIndex === index}
                  onChange={() => toggleCheckbox(index)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 border-2 rounded-md ${
                    checkedIndex === index
                      ? "bg-green-600 border-green-600"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {checkedIndex === index && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 5.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </label>

              {/* Pincode */}
              <p className="text-sm text-gray-500 font-medium">
                <span className="text-gray-700 font-semibold">Pincode :</span>{" "}
                {hospital.pincode}
              </p>

              {/* Hospital Name */}
              <h3 className="text-lg font-bold text-gray-800 leading-tight">
                {hospital.name}
              </h3>

              {/* Address */}
              <p className="text-sm text-gray-600">{hospital.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
