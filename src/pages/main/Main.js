/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { DATA } from "./data";
import "./Marker.css";

export default function Main() {
  const { naver } = window;

  const mapRef = useRef();
  const [createdMap, setCreatdMap] = useState();
  const [center] = useState({
    position: { lat: 37.348159275838256, lng: 127.09817774825865 },
    zoom: 16,
  });
  const [data] = useState(DATA);

  const [clickedStation, setClickedStation] = useState({
    prev: null,
    current: null,
  });

  useEffect(() => {
    const mapSetting = () => {
      // 지도 생성
      const mapOptions = {
        center: new naver.maps.LatLng(center.position.lat, center.position.lng),
        zoom: center.zoom,
        zoomControl: false,
      };

      const map = new naver.maps.Map("map", mapOptions);
      naver.maps.Event.addListener(map, "click", () => {
        setClickedStation((prevState) => {
          const prevMarker = prevState.current;

          prevMarker &&
            prevMarker.setIcon({
              content: `<div class="marker-container">
            <div class="marker-box">
              <span class="marker-content">${prevMarker.title}</span>
            </div>
            <span class="marker-box-triangle"></span>
            <div class="marker-circle"></div>
          </div>`,
            });

          window.postMessage(
            JSON.stringify({ type: "MESSAGE", data: "MAP_IS_CLICKED" })
          );

          return {
            prev: prevMarker,
            current: null,
          };
        });
      });
      setCreatdMap(map);
      window.postMessage(
        JSON.stringify({ type: "MESSAGE", data: "MAP_IS_LOADED" })
      );
    };

    mapSetting();
  }, []);

  useEffect(() => {
    const createMarkers = () => {
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

        naver.maps.Event.addListener(marker, "click", () => {
          markerClick(marker, id);
        });
      });
    };

    createMarkers();
  }, [createdMap, data]);

  const markerClick = (marker, id) => {
    setClickedStation((prevState) => {
      const prevMarker = prevState.current;
      const currentMarker = marker;

      prevMarker &&
        prevMarker.setIcon({
          content: `<div class="marker-container">
      <div class="marker-box">
        <span class="marker-content">${marker.title}</span>
      </div>
      <span class="marker-box-triangle"></span>
      <div class="marker-circle"></div>
    </div>`,
        });

      currentMarker &&
        currentMarker.setIcon({
          content: `<div class="marker-container">
    <div class="marker-box marker-box-clicked">
      <span class="marker-content marker-content-clicked">${marker.title}</span>
    </div>
    <span class="marker-box-triangle marker-box-clicked"></span>
    <div class="marker-circle"></div>
  </div>`,
        });

      window.postMessage(
        JSON.stringify({ type: "MARKER_ID", data: id })
      );

      return {
        prev: prevMarker,
        current: currentMarker,
      };
    });
  };

  return (
    <div>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}
