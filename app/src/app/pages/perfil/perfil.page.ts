import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  private nome: string;
  private email: string;

  constructor(private auth: AuthService) {

    this.nome = this.auth.getAuth().currentUser.displayName;
    this.email = this.auth.getAuth().currentUser.email;

   }

  ngOnInit() {
  }


  teste(){
    
    
  }

  excluirMinhaConta(){
    this.auth.excluirMinhaConta();
  }

}
