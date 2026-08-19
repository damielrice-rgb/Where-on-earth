export interface Country {
  names: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  capitals?: string[];
  flags: {
    url_svg: string;
    url_png: string;
  };
  alpha3code: string;

  languages: {
    name: string;
  }[];
  borders: string[];
}
