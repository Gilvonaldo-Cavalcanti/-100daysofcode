import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avaliacoesarquivadas',
  templateUrl: './avaliacoesarquivadas.page.html',
  styleUrls: ['./avaliacoesarquivadas.page.scss'],
})
export class AvaliacoesarquivadasPage implements OnInit {

  private avaliacoes = new Array<Avaliacao>();
  private avaliacaoSubscription: Subscription;

  constructor( private alertController: AlertController,
    private avaliacaoService: AvaliacaoService,
    private router: Router,
    private authService: AuthService,
    ) 
    { 
      this.avaliacaoSubscription = this.avaliacaoService.getAvaliacoes().subscribe(data => {
        this.avaliacoes = data;
      })
     }

  ngOnInit() { }

  getAvaliacoesComArquivamento() {
    /** Método que retorna todas as fichas de treinos sem arquivamento */  
      let avaliacoesComArquivamento = new Array<Avaliacao>();
      for (let i of this.avaliacoes) {
        if (i.arquivado && i.userId == this.authService.getAuth().currentUser.uid) {
          avaliacoesComArquivamento.push(i);
        }
      }
      return avaliacoesComArquivamento;
    }

    ngOnDestroy() {
      this.avaliacaoSubscription.unsubscribe();
    }
  
    desarquivarAvaliacao(avaliacao: Avaliacao) {
      avaliacao.arquivado = false;
      return this.avaliacaoService.alterarAvaliacao(avaliacao);
    }
  


}
