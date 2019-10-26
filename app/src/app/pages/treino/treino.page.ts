import { Component, OnInit } from '@angular/core';
import { Treino } from 'src/app/interfaces/treino';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TreinoService } from 'src/app/services/treino.service';
import { Exercicio } from 'src/app/interfaces/exercicio';
import { Router } from '@angular/router';


@Component({
  selector: 'app-treino',
  templateUrl: './treino.page.html',
  styleUrls: ['./treino.page.scss'],
})
export class TreinoPage implements OnInit {

  private treino: Treino = {};
  private loading: any;
  private treinoId: string = null;

  /* Adição dos exercícios vinculados a fixa de treino */
  private exercicio: Exercicio = {};
  private exercicios: Array<string> = [];

  /** Add/Remove dinamicamente campos */
  public myForm: FormGroup;
  private numExercicios: number = 1;

  /** Array de chaves */
  private chavesExercicios: Array<string> = new Array;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private treinoService: TreinoService,
    private authService: AuthService
  ) {

    this.myForm = this.formBuilder.group({
      exercicio: ['', Validators.required],
    });
    

    this.treino.exercicios = [""];

  }

  ngOnInit() {
  }


  addControl() {
    this.numExercicios++;
    let chave = 'exercicio' + this.numExercicios;
    this.chavesExercicios.push(chave);
    this.myForm.addControl(chave, new FormControl('', Validators.required));
  }
  removeControl(control) {
    this.myForm.removeControl(control.key);
  }



  async salvarTreino() {
    await this.presentLoading();

    this.treino.userId = this.authService.getAuth().currentUser.uid;

    if (this.treinoId) {

    } else {
      
     
      for (let i of this.chavesExercicios){
        this.treino.exercicios.push(this.myForm.value[i]);
      }
      
      try {
        await this.treinoService.addTreino(this.treino);
        await this.loading.dismiss();

        this.router.navigateByUrl("", { skipLocationChange: true });
      } catch (error) {
        this.presentToast('Error ao tentar salvar!');
        this.loading.dismiss();
      }
    }
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...', });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2000
    });
    toast.present();
  }


}
