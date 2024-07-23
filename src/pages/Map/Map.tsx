import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import IndoorMap from "../../components/IndoorMap";
import BuildingMap from "../../components/BuildingMap";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const MapPage = () => {
  const [activeMarker, setActiveMarker] = useState<any>({});
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [markers, setMarkers] = useState<Array<any>>([{ lat: 0, lng: 0 }]);
  const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>("Ruangan 101");

  const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

  const fadeInStyle = {
    animationName: "fadeIn",
    animationDuration: "1000ms", // Define the animation duration here
  };
  return (
    <div style={{ ...fadeInStyle }} className="px-4 ">
      <BuildingMap />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAvM9Ow4c24huLBdFS3dFw9byoNa-UkmfI",
})(MapPage);
