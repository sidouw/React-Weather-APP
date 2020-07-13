import React,{useState} from 'react'
import ReactMapGL from "react-map-gl";
        
const AreaMap = ({long,lat})=>{
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: "60vw",
        height: "60vh",
        zoom: 10
      });
    return (
        <div className="map">
        <h2 className="map__Title">Map of the area</h2>
        <ReactMapGL className ='map__Frame'
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1Ijoic2lkb3V3IiwiYSI6ImNrNjhlM2o5cjAzeGczbXBtc21ia21wYnUifQ.D4oF_WIvlWhdKa4r98kEGg'}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
    
      </ReactMapGL>
        
        </div>
    )
}


export default AreaMap