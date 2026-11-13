"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export type WindowState = {
  id: string;
  minimized: boolean;
  spawn: number; // orden de apertura, para escalonar la posición inicial
};

type State = {
  // El orden del arreglo es el orden de apilado: la última va encima.
  windows: WindowState[];
  spawned: number;
};

type Action =
  | { type: "open"; id: string }
  | { type: "close"; id: string }
  | { type: "minimize"; id: string }
  | { type: "focus"; id: string };

function bringToFront(state: State, id: string): State {
  const index = state.windows.findIndex((w) => w.id === id);
  if (index === -1) return state;
  const current = state.windows[index];
  const isTop = index === state.windows.length - 1;
  if (isTop && !current.minimized) return state;
  const rest = state.windows.filter((w) => w.id !== id);
  return { ...state, windows: [...rest, { ...current, minimized: false }] };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open": {
      if (state.windows.some((w) => w.id === action.id)) {
        return bringToFront(state, action.id);
      }
      return {
        spawned: state.spawned + 1,
        windows: [
          ...state.windows,
          { id: action.id, minimized: false, spawn: state.spawned },
        ],
      };
    }
    case "close":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
      };
    case "minimize":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w,
        ),
      };
    case "focus":
      return bringToFront(state, action.id);
  }
}

type WindowManagerValue = {
  windows: WindowState[];
  focusedId: string | null;
  open: (id: string) => void;
  close: (id: string) => void;
  minimize: (id: string) => void;
  focus: (id: string) => void;
  // Botón de la barra de tareas: restaura, enfoca o minimiza.
  toggle: (id: string) => void;
};

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

function initState(initialOpen?: string): State {
  return initialOpen
    ? { windows: [{ id: initialOpen, minimized: false, spawn: 0 }], spawned: 1 }
    : { windows: [], spawned: 0 };
}

export function WindowManagerProvider({
  children,
  initialOpen,
}: {
  children: ReactNode;
  initialOpen?: string; // ventana abierta desde el primer momento
}) {
  const [state, dispatch] = useReducer(reducer, initialOpen, initState);

  const value = useMemo<WindowManagerValue>(() => {
    // La ventana enfocada es la de más arriba que no está minimizada.
    const visible = state.windows.filter((w) => !w.minimized);
    const focusedId = visible.length ? visible[visible.length - 1].id : null;
    return {
      windows: state.windows,
      focusedId,
      open: (id) => dispatch({ type: "open", id }),
      close: (id) => dispatch({ type: "close", id }),
      minimize: (id) => dispatch({ type: "minimize", id }),
      focus: (id) => dispatch({ type: "focus", id }),
      toggle: (id) =>
        dispatch(
          focusedId === id ? { type: "minimize", id } : { type: "focus", id },
        ),
    };
  }, [state]);

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  }
  return context;
}
