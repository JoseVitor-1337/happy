import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ScrollView,
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import api from "../../../services/api";
import { IRouterParams } from "../../../Routes";

import styles from "./style";

type IRouteParamsList = {
  position: {
    latitude: number;
    longitude: number;
  };
};

type INavigationScreenProps = NativeStackNavigationProp<
  IRouterParams,
  "OrphanagesMap"
>;

export default function OrphanageForm() {
  const { navigate } = useNavigation<INavigationScreenProps>();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHous] = useState("");
  const [open_on_weekands, setOpenOnWeekands] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const reuter = useRoute();

  const params = reuter.params as IRouteParamsList;

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      return Alert.alert("Eita, pricesamos de acesso ás suas fotos");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      aspect: [4, 4],
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.canceled) return;

    const url = result.assets[0].uri;

    if (url) setImages([...images, url]);
  }

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekands", String(open_on_weekands));

    images.forEach((image, index) => {
      data.append("images", {
        type: "image/jpg",
        name: `image_${index}.jpg`,
        uri: image,
      } as any);
    });

    try {
      const response = await api.post("/orphanages", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Alert.alert("Orfanato criado com sucesso");

        navigate("OrphanagesMap");
      }
    } catch (error) {
      Alert.alert("Erro ao criar um orfanato");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Fotos</Text>

      <ScrollView horizontal style={styles.uploadedImageContainer}>
        {images.map((image) => (
          <Image
            key={image}
            source={{ uri: image }}
            style={styles.uploadedImage}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.imagesInput}
        onPress={handleSelectImages}
      >
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horário de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHous}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={open_on_weekands}
          onValueChange={setOpenOnWeekands}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.nextButton}
        onPress={handleCreateOrphanage}
      >
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
