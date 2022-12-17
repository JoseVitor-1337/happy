import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

type ICoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type IUserPermission = "granted" | "undetermined" | "denied" | "access_granted";

export default function useGetUserCurrentLocation() {
  const [coordinates, setCoordinates] = useState<ICoordinates | undefined>();
  const [loadingCoordinates, setLoadingCoordinates] = useState(true);
  const [userPermission, setUserPermission] =
    useState<IUserPermission>("denied");

  useEffect(() => {
    async function loadAsyncFunction() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "denied") {
        Alert.alert(
          "Você não deu permissão para accessar sua localidade no mapa."
        );
      }

      setUserPermission(status);
    }

    loadAsyncFunction();
  }, []);

  useEffect(() => {
    async function loadAsyncFunction() {
      setUserPermission("access_granted");

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 100000,
        });

        const { latitude, longitude } = location.coords;

        setCoordinates({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });
      } catch (error) {
        console.error("error", error);
      }

      setLoadingCoordinates(false);
    }

    if (userPermission !== "denied") loadAsyncFunction();
  }, [userPermission]);

  return { coordinates, loadingCoordinates };
}
