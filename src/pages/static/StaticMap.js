import React from "react";

export default function StaticMap() {
  return (
    <div>
      <img
        alt="static map"
        src="https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=400&h=400&center=127.1054221,37.3591614&level=16&X-NCP-APIGW-API-KEY-ID=1m4n9csh9r"
      ></img>
    </div>
  );
}
