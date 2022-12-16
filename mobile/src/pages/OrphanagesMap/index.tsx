import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import mapMarker from "../../assets/images/map-marker.png";
import useOrphanages from "./hooks/useOrphanages";
import useGetUserCurrentLocation from "../../hooks/useGetUserCurrentLocation";
import styles from "./style";

export default function OrphanagesMap() {
  const { navigate } = useNavigation();
  const { orphanages } = useOrphanages();
  const { coordinates } = useGetUserCurrentLocation();

  function handleNavigateToOrphanageDetails() {
    navigate("OrphanageDetails" as never);
  }

  return (
    <View style={styles.container}>
      <MapView
        region={coordinates}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 0.6,
              y: -0.15,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.createOrphanageButton}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
