import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

  constructor(private db: AngularFirestore,) { }

   getEventos(){
    this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      let eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.startTime.toDate();
        event.endTime = event.endTime.toDate();
        eventSource.push(event);
      });
    });
    return EventSource;
   }

   

   addEvento(event){
    this.db.collection(`events`).add(event);
   }

}
