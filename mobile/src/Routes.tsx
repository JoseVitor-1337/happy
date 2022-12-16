import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanagesDetails from "./pages/OrphanagesDetails";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen name="OrphanageDetails" component={OrphanagesDetails} />
      </Navigator>
    </NavigationContainer>
  );
}
