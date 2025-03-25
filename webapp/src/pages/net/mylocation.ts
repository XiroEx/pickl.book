export const handleMyLocation = (center: any, map: any, setUserLocation? : any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            const newCenter = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            
            if (Math.round(center.lat * 1e7) === Math.round(newCenter.lat * 1e7) && 
                Math.round(center.lng * 1e7) === Math.round(newCenter.lng * 1e7)) {
                if (map.getZoom() === 14)
                    map.setZoom(16);
                else map.setZoom(14);
            } else {
                map.panTo(newCenter);
                setUserLocation(newCenter);
            }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };