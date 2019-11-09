import { Component, OnInit, ɵConsole } from '@angular/core';
import { Registrotreino } from 'src/app/interfaces/registrotreino';
import { Subscription, Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { RegistroTreinoService } from 'src/app/services/registro-treino.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConclusaoSemanal } from 'src/app/interfaces/conclusao-semanal';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  
  private registrosDeTreinos = new Array<Registrotreino>();
  private conclusoesSemanais = new Array<ConclusaoSemanal>();

  private dias = ["Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"];
  private semana = {
    "Domingo": false, "Segunda": false, "Terca": false,
    "Quarta": false, "Quinta": false, "Sexta": false, "Sabado": false
  };

  private registTreinosSubscription: Subscription;  
  
  private registreino: Registrotreino = {};
  private conclusaoSemanal: ConclusaoSemanal = {};
  
  private dataAtual: Date = new Date();

  constructor(private alertController: AlertController, private toastCtrl: ToastController, private registreinoService: RegistroTreinoService, private authService: AuthService,) {

    this.registTreinosSubscription = this.registreinoService.getRegistrosDeTreinos().subscribe(data => {    
      this.registrosDeTreinos = data;
    });

    this.registTreinosSubscription = this.registreinoService.getConclusaoSemanal().subscribe(data => {    
      this.conclusoesSemanais = data;
    });
    
    if (this.registrosDeTreinos.length != 0){
      for (let i of this.registrosDeTreinos){
        if (i.userId == this.authService.getAuth().currentUser.uid){
          this.registreino = i;
        }
      }
    }

    if (this.conclusoesSemanais.length != 0){
      for (let i of this.conclusoesSemanais){
        if (i.userId == this.authService.getAuth().currentUser.uid){
          this.conclusaoSemanal = i;
        }
      }
    }

    
  }

  ngOnInit() { }

  atualizarConclusaoSemanal(){
    this.conclusaoSemanal.domingo = this.semana["Domingo"];
    this.conclusaoSemanal.segunda = this.semana["Segunda"];
    this.conclusaoSemanal.terca = this.semana["Terca"];
    this.conclusaoSemanal.quarta = this.semana["Quarta"];
    this.conclusaoSemanal.quinta = this.semana["Quinta"];
    this.conclusaoSemanal.sexta = this.semana["Sexta"];
    this.conclusaoSemanal.sabado = this.semana["Sabado"];
  }

  async registrarTreino(){
    
    let opc = await this.presentAlert();
    
    if (opc) {

      this.atualizarPontuacao();
      this.atualizarNivel();

      if (this.registrosDeTreinos.length == 0){
        this.registreino.userId = this.authService.getAuth().currentUser.uid;
        this.registreinoService.addRegistroDeTreino(this.registreino);
      } else {
        for (let a of this.registrosDeTreinos){
          if (a.userId == this.authService.getAuth().currentUser.uid){
            this.registreinoService.updateRegistroDeTreino(this.registreino);
          }
        }
      }
      this.registrarConclusaoSemanal();
    }

  }

  registrarConclusaoSemanal(){
    if (this.conclusoesSemanais.length == 0){
      
      this.semana[this.dias[this.dataAtual.getDay()]] = true;
      this.atualizarConclusaoSemanal();
      this.conclusaoSemanal.userId = this.authService.getAuth().currentUser.uid;
      this.registreinoService.addConclusaoSemanal(this.conclusaoSemanal);

    } else {
      for (let i of this.conclusoesSemanais) {
        if (i.userId == this.authService.getAuth().currentUser.uid){
          this.updateSemana(this.dias[this.dataAtual.getDay()]);
          this.registreinoService.updateConclusaoSemanal(this.conclusaoSemanal);
        }
      }
    }
  }

  updateSemana(dia: string){
    switch (dia){
      case "Domingo": {
        this.conclusaoSemanal.domingo = true;
        break;
      }
      case "Segunda": {
        this.conclusaoSemanal.segunda = true;
        break;
      }
      case "Terca": {
        this.conclusaoSemanal.terca = true;
        break;
      }
      case "Quarta": {
        this.conclusaoSemanal.quarta = true;
        break;
      }
      case "Quinta": {
        this.conclusaoSemanal.quinta = true;
        break;
      }
      case "Sexta": {
        this.conclusaoSemanal.sexta = true;
        break;
      }
    }
  }


  registrarDescanso(){

  }

  atualizarPontuacao() {

    var pont: Number = this.registreino.pontuacao;

    if (pont == null) {
      this.registreino.pontuacao = 20;
    } else {
      this.registreino.pontuacao += 20;
    }
  }

  atualizarNivel() {

    var pont: Number = this.registreino.pontuacao;

    if (pont >= 0 && pont < 500) {
      this.registreino.nivel = "Iniciante";
    } else if (pont >= 500 && pont < 1000) {
      this.registreino.nivel = "Desportista Amador";
    } else if (pont >= 1000 && pont < 1500) {
      this.registreino.nivel = "Desportista Experiente";
    } else if (pont >= 1500) {
      this.registreino.nivel = "Profissional";
    }

  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2000
    });
    toast.present();
  }

  private presentAlert(): boolean | Promise<boolean> | Observable<boolean> {

    return new Promise((resolve: any, reject: any) => {
      this.alertController.create({
        header: 'Registro de Treinos',
        message: 'Clique ok para confirmar!</br>Ao confirmar você receberá as seguintes contuações</br>20 pontos para subir de nível',
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



  

}
