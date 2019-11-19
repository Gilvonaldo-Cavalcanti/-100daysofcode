import { Component, OnInit, ɵConsole } from '@angular/core';
import { Registrotreino } from 'src/app/interfaces/registrotreino';
import { Subscription, Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { RegistroTreinoService } from 'src/app/services/registro-treino.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConclusaoSemanal } from 'src/app/interfaces/conclusao-semanal';
import { ActivatedRoute } from '@angular/router';



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
  private registSemanalSubscription: Subscription;

  private registreino: Registrotreino = {};
  private conclusaoSemanal: ConclusaoSemanal = {};

  private conclusaoSemanalId: string;
  private registroDeTreinosId: string;

  private dataAtual: Date = new Date();

  constructor(private alertController: AlertController, private toastCtrl: ToastController, private registreinoService: RegistroTreinoService, private authService: AuthService, private activatedRoute: ActivatedRoute) {

    this.registTreinosSubscription = this.registreinoService.getRegistrosDeTreinos().subscribe(data => {
      if (data.length > 0) {
        for (let i of data) {

          if (i.userId == this.authService.getAuth().currentUser.uid) {
            this.registreino = i;
          }
        }
      }
    });
    this.registSemanalSubscription = this.registreinoService.getConclusaoSemanal().subscribe(data => {
      if (data.length > 0) {
        for (let i of data) {

          if (i.userId == this.authService.getAuth().currentUser.uid) {
            this.conclusaoSemanal = i;
            
          }
        }
      }
    });
    
    //Instância do Id do objeto conclusão semanal
    if (this.conclusaoSemanal != null){
      this.registreinoService.getConclusaoSemanal().subscribe(id => {
        this.conclusaoSemanalId = id[0].id;
      });
    }

    //Instância do Id do objeto registro de treinos
    if (this.registreino != null){
      this.registreinoService.getRegistrosDeTreinos().subscribe(id => {
        this.registroDeTreinosId = id[0].id;
      });
    }

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.registTreinosSubscription.unsubscribe();
    this.registSemanalSubscription.unsubscribe();
  }

  atualizarConclusaoSemanal() {
    this.conclusaoSemanal.domingo = this.semana["Domingo"];
    this.conclusaoSemanal.segunda = this.semana["Segunda"];
    this.conclusaoSemanal.terca = this.semana["Terca"];
    this.conclusaoSemanal.quarta = this.semana["Quarta"];
    this.conclusaoSemanal.quinta = this.semana["Quinta"];
    this.conclusaoSemanal.sexta = this.semana["Sexta"];
    this.conclusaoSemanal.sabado = this.semana["Sabado"];
  }


  async registrarTreino() {
    
    let opc = await this.presentAlert('Registro de Treinos');
    if (opc) {
      if (this.registreino.ultimoDiaDeTreino != this.dataAtual.toLocaleDateString()) {

        if (this.registreino == {}) {

          this.atualizarPontuacao();
          this.atualizarNivel();
          this.atualizarOfensiva();
          this.registrarConclusaoSemanal();
          this.atualizarDiasDeTreino();
          this.registreino.userId = this.authService.getAuth().currentUser.uid;
          this.registreinoService.addRegistroDeTreino(this.registreino);
        } else {

          this.atualizarPontuacao();
          this.atualizarNivel();
          this.atualizarOfensiva();
          this.atualizarDiasDeTreino();
          this.registrarConclusaoSemanal();
          this.registreinoService.updateRegistroDeTreino(this.registroDeTreinosId, this.registreino);
        }
        this.registreino.ultimoDiaDeTreino = this.dataAtual.toLocaleDateString();

      } else {
        this.presentToast("Você já treinou hoje!");
      }
    }
  }

  registrarConclusaoSemanal() {

    this.atualizarConclusaoSemanal();
    this.conclusaoSemanal.userId = this.authService.getAuth().currentUser.uid;
    this.updateSemana(this.dias[this.dataAtual.getDay()]);

    if (this.conclusaoSemanal != null){
      this.registreinoService.updateConclusaoSemanal(this.conclusaoSemanalId, this.conclusaoSemanal);
    } else {

      this.registreinoService.addConclusaoSemanal(this.conclusaoSemanal);
    }
    

  }

  updateSemana(dia: string) {
    switch (dia) {
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
      case "Sabado": {
        this.conclusaoSemanal.sabado = true;
        break;
      }
    }
  }

  async registrarDescanso() {
    let opc = await this.presentAlert('Descansar');
    if (opc) {
      if (this.registreino.ultimoDiaDeTreino != this.dataAtual.toLocaleDateString()) {
        this.registreino.ultimoDiaDeTreino = this.dataAtual.toLocaleDateString();
        if (this.registreino.diasDeDescanso == 0 || this.registreino.diasDeDescanso == null) {
          this.registreino.diasDeDescanso = 1;
          this.registrarConclusaoSemanal();
          this.registreinoService.addRegistroDeTreino(this.registreino);
        } else {
          this.registreino.diasDeDescanso += 1;
          this.registrarConclusaoSemanal();
          this.registreinoService.updateRegistroDeTreino(this.registroDeTreinosId, this.registreino);
        }
      } else {
        this.presentToast("Você já treinou hoje, aproveite seu descanso!")
      }
    }
  }

  atualizarOfensiva() {
    var ofen: Number = this.registreino.ofensiva;
    var ontem = new Date;
    ontem.setDate(this.dataAtual.getDate() - 1);
    if (ofen == null) {
      this.registreino.ofensiva = 1;
    } else if (this.registreino.ultimoDiaDeTreino == "" + ontem.toLocaleDateString()) {
      this.registreino.ofensiva += 1;
    } else {
      this.registreino.ofensiva = 1;
    }
  }

  atualizarPontuacao() {
    var pont: Number = this.registreino.pontuacao;
    if (pont == null) {
      this.registreino.pontuacao = 20;
    } else {
      this.registreino.pontuacao += 20;
    }
  }

  atualizarDiasDeTreino() {
    var pont: Number = this.registreino.totalDeDiasDeTreino;
    if (pont == null) {
      this.registreino.totalDeDiasDeTreino = 1;
    } else {
      this.registreino.totalDeDiasDeTreino += 1;
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

  private presentAlert(msg: string): boolean | Promise<boolean> | Observable<boolean> {

    return new Promise((resolve: any, reject: any) => {
      this.alertController.create({
        header: msg,
        message: 'Clique Ok para confirmar!',
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
