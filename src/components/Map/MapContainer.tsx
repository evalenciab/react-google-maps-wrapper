import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Map } from './Map';
import { Marker } from './Marker';

export const MapContainer = () => {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(2); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [locations, setLocations] = React.useState<google.maps.LatLngLiteral[]>([]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    console.log(e.latLng?.lat());
    console.log(e.latLng?.lng());
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  React.useEffect(() => {
    const _locations: google.maps.LatLngLiteral[] = [
      {
        lat: 24.266868462687945,
        lng: -102.2383455953467
      },
      {
        lat: 19.869926938836194,
        lng: -101.1836580953467
      },
      {
        lat: 30.958647390361385,
        lng: -95.7344393453467
      }
    ];
    setLocations(_locations);
  }, []);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={"AIzaSyCpuQGuswqIsj_-bkUYsGcZF_nHjB6cGr8"} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
        >
          {locations.map((location) => <Marker position={location}/>)}
        </Map>
      </Wrapper>
    </div>
  )
}
