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
    
    function getPoints(center: google.maps.LatLng) {
        const updatedHeatmapData = [...heatmapData];
        const existingPoint = updatedHeatmapData.find(
            (point) => point.location.lat() === center.lat() && point.location.lng() === center.lng()
        );

        if (existingPoint) {
            // Increase weight up to a maximum value (e.g., 10)
            existingPoint.weight = existingPoint.weight + 1;
        } else {
            // Add a new point with an initial weight of 1
            updatedHeatmapData.push({ location: center, weight: 1});
        }

        setHeatmapData(updatedHeatmapData);
        console.log(updatedHeatmapData);
    }

    const checkIn = () => {
        const location = new google.maps.LatLng(userLocation.lat, userLocation.lng);
        getPoints(location);
    };
    
    /*  if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>; */

    return (<div className="h-full">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY! as string} libraries={libraries}>
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
                {heatmapData.length > 0 && <HeatmapLayer options={{radius: 40}} data={heatmapData.map((point: any) => (
                    { location: point.location, weight: (point.weight/5), }
                ))} />}
                <button onClick={()=>handleMyLocation(center, mapRef.current, setUserLocation)} 
                className="bg-[var(--primary-color)] absolute bottom-4 right-0 m-2 p-3 text-white rounded-full">
                    {locationIcon}
                </button>
                <button onClick={()=>checkIn()} 
                className="bg-[var(--primary-color)] absolute bottom-4 left-0 m-2 p-3 text-white rounded-full">
                    {checkInIcon}
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

const checkInIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF"><path d="M519-82v-80q42-6 81.5-23t74.5-43l58 58q-47 37-101 59.5T519-82Zm270-146-56-56q26-33 42-72.5t22-83.5h82q-8 62-30.5 115.5T789-228Zm8-292q-6-45-22-84.5T733-676l56-56q38 44 61.5 98T879-520h-82ZM439-82q-153-18-255.5-131T81-480q0-155 102.5-268T439-878v80q-120 17-199 107t-79 211q0 121 79 210.5T439-162v80Zm238-650q-36-27-76-44t-82-22v-80q59 5 113 27.5T733-790l-56 58ZM480-280q-58-49-109-105t-51-131q0-68 46.5-116T480-680q67 0 113.5 48T640-516q0 75-51 131T480-280Zm0-200q18 0 30.5-12.5T523-523q0-17-12.5-30T480-566q-18 0-30.5 13T437-523q0 18 12.5 30.5T480-480Z"/></svg>

const libraries: Libraries = ["visualization"];