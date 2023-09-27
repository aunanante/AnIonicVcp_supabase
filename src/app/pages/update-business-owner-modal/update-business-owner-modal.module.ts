import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBusinessOwnerModalPageRoutingModule } from './update-business-owner-modal-routing.module';

import { UpdateBusinessOwnerModalPage } from './update-business-owner-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateBusinessOwnerModalPageRoutingModule
  ],
  declarations: [UpdateBusinessOwnerModalPage]
})
export class UpdateBusinessOwnerModalPageModule {}
