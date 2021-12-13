/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { DATA } from "./data";
import "./Marker.css";

// import { CustomMarker } from "../../components/Marker";

export default function Main() {
  const { naver } = window;

  const mapRef = useRef();
  const [createdMap, setCreatdMap] = useState();
  const [center] = useState({
    position: { lat: 37.348159275838256, lng: 127.09817774825865 },
    zoom: 16,
  });
  const [data] = useState(DATA);

  useEffect(() => {
    const mapSetting = () => {
      // 지도 생성
      const mapOptions = {
        center: new naver.maps.LatLng(center.position.lat, center.position.lng),
        zoom: center.zoom,
        zoomControl: false,
      };

      const map = new naver.maps.Map("map", mapOptions);
      setCreatdMap(map);
    };

    mapSetting();
  }, []);

  useEffect(() => {
    const createMarkers = () => {
      const markers = [];

      data.forEach(({ id, name, geo }) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(geo.latitude, geo.longitude),
          map: createdMap,
          title: name,
          icon: {
            content: `<div class="marker-container">
                        <div class="marker-box">
                          <span class="marker-content">${name}</span>
                        </div>
                        <span class="marker-box-triangle"></span>
                        <div class="marker-circle"></div>
                      </div>`,
          },
        });

        markers.push(marker);

        naver.maps.Event.addListener(marker, "click", () => {
          console.log(id, name);

          window.postMessage("Wayne is coming again");
        });
      });
    };

    createMarkers();
  }, [createdMap, data]);

  return (
    <div>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}
