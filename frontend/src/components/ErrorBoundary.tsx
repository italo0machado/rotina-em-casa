import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center p-8">
            <div className="max-w-md text-center">
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="font-serif text-4xl tracking-[-1.5px] mb-4 text-[#2c2118]">
                Algo deu errado
              </h1>
              <p className="text-[#6f5e4f] mb-8">
                Ocorreu um erro inesperado. Por favor, recarregue a página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-[#2c2118] text-white rounded-full text-sm tracking-[2px] hover:bg-[#3f2a1d] transition"
              >
                RECARREGAR PÁGINA
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;