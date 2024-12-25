export interface TVProps {
  imageSource?: string;
  name?: string;
  href?: string;
} 

export interface TVGridProps {
    rows: number;
    columns: number;
    tvContents: (TVProps | null)[];
}