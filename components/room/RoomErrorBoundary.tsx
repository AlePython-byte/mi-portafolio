"use client";

import { Component, type ReactNode } from "react";

type Props = {
  onFail: () => void;
  children: ReactNode;
};

// Ante cualquier error de la escena (render o carga del chunk), avisa con onFail.
export default class RoomErrorBoundary extends Component<
  Props,
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
