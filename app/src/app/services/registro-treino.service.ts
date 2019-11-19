import { Injectable } from '@angular/core';
import { Registrotreino } from '../interfaces/registrotreino';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ConclusaoSemanal } from '../interfaces/conclusao-semanal';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RegistroTreinoService {

  private registroDeTreinoCollection: AngularFirestoreCollection<Registrotreino>;
  private conclusaoSemanalCollection: AngularFirestoreCollection<ConclusaoSemanal>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.registroDeTreinoCollection = this.afs.collection<Registrotreino>('RegistroTreinos');
    this.conclusaoSemanalCollection = this.afs.collection<ConclusaoSemanal>('conclusao-semanal');

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

  getConclusaoSemanal(){
    return this.conclusaoSemanalCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    )
  }

  addConclusaoSemanal(conclusaoSemanal: ConclusaoSemanal){   
    return this.conclusaoSemanalCollection.add(conclusaoSemanal);   
  }

  updateConclusaoSemanal(id: string, conclusaoSemanal: ConclusaoSemanal){
    return this.conclusaoSemanalCollection.doc(id).update(conclusaoSemanal);
  }

  addRegistroDeTreino(registroTreinos: Registrotreino){
    return this.registroDeTreinoCollection.add(registroTreinos);
  }

  updateRegistroDeTreino(id: string, registroTreinos: Registrotreino){
    return this.registroDeTreinoCollection.doc<Registrotreino>(id).update(registroTreinos);
  }

  getRegistroDeTreinos(id: string) {
    return this.registroDeTreinoCollection.doc<Registrotreino>(id).valueChanges();
  }


}
