import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

formularioLogin: FormGroup;

  constructor(public fb : FormBuilder, public alertController: AlertController, public navCtrl:NavController) {

    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    })
   }

  ngOnInit() {
  }

   async ingresar(){

    console.log("Validando Credenciales del Usuario")
    var f =this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario'); // siempre el mismo problema al manejar el storage, cuando no se encuentra el valor en localStorage hay que hacerlo de este modo


    if (usuarioString !== null) {

      var usuario = JSON.parse(usuarioString);

      if (usuario.correo == f.correo && usuario.password == f.password) {
        console.log('Ingresado');
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('home')

      } else {

        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Tienes que llenar todos los datos',
          buttons: ['Aceptar'],
        });

        await alert.present();
      }

}
}
}
