import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { apiLocationDeviceStatusTotalSummary } from "../../services/api";

// Import the correct type for the 'google' prop
import { GoogleApiWrapperProps } from "google-maps-react";

interface MapPageProps extends GoogleApiWrapperProps {
  // Your additional props, if any
}

const MapPage: React.FC<MapPageProps> = (props) => {
  const [activeMarker, setActiveMarker] = useState<any>({});
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [markers, setMarkers] = useState<Array<any>>([{ lat: 0, lng: 0 }]);
  const [showingInfoWindow, setShowingInfoWindow] = useState<boolean>(false);

  useEffect(() => {
    doLoadDeviceReady();
  }, []);

  const doLoadDeviceReady = () => {
    apiLocationDeviceStatusTotalSummary()
      .then((res) => {
        console.log("res: ", res);
        console.log("data: ", res.data);
        console.log("status: ", res.status);
        console.log("records: ", res.data?.records); // Use optional chaining
        if (res.status === 200 && res.data?.records.length > 0) {
          var temp = res.data.records;
          console.log("data temp: ", temp);
          var markerlatLang = [];
          for (var i = 0; i < temp.length; i++) {
            markerlatLang.push({
              lat: temp[i].lat,
              lng: temp[i].long,
              offline: temp[i].offline,
              online: temp[i].online,
              damage: temp[i].damage,
              name: temp[i].location,
            });
          }
          console.log("data lang: ", markerlatLang);
          setMarkers(markerlatLang);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMarkerClick = (props: any, marker: any, e: any) => {
    console.log("PROPS", props);
    console.log("MARKER", marker);
    console.log("E", e);
    setActiveMarker(marker);
    setSelectedPlace(props.position);
    setShowingInfoWindow(true);
  };

  const jabodetabekBounds = {
    north: -5.9055,
    south: -6.4714,
    east: 107.2186,
    west: 106.4383,
  };

  const indonesiaBounds = {
    north: 6,
    south: -11,
    east: 95,
    west: 141,
  };

  const indonesiaCoords = {
    lat: (indonesiaBounds.north + indonesiaBounds.south) / 2,
    lng: (indonesiaBounds.east + indonesiaBounds.west) / 2,
  };
  const jabodetabekCoords = {
    lat: (jabodetabekBounds.north + jabodetabekBounds.south) / 2,
    lng: (jabodetabekBounds.east + jabodetabekBounds.west) / 2,
  };
  

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold">Peta Lokasi Lemasmil</h3>
      </div>
      <div>
        <div>
          <div xs={12}>
            <div
              style={{
                width: "100%",
                height: "100vh",
                position : 'relative',
              }}
            >
              <Map
                google={props.google}
                zoom={5}
                disableDefaultUI={true}
                initialCenter={indonesiaCoords}
                style={{
                  width: "100%",
                  minHeight: "80vh",
                  position : 'absolut',
                }}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    icon={{}}
                    position={{
                      lat: marker.lat,
                      lng: marker.lng,
                      online: marker.online,
                      offline: marker.offline,
                      damage: marker.damage,
                      nama: marker.name,
                    }}
                    onClick={onMarkerClick}
                  />
                ))}
                {showingInfoWindow && (
                  <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                    <div>
                      <div className="w-full flex justify-between gap-4">
                        <div className="w-1/2">
                          <h5>Location Name</h5>
                        </div>
                        <div className="w-1/2 font-semibold">
                          {selectedPlace.nama}
                        </div>
                      </div>
                      <div className="w-full flex justify-between gap-4 text-xs">
                        <div className="w-1/2">
                          <h5>Kamera NonAktif</h5>
                        </div>
                        <div className="w-1/2">
                          {selectedPlace.offline}
                        </div>
                      </div>
                      <div className="w-full flex justify-between gap-4 text-xs">
                        <div className="w-1/2">
                          <h5>Kamera Rusak</h5>
                        </div>
                        <div className="w-1/2">
                          {selectedPlace.damage}
                        </div>
                      </div>
                      <div className="w-full flex justify-between gap-4 text-xs">
                        <div className="w-1/2">
                          <h5>Kamera Aktif</h5>
                        </div>
                        <div className="w-1/2">
                          {selectedPlace.online}
                        </div>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default GoogleApiWrapper({
  apiKey: "AIzaSyAvM9Ow4c24huLBdFS3dFw9byoNa-UkmfI",
})(MapPage);
