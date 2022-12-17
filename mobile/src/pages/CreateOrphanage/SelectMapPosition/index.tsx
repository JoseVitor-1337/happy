import React, { useState } from "react";
import { ActivityIndicator, View, TouchableOpacity, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

import mapMarkerImg from "../../../assets/images/map-marker.png";
import useGetUserCurrentLocation from "../../../hooks/useGetUserCurrentLocation";
import { IRouterParams } from "../../../Routes";

import styles from "./style";

type INavigationScreenProps = NativeStackNavigationProp<
  IRouterParams,
  "OrphanageForm"
>;

export default function SelectMapPosition() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const navigation = useNavigation<INavigationScreenProps>();

  const { coordinates, loadingCoordinates } = useGetUserCurrentLocation();

  function handleNextStep() {
    navigation.navigate("OrphanageForm", { position });
  }

  function handleSelectMapPosition(event: MapPressEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  if (!coordinates || loadingCoordinates) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        onPress={handleSelectMapPosition}
        style={styles.mapStyle}
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {position.latitude !== 0 && (
          <Marker icon={mapMarkerImg} coordinate={position} />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.nextButton}
          onPress={handleNextStep}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
