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
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb : FormBuilder, public alertController: AlertController, public navCtrl:NavController) {
        this.formularioRegistro = this.fb.group({
    'nombre': new FormControl("", Validators.required),
    'rut': new FormControl("", Validators.required),
    'correo': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
    'confirmarPassword': new FormControl("", Validators.required),
  })}

  ngOnInit() {
  }

 async registrar(){

    var f =this.formularioRegistro.value;
    var usuario ={
      nombre: f.nombre,
      rut: f.rut,
      correo: f.correo,
      password: f.password,
      confirmarPassword: f.confirmarPassword
    }

    if(this.formularioRegistro.valid){

      console.log("Registrando Credenciales del Usuario")
      const alert = await this.alertController.create({
        header: 'Datos Correctos has sido Registrado!!',
        message: 'Ahora puedes ingresar por el Login con tus credenciales ya Registradas',
        buttons: ['Aceptar']
      });
      localStorage.setItem('usuario',JSON.stringify(usuario));
      console.log(usuario)
      await alert.present();
      return;
  }



    if(this.formularioRegistro.invalid){
      console.log("Datos no Guardados, Vuelva a Ingresar los datos")
      const alert = await this.alertController.create({
        header: 'Datos Invalidos',
        message: 'Datos Invalidos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

  }

  }

