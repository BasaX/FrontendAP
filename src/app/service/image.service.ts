import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  list,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  url: string = '';

  constructor(private storage: Storage) {}

  public uploadImageById($event: any, name: string) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name);

    uploadBytes(imgRef, file)
      .then((response) => {
        this.getImageById(name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getImageById(name: string) {
    const imagesRef = ref(this.storage, `imagen`);
    list(imagesRef).then(async (response) => {
      for (let item of response.items) {
        if (item.name === name) {
          this.url = await getDownloadURL(item);
        }
      }
    });
  }
}
