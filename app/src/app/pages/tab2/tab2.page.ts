import { Component, OnInit } from '@angular/core';
import { Registrotreino } from 'src/app/interfaces/registrotreino';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


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

  private registreino: Registrotreino = {};

  constructor(private alertController: AlertController) {

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
      this.registreino.pontuacao = 0;
    } else {
      this.registreino.pontuacao += 20;
    }
  }


  async novoRegistroTreino() {

    let opc = await this.presentAlert();
    if (opc && !this.registreino.treinou) {

      this.registreino.treinou = true;
      this.registreino.semana = [""];

      let dataAtual = new Date();
      this.semana[this.dias[dataAtual.getDay()]] = true;

      for (let a of this.dias) {
        this.registreino.semana.push(this.semana[a]);
      }

      this.atualizarPontuacao();
      this.atualizarNivel();

    }
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
