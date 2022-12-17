import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import styles from "./style";

type IPageHeaderProps = {
  title: string;
  showCancel?: boolean;
};

const PageHeader: React.FC<IPageHeaderProps> = ({
  title,
  showCancel = true,
}) => {
  const navigation = useNavigation();

  function handleNavigationBack() {
    navigation.goBack();
  }

  function handleNavigationToBegin() {
    navigation.navigate("OrphanageMap" as never);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleNavigationBack}>
        <Feather name="arrow-left" size={24} color="#15bcd6" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <TouchableOpacity activeOpacity={0.8} onPress={handleNavigationToBegin}>
          <Feather name="x" size={24} color="#ff669D" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default PageHeader;
