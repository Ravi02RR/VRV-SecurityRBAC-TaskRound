import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {

    console.error('Uncaught error:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return this.props.FallbackComponent
        ? this.props.FallbackComponent({
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary
        })
        : null;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  FallbackComponent: PropTypes.elementType
};

export default ErrorBoundary;