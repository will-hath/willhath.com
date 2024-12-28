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