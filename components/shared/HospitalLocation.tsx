import React from "react";
// import {
//   APIProvider,
//   Map,
//   MapCameraChangedEvent,
// } from "@vis.gl/react-google-maps";

const Key =
  process.env.REACT_APP_MAP_API_KEY ||
  "AIzaSyDu4BYAiI5YwgKcxGaoPxElCcbQZSy1OK8";

if (!Key) {
  console.log(
    "API key is missing. Please set REACT_APP_MAP_API_KEY in the environment."
  );
}

console.log("Api Key: ", Key);

const HospitalLocation = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full h-full flex flex-wrap justify-center items-center bg-red-200 border">
        {/* <APIProvider
          apiKey={"AIzaSyApdnBLqJeVW4c5t1Z32v8BzVBVWyJnY1g"}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log(
                "camera changed:",
                ev.detail.center,
                "zoom:",
                ev.detail.zoom
              )
            }
          ></Map>
        </APIProvider> */}
        <p> Map will be here.</p>
      </div>
    </div>
  );
};

export default HospitalLocation;
