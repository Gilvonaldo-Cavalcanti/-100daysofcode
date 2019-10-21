import { Injectable } from '@angular/core';
import { Avaliacao } from '../interfaces/avaliacao';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private avaliacaoCollection: AngularFirestoreCollection<Avaliacao>;

  constructor(private afs: AngularFirestore) { 
    this.avaliacaoCollection = this.afs.collection<Avaliacao>('Avaliacao');
  }

  getAvaliacoes() {
    return this.avaliacaoCollection.snapshotChanges().pipe(
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
    return this.avaliacaoCollection.add(avaliacao);
  }

  getAvaliacao(id: string){
    return this.avaliacaoCollection.doc<Avaliacao>(id).valueChanges();
  }

  removeAvaliacao(id: string){
    return this.avaliacaoCollection.doc(id).delete();
  }



}
