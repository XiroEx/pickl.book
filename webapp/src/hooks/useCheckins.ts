import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, GeoPoint, getFirestore } from "firebase/firestore";
import { GeoFirestore } from "geofirestore";
import { useMemo } from "react";

const RADIUS_MILES = 0.5;
const RADIUS_KM = RADIUS_MILES * 1.60934; // Convert miles to km for geofirestore

export const useCheckins = (lat: number, lng: number) => {
  const db: any = getFirestore();
  const geoFirestore = new GeoFirestore(db);
  console.log(geoFirestore)
  const geoCollection = geoFirestore.collection("checkins");

  // Create a geo query for check-ins within 0.5 miles
  const geoQuery: any = useMemo(() => geoCollection.near({ center: new GeoPoint(lat, lng), radius: RADIUS_KM }), [lat, lng]);

  // Use Firebase hooks for real-time updates
  const [checkins, loading, error] = useCollectionData(geoQuery);

  return { checkins, loading, error };
};