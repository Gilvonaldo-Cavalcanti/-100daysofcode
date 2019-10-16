import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService, 
    private router: Router,
    private treinoService: TreinoService) 
    { 

      this.treinoSubscription = this.treinoService.getTreinos().subscribe(data => {
        this.treinos = data;
      }

      )

     }

  ngOnInit() {
  }

  pageaddtreino(){
    this.router.navigateByUrl("treino", { skipLocationChange: true });
  }

  treinodetalhe(){  
    this.router.navigateByUrl("treino-detalhe", { skipLocationChange: true });
  }

  sair() {
      this.authService.logout();    
  }

  ngOnDestroy(){
    this.treinoSubscription.unsubscribe();
  }

}