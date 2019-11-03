import { Injectable } from '@angular/core';
import { Registrotreino } from '../interfaces/registrotreino';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistroTreinoService {

  private registroDeTreinoCollection: AngularFirestoreCollection<Registrotreino>;

  constructor(private afs: AngularFirestore) {
    this.registroDeTreinoCollection = this.afs.collection<Registrotreino>('RegistroTreinos');
  }

  getRegistrosDeTreinos() {
    return this.registroDeTreinoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    )
  }

  addRegistroDeTreinos(registroTreinos: Registrotreino) {
    return this.registroDeTreinoCollection.add(registroTreinos);
  }

  getRegistroDeTreinos(id: string) {
    return this.registroDeTreinoCollection.doc<Registrotreino>(id).valueChanges();
  }

  removeRegistroDeTreinos(id: string) {
    return this.registroDeTreinoCollection.doc(id).delete();
  }

}
