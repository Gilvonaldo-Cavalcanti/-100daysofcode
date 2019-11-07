import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Treino } from 'src/app/interfaces/treino';
import { Subscription, Observable } from 'rxjs';
import { TreinoService } from 'src/app/services/treino.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

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

  
  getTreinosSemArquivamento() {
  /** Método que retorna todas as fichas de treinos sem arquivamento */  
    let treinosSemArquivamento = new Array<Treino>();
    for (let i of this.treinos) {
      if (!i.arquivado && i.userId == this.authService.getAuth().currentUser.uid) {
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

  pageaddtreino() {
    this.router.navigateByUrl("treino", { skipLocationChange: true });
  }

  treinodetalhe() {
    this.router.navigateByUrl("treino-detalhe", { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.treinoSubscription.unsubscribe();
  }

  private presentAlert(): boolean | Promise<boolean> | Observable<boolean> {

    return new Promise((resolve: any, reject: any) => {
      this.alertController.create({
        header: 'Tem certeza que deseja excluir esse treino?',
        message: 'Clique ok para confirmar!',
        buttons: [
          {
            text: 'Cancelar',
            handler: _ => reject(false)
          },
          {
            text: 'Ok',
            handler: _ => resolve(true)
          }
        ]
      }).then(alert => alert.present());
    });

  }

  arquivarTreino(treino: Treino) {
    treino.arquivado = true;
    return this.treinoService.alterarTreino(treino);
  }

  async removeTreino(id: string) {
    let opc = await this.presentAlert();
    if (opc) {
      return this.treinoService.removeTreino(id);
    }
  }

}