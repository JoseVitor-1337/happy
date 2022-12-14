import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";

export type IOrphanage = {
  id: number;
  name: string;
  about: string;
  instructions: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  open_on_weekands: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
};

type IUseOrphanageProps = {
  orphanage?: IOrphanage;
};

export default function useOrphanage(): IUseOrphanageProps {
  const [orphanage, setOrphanage] = useState<IOrphanage>();

  const { id } = useParams();

  const loadOrphanageByAPI = useCallback(async () => {
    const response = await api.get(`/orphanages/${id}`);

    if (response.data.success) setOrphanage(response.data.orphanage);
  }, [id]);

  useEffect(() => {
    loadOrphanageByAPI();
  }, [loadOrphanageByAPI]);

  return { orphanage };
}
