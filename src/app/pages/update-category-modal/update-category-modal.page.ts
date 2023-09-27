import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from '../../services/category.service'; // Replace with the correct path


@Component({
  selector: 'app-update-category-modal',
  templateUrl: './update-category-modal.page.html',
  styleUrls: ['./update-category-modal.page.scss'],
})
export class UpdateCategoryModalPage implements OnInit {

  @Input() categoryData: any;

  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService // Inject your CategoryService
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async updateCategory() {
    try {
      // Call the updateCategory method of your CategoryService
      await this.categoryService.updateCategory(
        this.categoryData.categoryname,
        this.categoryData.ville_id,
        this.categoryData.business_owner_id,
        this.categoryData.commerce_id
      );

      // Dismiss the modal with a "true" value to indicate success
      this.modalController.dismiss(true);
    } catch (error) {
      console.error('Error updating category:', error);
      // You can handle errors here, e.g., show an error message to the user
    }
  }

  ngOnInit() {
  }

}
