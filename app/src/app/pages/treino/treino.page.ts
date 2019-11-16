import { Component, OnInit } from '@angular/core';
import { Treino } from 'src/app/interfaces/treino';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TreinoService } from 'src/app/services/treino.service';
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


  /** Add/Remove dinamicamente campos */
  public myForm: FormGroup;
  private numExercicios: number = 0;
  private chave: string;

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
    this.chavesExercicios.push("exercicio");
  }

  ngOnInit() {
  }


  addControl() {
    
    this.chave = 'exercicio' + this.numExercicios;
    this.chavesExercicios.push(this.chave);
    this.numExercicios++;
    this.myForm.addControl(this.chave, new FormControl('', Validators.required));
    
  }

  removeControl(control) {
    this.numExercicios--;
    this.chavesExercicios.pop();
    this.myForm.removeControl(control.key);
  }



  async salvarTreino() {
      
    await this.presentLoading();

    this.treino.userId = this.authService.getAuth().currentUser.uid;

    if (this.treinoId) {

    } else {
     
      this.treino.arquivado = false;
      
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
