import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})
export class MultimediaComponent {

  constructor(private storageService: StorageService) {

  }

  imagenes: any[] = [];
  cargarImagen(event: any) {
    let archivos = event.target.files;
    let nombre = "Katherine";

    for (let i = 0; i < archivos.length; i++) {

      let reader = new FileReader();
      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        console.log(reader.result);
        this.imagenes.push(reader.result);
        this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
          let usuario = {
            name: "Katherine",
            nickName: "Andrea",
            password: "123456",
            imgProfile: urlImagen
          }
          console.log(urlImagen);
        });
      }
    }

  }
}
