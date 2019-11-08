import { Component, OnInit } from '@angular/core';
import { Registrotreino } from 'src/app/interfaces/registrotreino';
import { Subscription, Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { RegistroTreinoService } from 'src/app/services/registro-treino.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  private dias = ["Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"];
  private semana = {
    "Domingo": false, "Segunda": false, "Terca": false,
    "Quarta": false, "Quinta": false, "Sexta": false, "Sabado": false
  };

  private registrosDeTreinos: Array<Registrotreino>;
  private registTreinosSubscription: Subscription;  
  private registreino: Registrotreino = {};

  constructor(private alertController: AlertController, private toastCtrl: ToastController, private registreinoService: RegistroTreinoService, private authService: AuthService,) {

    this.registTreinosSubscription = this.registreinoService.getRegistrosDeTreinos().subscribe(data => {
      this.registrosDeTreinos = data;
    }
    )
    
  }

  ngOnInit() { }

  getRegistroDeTreinos() {

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

  atualizarPontuacao() {

    var pont: Number = this.registreino.pontuacao;

    if (pont == null) {
      this.registreino.pontuacao = 20;
    } else {
      this.registreino.pontuacao += 20;
    }
  }


  async novoRegistroTreino() {

    let dataAtual = new Date();
    this.registreino.datas = [""];
    this.registreino.semana = [""];

    if (!this.registreino.datas.includes(this.semana[this.dias[dataAtual.getDay()]])){
    
      let opc = await this.presentAlert();
    
      if (opc) {

        this.registreino.datas.push(this.semana[this.dias[dataAtual.getDay()]]);
    
        this.semana[this.dias[dataAtual.getDay()]] = true;

        for (let a of this.dias) {
          this.registreino.semana.push(this.semana[a]);
        }
        this.atualizarPontuacao();
        this.atualizarNivel();

        try {
          this.registreino.userId = this.authService.getAuth().currentUser.uid;
          await this.registreinoService.addRegistroDeTreinos(this.registreino);
        } catch (error){
          this.presentToast("Erro ao salvar");
        }
        
      }
    } else {
      this.presentToast("Você já treinou hoje!");
    }
  }

  async descanso(){

    let dataAtual = new Date();
    this.registreino.datas = [""];
    this.registreino.semana = [""];

    if (!this.registreino.datas.includes(this.semana[this.dias[dataAtual.getDay()]])){
    
      let opc = await this.presentAlert();
    
      if (opc) {

        this.registreino.datas.push(this.semana[this.dias[dataAtual.getDay()]]);
    
        this.semana[this.dias[dataAtual.getDay()]] = true;
      }
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
