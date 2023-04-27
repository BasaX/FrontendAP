export class Proyecto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  url?: string;
  img?: string;

  constructor(nombre: string, descripcion: string, url: string, img: string) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.url = url;
    this.img = img;
  }
}
