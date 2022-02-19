import React from "react";

export default function StaticMap() {
  const searchParams = new URLSearchParams(window.location.hash.split("?")[1]);
  const renderedLat = searchParams.get("lat") || 37.3591614;
  const renderedLng = searchParams.get("lng") || 127.1054221;

  return (
    <div>
      <img
        alt="static map"
        src={`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=400&h=150&center=${renderedLng},${renderedLat}&level=16&X-NCP-APIGW-API-KEY-ID=1m4n9csh9r`}
      ></img>
    </div>
  );
}
