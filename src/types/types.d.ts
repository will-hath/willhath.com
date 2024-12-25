import { LinkProps } from 'next/link';


export interface TVProps {
    imageSource: string | null;
    name?: string;
    href?: LinkProps['href'];  // This will accept any valid Next.js link path
}

export interface TVGridProps {
    rows: number;
    columns: number;
    tvContents: (TVProps | null)[];
}

declare module '*.html' {
    const content: string;
    export default content;
  }