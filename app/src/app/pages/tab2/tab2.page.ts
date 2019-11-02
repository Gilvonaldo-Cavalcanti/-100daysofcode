import { Component, OnInit } from '@angular/core';
import { Registrotreino } from 'src/app/interfaces/registrotreino';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  //to do 

  constructor(private registreino: Registrotreino,) {  }
  
  ngOnInit() {

  }

  getRegistroDeTreinos(){

  }

  novoRegistroTreino(){
    let dataAtual = new Date();
   // this.registreino.data = dataAtual.toLocaleDateString();
    console.log("Registrado=> "+dataAtual.toLocaleDateString());
  }


}
