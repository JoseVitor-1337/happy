import { ActivityIndicator, View, Text, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import mapMarker from "../../assets/images/map-marker.png";
import useOrphanages from "./hooks/useOrphanages";
import useGetUserCurrentLocation from "../../hooks/useGetUserCurrentLocation";
import { IRouterParams } from "../../Routes";

import styles from "./style";

type INavigationScreenProps = NativeStackNavigationProp<
  IRouterParams,
  "OrphanagesMap"
>;

export default function OrphanagesMap() {
  const { navigate } = useNavigation<INavigationScreenProps>();
  const { orphanages } = useOrphanages();
  const { coordinates, loadingCoordinates } = useGetUserCurrentLocation();

  function handleNavigateToOrphanageDetails(id: number) {
    navigate("OrphanageDetails", {
      id,
    });
  }

  function handleNavigateToCreateOrphanage() {
    navigate("SelectMapPosition");
  }

  if (loadingCoordinates) {
    <ActivityIndicator style={styles.loading} size="large" />;
  }

  if (!coordinates) return null;

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
        {orphanages.map(({ id, latitude, longitude, name }) => (
          <Marker
            key={id}
            icon={mapMarker}
            calloutAnchor={{
              x: 0.6,
              y: -0.15,
            }}
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToOrphanageDetails(id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{name}</Text>
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
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
