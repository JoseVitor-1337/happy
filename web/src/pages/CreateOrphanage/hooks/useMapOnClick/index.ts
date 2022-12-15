import { useCallback, useEffect, useState } from "react";

import { LeafletMouseEvent, Map } from "leaflet";

type OnClickMap = (event: LeafletMouseEvent) => void;

export default function useMapOnClick(onClickMap: OnClickMap) {
  const [mapRef, setMapRef] = useState<Map | null>();

  const handleOnClickOnMap = useCallback(
    (event: LeafletMouseEvent) => {
      onClickMap(event);
    },
    [onClickMap]
  );

  useEffect(() => {
    const map = mapRef;

    map?.addEventListener("click", handleOnClickOnMap);

    return () => {
      map?.removeEventListener("click", handleOnClickOnMap);
    };
  }, [mapRef, handleOnClickOnMap]);

  return { setMapRef, handleOnClickOnMap };
}
