interface MathJaxConfig {
    tex: {
      inlineMath: string[][];
      displayMath: string[][];
      processEscapes: boolean;
      processEnvironments: boolean;
    };
    svg: {
      fontCache: string;
    };
  }
  
  declare global {
    interface Window {
      MathJax: MathJaxConfig;
    }
  }
  
  export {};