// This declaration tells TypeScript about the spline-viewer custom element
declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        url?: string;
        'events-target'?: 'global' | string;
        'loading-anim'?: boolean | string;
        'loading'?: boolean | string;
      },
      HTMLElement
    >;
  }
}

// Declare the custom element for global use
interface HTMLElementTagNameMap {
  'spline-viewer': HTMLElement;
}

// Extend the Window interface to include the customElements registry
interface CustomElementRegistry {
  define(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
  get(name: string): CustomElementConstructor | undefined;
  upgrade(root: Node): void;
  whenDefined(name: string): Promise<CustomElementConstructor>;
}

interface Window {
  customElements: CustomElementRegistry;
}
