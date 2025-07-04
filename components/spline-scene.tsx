"use client";

import React, { useState, useEffect, useRef } from "react";

export interface SplineSceneProps {
  scene?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Define the type for Spline Viewer element
interface SplineViewerElement extends HTMLElement {
  url?: string;
  'events-target'?: 'global' | string;
}

export default function SplineScene({ scene, className, style }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isViewerReady, setIsViewerReady] = useState(false);
  // Use the specific type for the ref
  const viewerRef = useRef<SplineViewerElement | null>(null);

  // Ensure scene prop is always defined with a default fallback
  const sceneUrl = scene || "https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode";

  // Validate URL format to prevent errors
  const isValidUrl = (url: string): boolean => {
    try {
      return url.length > 0 && (url.startsWith('https://prod.spline.design/') && url.endsWith('/scene.splinecode'));
    } catch {
      return false;
    }
  };

  const validSceneUrl = isValidUrl(sceneUrl) ? sceneUrl : "https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode";

  useEffect(() => {
    // Check if the spline-viewer custom element is defined
    const checkSplineViewer = () => {
      if (typeof window !== 'undefined' && window.customElements && window.customElements.get('spline-viewer')) {
        setIsViewerReady(true);
        setIsLoaded(true);
      } else {
        // Retry after a short delay
        const timeoutId = setTimeout(checkSplineViewer, 100);
        return () => clearTimeout(timeoutId);
      }
    };

    checkSplineViewer();
  }, []);

  useEffect(() => {
    // Handle potential errors with the viewer
    const handleError = () => {
      console.warn('Spline viewer error detected, falling back to default scene');
      setHasError(true);
    };

    const handleLoad = () => {
      setHasError(false);
    };

    const currentViewer = viewerRef.current;
    if (currentViewer && isViewerReady) {
      currentViewer.addEventListener('error', handleError);
      currentViewer.addEventListener('load', handleLoad);

      return () => {
        currentViewer.removeEventListener('error', handleError);
        currentViewer.removeEventListener('load', handleLoad);
      };
    }
  }, [isViewerReady]);

  if (!isLoaded || !isViewerReady) {
    return (
      <div className={`flex items-center justify-center h-full bg-gradient-to-br from-gray-900 to-black ${className || ''}`} style={style}>
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading 3D scene...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900 ${className || ''}`} style={style}>
        <div className="text-center text-white">
          <div className="text-4xl mb-4">🎨</div>
          <p className="text-lg">3D Scene Unavailable</p>
          <p className="text-sm text-gray-300 mt-2">Fallback background active</p>
        </div>
      </div>
    );
  }

  // Use React.createElement with proper typing to avoid ESLint errors
  return React.createElement(
    'spline-viewer' as keyof JSX.IntrinsicElements,
    {
      ref: viewerRef,
      url: validSceneUrl,
      className: className,
      style: style,
      'events-target': 'global'
    }
  );
}

