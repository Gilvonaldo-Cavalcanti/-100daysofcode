import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsSync__POST_R3__ } from '@angular/core';
import { Treino } from 'src/app/interfaces/treino';
import { LoadingController, ToastController, PickerController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PickerOptions } from '@ionic/core';


@Component({
  selector: 'app-treino',
  templateUrl: './treino.page.html',
  styleUrls: ['./treino.page.scss'],
})
export class TreinoPage implements OnInit {

  private treino: Treino = {};

  private loading: any;
  private voltas = '';
  private series = '';
  /** Add/Remove dinamicamente campos */
  public myForm: FormGroup;
  private numExercicios: number = 1;


  constructor(
    private pickerCtrl: PickerController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {

    this.myForm = formBuilder.group({
      exercicio: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async showBasicPicker() {

    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Selecionar',
          role: 'Done'
        }
      ],
      columns: [
        {
          name: 'voltas',
          options: [
            { text: '1 volta', value: '1' },
            { text: '2 volta', value: '2' },
            { text: '3 volta', value: '3' },
            { text: '4 volta', value: '4' },
            { text: '5 volta', value: '5' },
            { text: '6 volta', value: '6' },
            { text: '7 volta', value: '7' },
            { text: '8 volta', value: '8' },
            { text: '9 volta', value: '9' },
            { text: '10 volta', value: '10' },
          ]
        },
        {
          name: 'series',
          options: [
            { text: 'Uma', value: '1' },
            { text: 'Duas', value: '2' },
            { text: 'Tres', value: '3' },
            { text: 'Quatro', value: '4' },
            { text: 'Cinco', value: '5' },
            { text: 'Seis', value: '6' },
            { text: 'Sete', value: '7' },
            { text: 'Oito', value: '8' },
            { text: 'Nove', value: '9' },
            { text: 'Dez', value: '10' },
            { text: 'Onze', value: '11' },
            { text: 'Doze', value: '12' },
            { text: 'Treze', value: '13' },
            { text: 'Quatorze', value: '14' },
            { text: 'Quinze', value: '15' },
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      /*
      let col = await picker.getColumn('series');
      console.log('col:', col);
      this.framework = col.options[col.selectedIndex].text;
      */

      let quantVoltas = await picker.getColumn('voltas');
      let quantSeries = await picker.getColumn('series');
      console.log('series:', quantSeries.selectedIndex, 'voltas:', quantVoltas.selectedIndex);

      return [quantSeries.selectedIndex, quantVoltas.selectedIndex];
      //let selecionado: {quantVoltas.selectedIndex.text, quantSeries.selectedIndex.text};
      //return 
      //this.framework = col1.options[col.selectedIndex].text;

    }
    )
  }


  addControl() {
    this.numExercicios++;
    this.myForm.addControl('exercicio' + this.numExercicios, new FormControl('', Validators.required));
  }
  removeControl(control) {
    this.myForm.removeControl(control.key);
  }

  async salvarTreino() {
    await this.presentLoading();
    this.treino.userId = this.authService.getAuth().currentUser.uid;
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
