import { GoogleMap, LoadScript, HeatmapLayer, Marker, Libraries } from "@react-google-maps/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { handleMyLocation } from "./mylocation";
import pulseIcon from '../../assets/pulse.gif';
import * as map1 from "../../utils/samples/map1.json";
import * as map2 from "../../utils/samples/map2.json";
import * as map3 from "../../utils/samples/map3.json";
/* import { useHeatmapData } from "./useHeatmapData"; */

const mapContainerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 40.7128, lng: -74.0060, zoom: 12 };

export default function Map() {
    const [center, setCenter] = useState(defaultCenter);
    const [mapOptions, setMapOptions]: any = useState({});
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [maps, setMaps]: any = useState(null);
    //const [radius, setRadius] = useState(10);
    const mapRef: any = useRef(null);
    const [heatmapData, setHeatmapData]: any = useState([]);

    /* const { heatmapData, loading, error } = useHeatmapData({ center, radius }); */

    let centerTimer: any

    // Update Center When Map Moves
    const onCenterChanged = useCallback(() => {
        if (mapRef.current) {
            if (centerTimer) {
                clearTimeout(centerTimer);
            }
            centerTimer = setTimeout(() => {
                const map = mapRef.current;
                const center = map.getCenter();
                setCenter({ lat: center.lat(), lng: center.lng(), zoom: map.getZoom() });
            }, 100);
        }
    }, []);

    useEffect(() => {
        loadRandomMapData();
        const interval = setInterval(() => {
            loadRandomMapData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

    }, [userLocation]);

    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to retrieve your location.");
                }
                );
            }
            });
        }
    }, []);


    const loadRandomMapData = async () => {
        const maps = [map1, map2, map3];
        let randomMap;
        do {
            randomMap = maps[Math.floor(Math.random() * maps.length)];
        } while (randomMap === mapOptions.styles);
        setMapOptions({ styles: (randomMap as any).default });
    };
    
    function getPoints(center: any = defaultCenter) {
        const points = Array.from({ length: 100 }, () => {
            const lat = 40.7128 + (Math.random() - 0.5) * 0.02;
            const lng = -74.0060 + (Math.random() - 0.5) * 0.02;
            return new google.maps.LatLng(lat, lng);
        });
        console.log(points);
        setHeatmapData(points);
    }
    
    /*  if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>; */

    return (<div className="h-full">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY! as string} libraries={libraries} onLoad={getPoints}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={center.zoom}
                onCenterChanged={onCenterChanged}
                onLoad={(map) => {
                    mapRef.current = map;
                }}
                ref={mapRef}
                clickableIcons={false}
                options={{...mapOptions, disableDefaultUI: true, keyboardShortcuts: false}}
                
            >
                {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} onLoad={getPoints}/>}
                <button onClick={()=>handleMyLocation(center, mapRef.current, setUserLocation)} 
                className="bg-[var(--primary-color)] absolute bottom-2 right-0 m-2 p-3 text-white rounded-full">
                    {locationIcon}
                </button>
                {navigator.geolocation && window.google?.maps?.Size && <Marker position={userLocation} icon={{
                    url: "https://media.tenor.com/yjOrdcOkLPUAAAAj/green-dot.gif",
                    scaledSize: new window.google.maps.Size(32, 32, 'px', 'px'),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(16, 16),
                }}/>}
            </GoogleMap>
        </LoadScript>
    </div>
    );
}

const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z"/></svg>

const libraries: Libraries = ["visualization"];