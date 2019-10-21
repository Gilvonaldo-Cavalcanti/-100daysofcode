import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  private avaliacoes = new Array<Avaliacao>();
  private avaliacaoSubscription: Subscription;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private router: Router
  ) {

    this.avaliacaoSubscription = this.avaliacaoService.getAvaliacoes().subscribe(data => {
      this.avaliacoes = data;
    }

    )

  }

  ngOnInit() {
  }


  pageAddAvaliacao() {
    this.router.navigateByUrl("avaliacao", { skipLocationChange: true });
  }

}
