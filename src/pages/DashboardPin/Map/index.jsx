import React, { useEffect, useState, useRef } from "react";
// import GoogleMapReact from "google-map-react";
import styleMap from "./styleMap";
import { FaCircle } from "react-icons/fa";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const MapKomponen = ({ data }) => {
	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const center = {
		lat: -6.2,
		lng: 106.816666,
	};
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyAvM9Ow4c24huLBdFS3dFw9byoNa-UkmfI",
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		// map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		<div className="relative h-full w-full  overflow-hidden">
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={7}
					onLoad={onLoad}
					onUnmount={onUnmount}
					options={{
						styles: styleMap.blueStyle,
						fullscreenControl: false,
						mapTypeControl: false,
						clickableIcons: false,
						controlSize: false,
					}}
				>
					<MarkerF
						key={1}
						position={{ lat: -6.2, lng: 106.816666 }}
					></MarkerF>
				</GoogleMap>
			)}
		</div>
	);
};

export default MapKomponen;
