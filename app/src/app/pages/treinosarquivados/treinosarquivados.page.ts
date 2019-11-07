import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Treino } from 'src/app/interfaces/treino';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TreinoService } from 'src/app/services/treino.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-treinosarquivados',
  templateUrl: './treinosarquivados.page.html',
  styleUrls: ['./treinosarquivados.page.scss'],
})
export class TreinosarquivadosPage implements OnInit {

  private treinos = new Array<Treino>();
  private treinoSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private treinoService: TreinoService,
    private authService: AuthService
    ) {

      this.treinoSubscription = this.treinoService.getTreinos().subscribe(data => {
        this.treinos = data;
      });

     }

  ngOnInit() {
  }


  getTreinosComArquivamento() {
    /** Método que retorna todas as fichas de treinos sem arquivamento */  
      let treinosSemArquivamento = new Array<Treino>();
      for (let i of this.treinos) {
        if (i.arquivado && i.userId == this.authService.getAuth().currentUser.uid) {
          treinosSemArquivamento.push(i);
        }
      }
      return treinosSemArquivamento;
    }
  
    getExercicio(id: string): Array<string> {
    /** Método que retorna todos os exercícios dos treinos */
      let exercicios: Array<string> = [];
  
      for (let treino of this.treinos) {
        if (Object.is(treino.id, id)) {
  
          if (treino.exercicios) {
            for (let a of treino.exercicios) {
              exercicios.push(a);
            }
          }
        }
      }
      if (exercicios.length === null) {
        exercicios.push("Sem Exercícios Cadastrados");
      }
      return exercicios;
    }
  
    ngOnDestroy() {
      this.treinoSubscription.unsubscribe();
    }
  
    desarquivarTreino(treino: Treino) {
      treino.arquivado = false;
      return this.treinoService.alterarTreino(treino);
    }
  
  


}
