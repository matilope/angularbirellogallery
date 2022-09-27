export class Portrait {
  constructor(
    public _id: string,
    public titulo: string,
    public image0url: string,
    public date: Date
  ) { }
}

export interface PortraitObservable {
  status: string,
  portrait: Portraits[]
}

export interface Portraits {
  _id: string,
  date: Date,
  titulo: string,
  image0url: string
}

export interface PortraitSingle {
  portrait: Portraits
}