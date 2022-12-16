import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

type ICoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function useGetUserCurrentLocation() {
  const [coordinates, setCoordinates] = useState<ICoordinates | undefined>();

  useEffect(() => {
    async function loadAsyncFunction() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permissão para acessar sua localidade fou negada.");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setCoordinates({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });
      }
    }

    loadAsyncFunction();
  }, []);

  return { coordinates };
}
