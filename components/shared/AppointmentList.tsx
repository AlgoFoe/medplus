import React, { useEffect, useState } from "react";

type Appointment = {
  _id: number;
  doctor: string;
  date: string;
  time: string;
  location: string;
};
interface AppointmentListProps {
  appointments: Appointment[];
  onCancelAppointment: (id: number) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onCancelAppointment,
}) => {
  const [currDate, setCurrDate] = useState(new Date());

  useEffect(() => {
    setCurrDate(new Date()); // Set the current date once the component mounts
  }, []);

  const calculateDaysLeft = (appointmentDate: string): number => {
    const appointment = new Date(appointmentDate);
    const timeDiff = appointment.getTime() - currDate.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  return (
    <div className="mx-auto mt-6 w-full">
      <h2 className="text-lg font-semibold mb-4 tracking-tight">
        Upcoming Appointments
      </h2>
      <ul className="space-y-5">
        {appointments.map((appointment) => {
          const daysLeft = calculateDaysLeft(appointment.date);
          return (
            <li
              key={appointment._id}
              className=" !bg-lblue bggrad p-4 border border-gray-300 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4"
            >
              {/* Left Section */}
              <div className="flex-1 space-y-3 px-2">
                <p className="text-lg font-bold text-gray-800">
                  📅 Date:{" "}
                  <span className="font-semibold">{appointment.date}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  🩺 Doctor:{" "}
                  <span className="font-semibold">{appointment.doctor}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  ⏰ Time:{" "}
                  <span className="font-semibold">{appointment.time}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  📍 Location:{" "}
                  <span className="font-semibold">{appointment.location}</span>
                </p>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-center space-y-4">
                {/* Circular Progress Indicator */}
                <div className="relative">
                  <svg className="w-16 h-16">
                    <circle
                      className="text-gray-300"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="24"
                      cx="32"
                      cy="32"
                    />
                    <circle
                      className={`${
                        daysLeft === 0 ? "text-red-500" : "text-green-500"
                      }`}
                      strokeWidth="4"
                      strokeDasharray={100}
                      strokeDashoffset={100 - (daysLeft / 30) * 100} // Assume 30 days max
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="24"
                      cx="32"
                      cy="32"
                    />
                  </svg>
                  <span className={`absolute inset-0 flex items-center justify-center font-semibold text-gray-800 text-xs`}>
                    {daysLeft === 0
                      ? "Today"
                      : daysLeft === 1
                      ? "1 d"
                      : `${daysLeft} d`}{" "}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="py-2 px-4 hover:bg-lblue hover:text-blue hover:border bg-blue text-white font-semibold rounded-lg shadow-md transition-colors duration-300 ease-in-out ">
                    Reschedule
                  </button>
                  <button
                    className="py-2 px-4 bg-red-500  hover:bg-lblue hover:text-red-500 hover:border text-white font-semibold rounded-lg shadow-md transition-colors duration-300 ease-in-out"
                    onClick={() => onCancelAppointment(appointment._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AppointmentList;
