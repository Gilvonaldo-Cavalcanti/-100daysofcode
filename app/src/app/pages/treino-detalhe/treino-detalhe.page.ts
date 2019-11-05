import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Treino } from 'src/app/interfaces/treino';
import { TreinoService } from 'src/app/services/treino.service';

@Component({
  selector: 'app-treino-detalhe',
  templateUrl: './treino-detalhe.page.html',
  styleUrls: ['./treino-detalhe.page.scss'],
})
export class TreinoDetalhePage implements OnInit {

  private treinoId: string = null;
  private treino: Treino = {};

  constructor(private activatedRoute: ActivatedRoute, private treinoService: TreinoService) {
    this.treinoId = this.activatedRoute.snapshot.params['id'];
      this.loadTreino();
   }

   loadTreino(){
    this.treinoService.getTreino(this.treinoId).subscribe(data => {
      this.treino = data;
    });
   }

   getExercicio(){
     return this.treino.exercicios;
   }

  ngOnInit() {
  }

}
