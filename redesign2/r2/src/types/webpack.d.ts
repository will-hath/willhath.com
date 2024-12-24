declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare const require: {
    context(
      directory: string,
      useSubdirectories: boolean,
      regExp: RegExp
    ): {
      keys(): string[];
      <T>(id: string): T;
    };
  };