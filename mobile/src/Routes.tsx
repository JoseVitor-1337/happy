import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanagesDetails from "./pages/OrphanagesDetails";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";
import OrphanageForm from "./pages/CreateOrphanage/OrphanageForm";
import PageHeader from "./componentes/PageHeader";

export type IRouterParams = {
  OrphanagesMap: undefined;
  OrphanageDetails: { id: number };
  SelectMapPosition: undefined;
  OrphanageForm: { position: { latitude: number; longitude: number } };
};

const { Navigator, Screen } = createNativeStackNavigator<IRouterParams>();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
          options={{
            header: () => <PageHeader title="Orphanato" showCancel={false} />,
          }}
        />
        <Screen
          name="OrphanageDetails"
          component={OrphanagesDetails}
          options={{
            header: () => (
              <PageHeader title="Detalhes do orfanato" showCancel={false} />
            ),
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            header: () => <PageHeader title="Selecione o ponto" />,
          }}
        />
        <Screen
          name="OrphanageForm"
          component={OrphanageForm}
          options={{
            header: () => <PageHeader title="Criação do orfanato" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
