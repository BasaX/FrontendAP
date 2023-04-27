import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css'],
})
export class NewProyectoComponent implements OnInit {
  nombre: string;
  descripcion: string;
  url: string = '';
  img: string = 'URLImagen';

  constructor(
    private sProyecto: ProyectoService,
    private router: Router,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {}

  onCreate(): void {
    const proyect = new Proyecto(
      this.nombre,
      this.descripcion,
      this.url,
      this.imageService.url
    );
    this.sProyecto.save(proyect).subscribe(
      (data) => {
        alert('Proyecto agregado');
        this.router.navigate(['']);
      },
      (err) => {
        alert('Fallo');
        console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  uploadImage($event: any) {
    const id =
      this.nombre.split(' ').length > 0
        ? this.nombre.split(' ')[0]
        : this.nombre;
    const name = `proyecto_` + id;
    this.imageService.uploadImageById($event, name);
  }
}
