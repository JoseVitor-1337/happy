import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import api from "../../../../services/api";

export type IOrphanage = {
  id: number;
  name: string;
  about: string;
  instructions: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  open_on_weekands: string;
  images: Array<{
    id: number;
    url: string;
  }>;
};

type RouteParamsList = {
  id: number;
};

type IUseOrphanagesProps = {
  orphanage?: IOrphanage;
};

export default function useOrphanage(): IUseOrphanagesProps {
  const reuter = useRoute();

  const params = reuter.params as RouteParamsList;

  const [orphanage, setOrphanage] = useState<IOrphanage>();

  useEffect(() => {
    api
      .get(`/orphanages/${params.id}`)
      .then((response) => {
        if (response.data.success) {
          setOrphanage(response.data.orphanage);
        } else {
          alert("Erro ao pegar o orfanato");
        }
      })
      .catch(() => {
        alert("Erro ao pegar o orfanato");
      });
  }, [params]);

  return { orphanage };
}
