import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Treino } from '../interfaces/treino';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreinoService {

  private treinoCollection: AngularFirestoreCollection<Treino>;

  constructor(private afs: AngularFirestore) {
    this.treinoCollection = this.afs.collection<Treino>('Treinos');
  }
  
  getTreinos() {
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

  addTreino(treino: Treino) {
    return this.treinoCollection.add(treino);
  }

  getTreino(id: string){
    return this.treinoCollection.doc<Treino>(id).valueChanges();
  }

  removeTreino(id: string){
    return this.treinoCollection.doc(id).delete();
  }

}
