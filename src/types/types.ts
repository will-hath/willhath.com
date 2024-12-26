export interface TVProps {
  imageSource?: string;
  name?: string;
  href?: string;
  hasAntennas?: boolean;
} 

export interface TVGridProps {
    rows: number;
    columns: number;
    tvContents: (TVProps | null)[];
}