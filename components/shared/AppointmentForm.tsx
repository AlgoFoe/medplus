import React, { useEffect, useState } from "react";

type Appointment = {
  _id: number;
  doctor: string;
  date: string;
  time: string;
  location: string;
  hospital: string;
};

interface AppointmentModalProps {
  onAddAppointment: (appointment: Appointment) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  onAddAppointment,
  isOpen,
  onClose,
}) => {
  const [isOpenStatus, setIsOpenStatus] = useState(true);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onClose() : null;

    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Doctor : ",
      doctor,
      " Date : ",
      date,
      " Time : ",
      time,
      " Location : ",
      location,
      " hospital : ",
      hospital
    );
    if (doctor && date && time && location && hospital) {
      const newAppointment: Appointment = {
        _id: 10,
        doctor,
        date,
        time,
        location,
        hospital,
      };
      onAddAppointment(newAppointment);
      setDoctor("");
      setDate("");
      setTime("");
      setLocation("");
      setHospital("");
      onClose();
      setIsOpenStatus(false);
    }
  };

  if (!isOpen) return null; // Avoid rendering when modal is closed
  return (
    <>
      {/* Modal */}
      {isOpenStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg rounded-xl max-w-lg w-full mx-4">
            {/* Close Button */}
            <button
              onClick={() => onClose()}
              className="absolute text-black hover:text-gray-700 transition z-40 hover:scale-125 ease-in-out sm:top-[6%] sm:left-[65%] md:left-[65%] hover:rotate-180 duration-300 text-xl"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Book an Appointment
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-6 text-white">
              <div className="grid gap-6">
             
                <div className="relative">
                  <label
                    htmlFor="doctor"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Doctor
                  </label>
                  <div className="relative">
                    <input
                      id="doctor"
                      type="text"
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      placeholder="Enter doctor's name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      required
                    />
                    <span className="absolute top-3 right-3 text-gray-400">
                      🩺
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      required
                    />
                    <span className="absolute top-3 right-3 text-gray-400">
                      📍
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="hospital"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Hospital Name
                  </label>
                  <div className="relative">
                    <input
                      id="hospital"
                      type="text"
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      placeholder="Enter hospital name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      required
                    />
                    <span className="absolute top-3 right-3 text-gray-400">
                      🏥
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 rounded-lg shadow-md hover:shadow-lg transition-all  bg-blue text-white hover:text-blue hover:bg-white hover:border duration-500 ease-in-out "
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentModal;
