import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from '../../services/category.service'; // Replace with the correct path

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.page.html',
  styleUrls: ['./create-category-modal.page.scss'],
})
export class CreateCategoryModalPage implements OnInit {
  @Input() categoryData: any;

  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async createCategory() {
    try {
      // Call the createCategory method of your CategoryService
      await this.categoryService.createCategory(
        this.categoryData.categoryname,
        this.categoryData.ville_id,
        this.categoryData.business_owner_id,
        this.categoryData.commerce_id
      );

      // Dismiss the modal with a "true" value to indicate success
      this.modalController.dismiss(true);
    } catch (error) {
      console.error('Error creating category:', error);
      // You can handle errors here, e.g., show an error message to the user
    }
  }

  ngOnInit() {
  }

}
