import React from "react";
import {
  ActivityIndicator,
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import mapMarkerImg from "../../assets/images/map-marker.png";
import useOrphanage from "./hooks/useOrphanages";

import styles from "./style";

export default function OrphanageDetails() {
  const { orphanage } = useOrphanage();

  function handleOpenGoogleMapRoute() {
    const googleLink = `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`;

    Linking.openURL(googleLink);
  }

  if (!orphanage) {
    return <ActivityIndicator style={styles.loading} size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(({ url }) => (
            <Image key={url} style={styles.image} source={{ uri: url }} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.routesContainer}
            onPress={handleOpenGoogleMapRoute}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instru????es para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              Segunda ?? Sexta {orphanage.opening_hours}
            </Text>
          </View>

          {orphanage.open_on_weekands ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                Atendemos fim de semana
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF6690" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                N??o atendemos fim de semana
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
