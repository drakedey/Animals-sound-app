import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: Animal[] = [];
  audioReproduciendo = new Audio();
  audioTiempo: any;
  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.splice(0);
  }

  reproducir(animal: Animal) {
    this.pausarAudio(animal);
    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }
    this.audioReproduciendo.src = animal.audio;
    this.audioReproduciendo.load();
    this.audioReproduciendo.play();
    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(() => {
      animal.reproduciendo = false;
    }, animal.duracion * 1000);
  }

  eliminarAnimal(idx: number) {
    this.animales.splice(idx, 1);
  }

  private pausarAudio(animalSelected: Animal) {
    clearInterval(this.audioTiempo);
    this.audioReproduciendo.pause();
    this.animales.forEach((animal) => {
      const { nombre } = animalSelected;
      if (animal.nombre !== nombre) {
        animal.reproduciendo = false;
      }
    });
  }



}
