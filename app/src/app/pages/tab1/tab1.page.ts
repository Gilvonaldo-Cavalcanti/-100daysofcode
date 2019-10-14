import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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

}