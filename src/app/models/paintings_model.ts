export interface Paintings_Model {
  status: string,
  paints: Paints[],
  results: Results
}

export interface Paints{
    _id: string;
    titulo: string;
    subtitulo: string;
    image0url: string;
    image1url: string;
    image2url: string;
    image3url: string;
    image4url: string;
    image5url: string;
    descripcion: string;
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


export interface Paintings_Deleteimg {
  status: string,
  paints: Paints,
}

export interface Paintings_Updateimg {
  status: string,
  paints: Paints,
}
