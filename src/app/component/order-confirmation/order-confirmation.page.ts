import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingConfirmPopupPage } from '../booking-confirm-popup/booking-confirm-popup.page';
import { Router } from '@angular/router'
@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {
  darDetails;
  user;
  constructor(private modalController: ModalController, private router: Router) {
      this.darDetails = this.router.getCurrentNavigation().extras.state.dar;
      this.darDetails['darTime'] = new Date(this.darDetails.darDate);
      this.user = this.router.getCurrentNavigation().extras.state.user
   }

  async BookingConfirmPopupPage() {
    const modal = await this.modalController.create({
      component: BookingConfirmPopupPage,
      cssClass: 'confirm-modal',
      componentProps:
      {
        darDetails: this.darDetails,
      },
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
