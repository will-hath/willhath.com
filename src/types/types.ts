export interface TVProps {
  imageSources?: string[];
  textSources?: string[];
  name?: string;
  href?: string;
  hasAntennas?: boolean;
} 

export interface TVGridProps {
    rows: number;
    columns: number;
    tvContents: (TVProps | null)[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  date: string;
  link: string;
  spineColor: string;
  textColor: string;
  height: number; //between 50% and 90%, percent of shelf to take up
  pages: number;
}