import { useCallback, useEffect } from "react";

type ILoadInicialPosition = (latitude: number, longitude: number) => void;

export default function useGetUserInitialCoordinates(
  loadInicialPosition: ILoadInicialPosition
) {
  const getInitialPosition = useCallback(
    (latitude: number, longitude: number) => {
      loadInicialPosition(latitude, longitude);
    },
    []
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        getInitialPosition(latitude, longitude);
      },
      () => {
        alert(
          "Navegador não possui suporte e/ou permissão para usar geolocalização"
        );
      }
    );
  }, [getInitialPosition]);

  return null;
}
