import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { AlertController } from '@ionic/angular';

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
    private router: Router) { }

  ngOnInit() { }

  


}
