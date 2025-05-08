// React and ReactDOM type declarations
declare module 'react' {
  // No implementation needed here, just to let TypeScript know this module exists
}

declare module 'react-dom' {
  // No implementation needed here
}

// Styled Components type declarations
declare module 'styled-components' {
  // styled function types
  export interface ThemedStyledComponentsModule<T> {
    default: StyledInterface<T>;
  }

  export interface StyledInterface<T> {
    <C extends React.ComponentType<any>>(
      component: C
    ): ThemedStyledFunction<C, T>;
    <E extends keyof JSX.IntrinsicElements>(
      tag: E
    ): ThemedStyledFunction<E, T>;
  }

  export interface ThemedStyledFunction<C, T> {
    (styles: TemplateStringsArray, ...args: any[]): React.ComponentType<any>;
  }

  export function createGlobalStyle(
    first: TemplateStringsArray,
    ...interpolations: any[]
  ): React.ComponentType<any>;

  export function keyframes(
    strings: TemplateStringsArray,
    ...interpolations: any[]
  ): string;

  export function ThemeProvider<T extends {}>(
    props: { theme: T; children?: React.ReactNode }
  ): React.ReactElement;
}

// Next.js type declarations
declare module 'next/app' {
  export interface AppProps {
    Component: React.ComponentType<any>;
    pageProps: any;
  }
}

declare module 'next/head' {
  export default function Head(props: {
    children: React.ReactNode;
  }): React.ReactElement;
}

declare module 'next/link' {
  export default function Link(props: {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    children: React.ReactNode;
  }): React.ReactElement;
}

// JSX intrinsic elements type declarations
namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Basic type declarations for React
declare module 'react' {
  export type FC<P = {}> = FunctionComponent<P>;
  export interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement | null;
    displayName?: string;
  }
  export type ReactElement = any;
  export type ReactNode = 
    | ReactElement
    | string
    | number
    | boolean
    | null
    | undefined;
  
  export function createElement(
    type: any,
    props?: any,
    ...children: any[]
  ): ReactElement;
  
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T>(initialValue: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
}

// Basic type declarations for React DOM
declare module 'react-dom' {
  export function render(element: any, container: any): void;
  export function hydrate(element: any, container: any): void;
  export function createPortal(children: any, container: any): any;
}

// More complete type declarations for styled-components
declare module 'styled-components' {
  export default function styled(tag: any): any;
  
  // Add common HTML elements
  namespace styled {
    export function div(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function span(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function button(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function a(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function input(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function form(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function header(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function footer(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function main(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function section(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function article(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function aside(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function nav(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function h1(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function h2(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function h3(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function h4(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function h5(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function h6(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function p(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function ul(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function ol(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function li(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function label(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function select(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function option(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function table(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function tbody(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function thead(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function tr(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function td(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function th(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function img(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function svg(strings: TemplateStringsArray, ...interpolations: any[]): any;
    export function path(strings: TemplateStringsArray, ...interpolations: any[]): any;
  }
  
  export function keyframes(strings: TemplateStringsArray, ...interpolations: any[]): string;
  export function createGlobalStyle(strings: TemplateStringsArray, ...interpolations: any[]): any;
  export function ThemeProvider(props: any): any;
}

// Basic type declarations for Next.js
declare module 'next/app' {
  export interface AppProps {
    Component: any;
    pageProps: any;
    router: any;
  }
}

declare module 'next/head' {
  export default function Head(props: { children: any }): any;
}

declare module 'next/link' {
  export default function Link(props: { href: string; children: any; [key: string]: any }): any;
}

declare module 'next/router' {
  export function useRouter(): {
    route: string;
    pathname: string;
    query: any;
    asPath: string;
    push: (url: string, as?: string, options?: any) => Promise<boolean>;
    replace: (url: string, as?: string, options?: any) => Promise<boolean>;
    reload: () => void;
    back: () => void;
    prefetch: (url: string) => Promise<void>;
    beforePopState: (cb: (state: any) => boolean) => void;
    events: {
      on: (type: string, handler: (...evts: any[]) => void) => void;
      off: (type: string, handler: (...evts: any[]) => void) => void;
      emit: (type: string, ...evts: any[]) => void;
    };
    isFallback: boolean;
  };
}

// Add JSX namespace
namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 