import { Marker } from "react-naver-maps";

export const CustomMarker = ({
  latitude = 37.3595704,
  longitude = 127.105399,
}) => {
  const navermaps = window.naver.maps;
  const position = new navermaps.LatLng(latitude, longitude);

  return (
    <Marker
      position={position}
      onClick={() => console.log(1)}
      click={() => console.log(1)}
    />
  );
};
