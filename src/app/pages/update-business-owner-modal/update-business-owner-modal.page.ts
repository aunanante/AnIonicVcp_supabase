import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-business-owner-modal',
  templateUrl: './update-business-owner-modal.page.html',
  styleUrls: ['./update-business-owner-modal.page.scss'],
})
export class UpdateBusinessOwnerModalPage implements OnInit {

  @Input() businessOwnerData: any;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  confirm() {
    // Handle confirmation logic here (e.g., update the record)
    // Once the operation is complete, close the modal
    this.modalController.dismiss(true);
  }

  ngOnInit() {
  }

}
