import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { ReorderIndexes } from 'ionic-angular/umd/components/item/item-reorder';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: Animal[] = [];
  audioReproduciendo = new Audio();
  audioTiempo: any;
  ordenando: boolean = false;
  constructor(public navCtrl: NavController) {
    this.cargaAnimales();
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

  cargaAnimales() {
    this.animales = ANIMALES.slice(0);
    console.log(this.animales);
  }

  refrescaVista(refresher: Refresher) {
    setTimeout(() => {
      this.cargaAnimales();
      refresher.complete();
    }, 1500);
  }

  reordenarAnimales(indices: ReorderIndexes) {
    // My Whay to do it
    // const { from, to } = indices;
    // let newAnimals = this.animales.slice(0);
    // newAnimals.splice(to, 1, this.animales[from]);
    // newAnimals.splice(from, 1, this.animales[to]);
    // this.animales = newAnimals;

    //Ionic way
    this.animales = reorderArray(this.animales, indices);
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
