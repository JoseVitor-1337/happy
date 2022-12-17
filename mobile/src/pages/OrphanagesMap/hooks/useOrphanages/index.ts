import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../../services/api";

export type IPartialOrphanage = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type IUseOrphanagesProps = {
  orphanages: IPartialOrphanage[];
};

export default function useOrphanages(): IUseOrphanagesProps {
  const [orphanages, setOrphanages] = useState<IPartialOrphanage[]>([]);

  useFocusEffect(() => {
    api
      .get("/orphanages")
      .then((response) => {
        if (response.data.success) {
          setOrphanages(response.data.orphanages);
        } else {
          alert("Erro ao listar os orfanatos");
        }
      })
      .catch(() => {
        alert("Erro ao listar os orfanatos");
      });
  });

  return { orphanages };
}
