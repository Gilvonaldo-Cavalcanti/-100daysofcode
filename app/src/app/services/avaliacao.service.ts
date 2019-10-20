import { Injectable } from '@angular/core';
import { Avaliacao } from '../interfaces/avaliacao';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvaliacoesService {

  private treinoCollection: AngularFirestoreCollection<Avaliacao>;

  constructor(private afs: AngularFirestore) { 
    this.treinoCollection = this.afs.collection<Avaliacao>('Avaliacao');
  }

  getAvaliacoes() {
    return this.treinoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    )
  }

  addAvaliacao(avaliacao: Avaliacao) {
    return this.treinoCollection.add(avaliacao);
  }

  getAvaliacao(id: string){
    return this.treinoCollection.doc<Avaliacao>(id).valueChanges();
  }




}
