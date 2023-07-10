export interface PaintingsObservable {
  status: string,
  paints: Painting[],
  results: Results
}

export interface PaintingObservable {
  status: string,
  paint: Painting
}

export interface Painting {
    _id: string;
    title: string;
    subtitle: string;
    image0url: string;
    image1url: string;
    image2url: string;
    description: string;
    dimension: string;
    characteristics: string;
    link: string;
    link2: string;
    date: Date;
}

export interface Results {
  next: Next,
  previous: Previous,
  total: number
}

export interface Next {
  page: number,
  limit: number
}

export interface Previous {
  page: number,
  limit: number
}

