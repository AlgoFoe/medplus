"use client";
import React, { useCallback, useEffect, useState } from "react";
import HospitalList from "@/components/shared/HospitalList";
import HospitalLocation from "@/components/shared/HospitalLocation";
import useGlobalStore from "@/zustand/useProps";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { debounce } from "lodash";
import { DNA } from "react-loader-spinner";

interface Hospital {
  place_id: number;
  lat: string;
  lon: string;
  name: string;
  display_name: string;
}

async function searchHospitals(searchCity: string): Promise<Hospital[]> {
  const response = await fetch(
    `/api/hospital-location?q=${searchCity}`
  );
  if (!response.ok) {
    throw new Error("Internal error");
  }
  return response.json();
}

const CareFinderPage = () => {
  const {
    searchCity,
    setSearchCity,
    latitude,
    longitude,
    setLatitude,
    setLongitude,checkedIndex,setCheckedIndex
  } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const debouncedGetHospitals = useCallback(
    debounce(async (city: string) => {
      setIsLoading(true);
      try {
        const results = await searchHospitals(city);
        setHospitals(results);
        setLatitude(parseFloat(results[0].lat));
        setLongitude(parseFloat(results[0].lon));
        setCheckedIndex(results[0].place_id);
      } catch (error) {
        console.error("Error loading hospitals", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const fetchCityAndHospitals = async () => {
      if (!searchCity) {
        const city = await getCurrentCity();
        if (city) {
          setSearchCity(city);
        }
      } else {
        debouncedGetHospitals(searchCity);
      }
    };

    fetchCityAndHospitals();
  }, [searchCity, debouncedGetHospitals, setSearchCity]);

 
  async function getCurrentCity(): Promise<string | null> {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Use reverse geocoding to fetch city name
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
            try {
              const response = await fetch(url);
              const data = await response.json();
              const city =
                data.address.city || data.address.town || data.address.village;
              resolve(city);
            } catch (error) {
              resolve(null);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            resolve(null);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        resolve(null);
      }
    });
  }

  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div className="mx-auto flex flex-wrap justify-center">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{ filter: "hue-rotate(180deg)" }}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="w-full ">
            <HospitalList hospitals={hospitals} />
          </div>
          {latitude && longitude && (

            <div className="w-full">
            <div className="relative p-5 overflow-hidden flex flex-wrap justify-center rounded-lg">
              <HospitalLocation latitude={latitude as number} longitude={longitude as number} placeId={checkedIndex as number}/> 
            </div>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareFinderPage;
