import { useSyncExternalStore } from "react";
import { ROOM_3D_ENABLED, detect3DSupport } from "@/lib/room3d";

// El valor se calcula una sola vez en el cliente.
let cached: boolean | undefined;

function getSnapshot(): boolean {
  cached ??= ROOM_3D_ENABLED && detect3DSupport();
  return cached;
}

const subscribe = () => () => {};

// En el servidor (y en la hidratación) es false; después toma el valor real.
export function useCanUse3D(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
