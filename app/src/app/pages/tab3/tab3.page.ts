import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  private avaliacoes = new Array<Avaliacao>();
  private avaliacaoSubscription: Subscription;

  constructor(
    private alertController: AlertController,
    private avaliacaoService: AvaliacaoService,
    private router: Router,
    private authService: AuthService
  ) {

    this.avaliacaoSubscription = this.avaliacaoService.getAvaliacoes().subscribe(data => {
      this.avaliacoes = data;
    }

    )

  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.avaliacaoSubscription.unsubscribe();
  }

  private presentAlert(): boolean | Promise<boolean> | Observable<boolean> {

    return new Promise((resolve: any, reject: any) => {
      this.alertController.create({
        header: 'Tem certeza que deseja excluir essa avaliação?',
        message: 'Clique ok para confirmar!',
        buttons: [
          {
            text: 'Cancelar',
            handler: _ => reject(false)
          },
          {
            text: 'ok',
            handler: _ => resolve(true)
          }
        ]
      }).then(alert => alert.present());
    });

  }

  getAvaliacoes() {
    let aval = [];

    for (let i of this.avaliacoes){
      if (i.userId == this.authService.getAuth().currentUser.uid && !i.arquivado){
        aval.push(i);
      }
    }
    return aval;

  }
  
  async removeAvaliacao(id: string) {
    let opc = await this.presentAlert();
    if (opc) {
      return this.avaliacaoService.removeAvaliacao(id);
    }
  }

  pageAddAvaliacao() {
    this.router.navigateByUrl("avaliacao", { skipLocationChange: true });
  }

  arquivarAvaliacao(avaliacao: Avaliacao){
    avaliacao.arquivado = true;
    return this.avaliacaoService.alterarAvaliacao(avaliacao);
  }

}
