/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import { useAutoCompletedSearch, useSearchMap } from "../../hooks/search";
import {
  extractSearchQuery,
  objToQueryString,
  zoomLevelToRadius,
} from "../../utils/search";
import "./Marker.css";

export default function Main() {
  const { naver } = window;

  const mapRef = useRef();
  const [createdMap, setCreatdMap] = useState();
  const [center] = useState({
    position: { lat: 37.348159275838256, lng: 127.09817774825865 },
    zoom: 16,
  });

  const [searchInputValue, setSearchInputValue] = useState("");
  const [showAutoCompletedList, setShowAutoCompletedList] = useState(false);

  const {
    reset,
    mutate: autoCompletedMutate,
    data: autoCompletedData,
    isSuccess: isAutoCompletedSuccess,
  } = useAutoCompletedSearch();

  const { mutate: searchMapMutate, data: searchMapData } = useSearchMap();

  useEffect(() => {
    reset();

    if (!searchInputValue || isAutoCompletedSuccess) {
      setShowAutoCompletedList(false);
      return;
    }

    const obj = extractSearchQuery(searchInputValue);
    const queryString = objToQueryString(obj);
    autoCompletedMutate(queryString);

    if (!showAutoCompletedList) {
      setShowAutoCompletedList(true);
    }
  }, [searchInputValue]);

  const handleSearch = (v, coordinates) => {
    if (!v) {
      return;
    }

    setSearchInputValue(v);
    setShowAutoCompletedList(false);

    const obj = extractSearchQuery(v);
    let queryString = objToQueryString(obj);

    // if (coordinates) {
    //   const [lng, lat] = coordinates;
    //   queryString += `&lat=${lat}&lng=${lng}`;
    // }

    const zoomLevel = createdMap.getZoom();
    const withRadius = `${queryString}&radius=${zoomLevelToRadius(zoomLevel)}`;
    console.log({ withRadius });
    searchMapMutate(withRadius);
  };

  useEffect(() => {
    const moveCenter = () => {
      if (searchMapData?.length > 0) {
        const [lng, lat] = searchMapData[0].location.coordinates;
        const firstDanjiLatLng = new naver.maps.LatLng(lat, lng);
        createdMap.setCenter(firstDanjiLatLng);
        createdMap.setZoom(16);
      }
    };

    moveCenter();
  }, [searchMapData]);

  useEffect(() => {
    const createMarkers = () => {
      // naver.maps.Event?.removeListener(createdMap, "idle");
      if (searchMapData?.length > 0) {
        const arr = [];
        searchMapData.forEach(
          ({ _id, danjiName, geo, location: { coordinates } }) => {
            const [lng, lat] = coordinates;

            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(lat, lng),
              map: createdMap,
              title: danjiName,
              icon: {
                content: `
                <div class="marker-container">
                  <div class="marker-box">
                    <span class="marker-content">${danjiName}</span>
                  </div>
                  <span class="marker-box-triangle"></span>
                  <div class="marker-circle"></div>
                </div>
              `,
              },
            });

            naver.maps.Event.addListener(marker, "click", () => {
              markerClick(marker, _id);
            });

            arr.push(marker);
          }
        );

        naver.maps.Event.addListener(createdMap, "idle", function () {
          updateMarkers(createdMap, arr);
        });
      }
    };

    createMarkers();
  }, [searchMapData]);

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
        minZoom: 12,
        maxZoom: 18,
      };

      const map = new naver.maps.Map("map", mapOptions);
      naver.maps.Event.addListener(map, "click", () => {
        setShowAutoCompletedList(false);
        setClickedStation((prevState) => {
          const prevMarker = prevState.current;

          prevMarker &&
            prevMarker.setIcon({
              content: `
                <div class="marker-container">
                  <div class="marker-box">
                    <div class="marker-content">${prevMarker.title}</div>
                  </div>
                  <span class="marker-box-triangle"></span>
                  <div class="marker-circle"></div>
                </div>
              `,
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

  const updateMarkers = (map, markers) => {
    const mapBounds = map.getBounds();
    let marker, position;

    for (let i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(map, marker);
      }
    }
  };

  const showMarker = (map, marker) => {
    if (marker.getMap()) return;
    marker.setMap(map);
  };

  const hideMarker = (map, marker) => {
    if (!marker.getMap()) return;
    marker.setMap(null);
  };

  const markerClick = (marker, id) => {
    setClickedStation((prevState) => {
      const prevMarker = prevState.current;
      const currentMarker = marker;

      if (prevMarker) {
        prevMarker.setIcon({
          content: `
            <div class="marker-container">
              <div class="marker-box">
                <div class="marker-content">${prevMarker.title}</div>
              </div>
              <span class="marker-box-triangle"></span>
              <div class="marker-circle"></div>
            </div>
          `,
        });
        prevMarker.setZIndex(100);
      }

      if (currentMarker) {
        currentMarker.setIcon({
          content: `
            <div class="marker-container">
              <div class="marker-box marker-box-clicked">
                <div class="marker-content marker-content-clicked">${marker.title}</div>
              </div>
              <span class="marker-box-triangle marker-box-clicked"></span>
              <div class="marker-circle"></div>
            </div>
          `,
        });

        currentMarker.setZIndex(1000);
      }

      window.postMessage(JSON.stringify({ type: "MARKER_ID", data: id }));

      return {
        prev: prevMarker,
        current: currentMarker,
      };
    });
  };

  return (
    <div>
      <SearchInput
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        autoCompletedData={autoCompletedData}
        showAutoCompletedList={showAutoCompletedList}
        setShowAutoCompletedList={setShowAutoCompletedList}
        handleSearch={handleSearch}
      />
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
}
