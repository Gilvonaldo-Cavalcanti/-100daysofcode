import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Treino } from 'src/app/interfaces/treino';
import { Subscription } from 'rxjs';
import { TreinoService } from 'src/app/services/treino.service';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  private treinos = new Array<Treino>();
  private treinoSubscription: Subscription;
    
  constructor(
    private router: Router,
    private treinoService: TreinoService,
      
    ) {
      
    this.treinoSubscription = this.treinoService.getTreinos().subscribe(data => {
      this.treinos = data;
    }

    )

  }

  ngOnInit() {
  }


  getExercicio(id: string):Array<string>{
    let exercicios: Array<string> = [];
    
    for (let treino of this.treinos){
      if (Object.is(treino.id, id)){
        
        if (treino.exercicios != null){
          for (let a of treino.exercicios){
            exercicios.push(a);
          }
        }
      }
    }
    if (exercicios.length === null){
      exercicios.push("Sem Exercícios Cadastrados");
    }
    return exercicios;
  }

  pageaddtreino() {
    this.router.navigateByUrl("treino", { skipLocationChange: true });
  }

  treinodetalhe() {
    this.router.navigateByUrl("treino-detalhe", { skipLocationChange: true });
  }

  removeTreino(id: string){
    return this.treinoService.removeTreino(id);
  }


  ngOnDestroy() {
    this.treinoSubscription.unsubscribe();
  }

}