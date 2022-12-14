import { useCallback, useEffect, useState } from "react";
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

  const loadOrphanagesByAPI = useCallback(async () => {
    const response = await api.get("/orphanages");

    if (response.data.success) {
      setOrphanages(response.data.orphanages);
    }
  }, []);

  useEffect(() => {
    loadOrphanagesByAPI();
  }, [loadOrphanagesByAPI]);

  return { orphanages };
}
