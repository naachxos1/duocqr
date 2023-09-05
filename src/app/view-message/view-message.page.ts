import { DataService } from './../services/data.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import {  Message } from '../services/data.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  public DataService: any;
  constructor(
    private router:Router,
    private toastController:ToastController,
    private alertController:AlertController ,
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.message = this.data.getMessageById(parseInt(id, 10));
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }


  async mensajeToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present()
  }


  async deleteMessageById() {
    const alerta = await this.alertController.create({
      header: 'Eliminar el mensaje',
      message: 'Estás seguro que desea eliminar el mensaje?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            if (this.message && this.message.id !== undefined){
              this.data.deleteMessageById(this.message.id);
              this.router.navigate(['/home']);
              this.mensajeToast("mensaje Eliminado!");
            } else {

            }
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.mensajeToast("Acción cancelada!");
          }
        }
      ]
    });
    await alerta.present();
    let resultado = await alerta.onDidDismiss();
  }

}
