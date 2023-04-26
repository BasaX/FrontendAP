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

  public uploadImage($event: any, name: string) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagen/` + name);

    uploadBytes(imgRef, file)
      .then((response) => {
        this.getImage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getImage() {
    const imagesRef = ref(this.storage, `imagen`);
    list(imagesRef)
      .then(async (response) => {
        for (let item of response.items) {
          this.url = await getDownloadURL(item);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
