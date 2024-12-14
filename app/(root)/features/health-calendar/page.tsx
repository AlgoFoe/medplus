"use client";
import React, { useEffect, useState } from "react";
import AppointmentForm from "@/components/shared/AppointmentForm";
import AppointmentList from "@/components/shared/AppointmentList";

type Appointment = {
  _id: number;
  doctor: string;
  date: string;
  time: string;
  location: string;
  hospital: string;
};

const appointmentsArray = [
  {
    _id: 1,
    doctor: "Dr.Yogi",
    date: new Date().toLocaleDateString(),
    time: "10:11",
    location: "nagpur",
    hospital: "AIIMS",
  },
  {
    _id: 2,
    doctor: "Jhon",
    date: new Date().toLocaleDateString(),
    time: "10:11",
    location: "Los Angels",
    hospital: "AIIMS",
  },
  {
    _id: 3,
    doctor: "Sufi",
    date: new Date().toLocaleDateString(),
    time: "10:11",
    location: "Dehradun",
    hospital: "AIIMS",
  },
  {
    _id: 4,
    doctor: "Sufi",
    date: new Date().toLocaleDateString(),
    time: "10:11",
    location: "Dehradun",
    hospital: "AIIMS",
  },
  {
    _id: 5,
    doctor: "Sufi",
    date: new Date().toLocaleDateString(),
    time: "10:11",
    location: "Dehradun",
    hospital: "AIIMS",
  },
  {
    _id: 6,
    doctor: "Sufi",
    date: new Date().toLocaleDateString(),
    time: "10:11",
    location: "Dehradun",
    hospital: "AIIMS",
  },
];

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookingStatus, setBookingStatus] = useState(false);

  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  const handleBooking = () => {
    setBookingStatus(true);
  };

  const handleCancelAppointment = (_id: number) => {
    // Filter out the appointment to be cancelled
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== _id)
    );
  };

  useEffect(() => {
    setAppointments(appointmentsArray);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Log updated appointments state after it changes
  useEffect(() => {
    console.log(appointments); // Logs appointments whenever it changes
  }, [appointments]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 p-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Health Calendar</h1>
          <p className="text-muted-foreground">
            Your next appointment is just a click away—let's make your health
            a priority!
          </p>
        </div>

        <div className="flex bg-background py-4 px-5 rounded-md border shadow-xl">
          <button
            className="text-xl font-bold tracking-tight bg-blue px-3 py-1 rounded-md text-white hover:text-blue hover:bg-white hover:border-2 transition-colors duration-500 ease-in-out"
            onClick={handleBooking}
          >
            Book your Appointment
          </button>
        </div>
      </div>
      <div className="gap-2">
        <div className="p-6 min-h-screen justify-between w-full">
          <div
            className={`flex flex-wrap ${
              bookingStatus ? "w-full" : "border-none bg-transparent w-0"
            }`}
          >
            {bookingStatus && (
              <AppointmentForm
                onAddAppointment={handleAddAppointment}
                isOpen={bookingStatus}
                onClose={() => setBookingStatus(false)}
              />
            )}
          </div>
          <div className="gap-5 w-full">
            <AppointmentList appointments={appointments} onCancelAppointment={handleCancelAppointment}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
