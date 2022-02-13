/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import DanjiListBottomSheet from "./DanjiListBottomSheet";
import { useAutoCompletedSearch, useSearchMap } from "../../hooks/search";
import {
  extractSearchQuery,
  objToQueryString,
  zoomLevelToRadius,
} from "../../utils/search";
import "./Marker.css";

export default function Main() {
  const { naver, MarkerClustering, N } = window;

  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("query");
  const renderedLat = searchParams.get("lat") || 37.348159275838256;
  const renderedLng = searchParams.get("lng") || 127.09817774825865;

  const mapRef = useRef();
  const [createdMap, setCreatdMap] = useState();

  const [searchInputValue, setSearchInputValue] = useState(query);
  const [showAutoCompletedList, setShowAutoCompletedList] = useState(false);

  const {
    reset,
    mutate: autoCompletedMutate,
    data: autoCompletedData,
    isSuccess: isAutoCompletedSuccess,
  } = useAutoCompletedSearch();

  const { mutate: searchMapMutate, data: searchMapData } = useSearchMap();

  useEffect(() => {
    const mapSetting = () => {
      // 지도 생성
      const mapOptions = {
        center: new naver.maps.LatLng(renderedLat, renderedLng),
        zoom: 16,
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

          setShowBottomSheet(true);
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
    if (createdMap) {
      handleSearch(query, [renderedLng, renderedLat]);
      console.log("설마 계속 렌더되니?");
    }
  }, [createdMap]);

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

    if (coordinates) {
      const [lng, lat] = coordinates;
      queryString += `&lat=${lat}&lng=${lng}`;
    }

    const zoomLevel = createdMap.getZoom();
    const withRadius = `${queryString}&radius=${zoomLevelToRadius(zoomLevel)}`;
    searchMapMutate(withRadius);
  };

  useEffect(() => {
    const createMarkers = () => {
      if (searchMapData?.length > 0) {
        const markers = [];

        searchMapData.forEach(
          ({ _id, danjiName, geo, location: { coordinates } }) => {
            const [lng, lat] = coordinates;

            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(lat, lng),
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
              size: new naver.maps.Size(38, 58),
              anchor: new naver.maps.Point(19, 58),
            });

            marker.getElement().className = "naver-marker-container";

            naver.maps.Event.addListener(marker, "click", () => {
              markerClick(marker, _id);
            });

            markers.push(marker);
          }
        );

        const clusterMarker = {
          content: `
              <div class="cluster-box">
                <svg width="63" height="57" viewBox="0 0 63 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H53C55.6522 0 58.1957 1.0422 60.0711 2.89732C61.9464 4.75244 63 7.26852 63 9.89205V33.633C63 36.2565 61.9464 38.7726 60.0711 40.6277C58.1957 42.4828 55.6522 43.525 53 43.525H27.887L15.107 57L10 43.525C7.34784 43.525 4.8043 42.4828 2.92893 40.6277C1.05357 38.7726 0 36.2565 0 33.633L0 9.89205C0 7.26852 1.05357 4.75244 2.92893 2.89732C4.8043 1.0422 7.34784 0 10 0V0Z" fill="#0F76EE"/>
                </svg>
                <div class="cluster-count"></div>
              </div>
            `,
          size: N.Size(63, 57),
          anchor: N.Point(20, 20),
        };

        const markerClustering = new MarkerClustering({
          minClusterSize: 5,
          maxZoom: 18,
          map: createdMap,
          markers,
          disableClickZoom: false,
          gridSize: 240,
          icons: [
            clusterMarker,
            clusterMarker,
            clusterMarker,
            clusterMarker,
            clusterMarker,
            clusterMarker,
            clusterMarker,
          ],
          indexGenerator: [50, 100, 200, 500, 1000, 2000, 3000],
          stylingFunction: (clusterMarker, count) => {
            const text =
              clusterMarker.getElement().children[0].children[0].children[1];
            text.innerHTML = count;
          },
        });
      }
    };

    createMarkers();
  }, [searchMapData]);

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

  const [clickedStation, setClickedStation] = useState({
    prev: null,
    current: null,
  });

  const [showBottomSheet, setShowBottomSheet] = useState(true);

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
      setShowBottomSheet(false);

      return {
        prev: prevMarker,
        current: currentMarker,
      };
    });
  };

  return (
    <div>
      {showBottomSheet && (
        <DanjiListBottomSheet searchMapData={searchMapData} />
      )}
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
