import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryState = {
  error?: Error;
};

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("MoonOS crashed", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="crash-screen">
        <h1>MoonOS recovered from a display error</h1>
        <p>{this.state.error.message}</p>
        <button
          className="win-button"
          onClick={() => {
            window.localStorage.removeItem("moonos-window-state");
            window.location.reload();
          }}
        >
          Reset desktop and reload
        </button>
      </main>
    );
  }
}
