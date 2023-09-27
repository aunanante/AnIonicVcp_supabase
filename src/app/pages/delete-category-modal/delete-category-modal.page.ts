import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from '../../services/category.service'; // Replace with the correct path


@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.page.html',
  styleUrls: ['./delete-category-modal.page.scss'],
})
export class DeleteCategoryModalPage implements OnInit {

  @Input() categoryData: any;

  constructor(
    private modalController: ModalController,
    private categoryService: CategoryService // Inject your CategoryService
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async deleteCategory() {
    try {
      // Call the getCategoryIdBy method of your CategoryService to retrieve the categoryId
      const categoryId = await this.categoryService.getCategoryIdBy(
        this.categoryData.categoryname,
        this.categoryData.ville_id,
        this.categoryData.business_owner_id,
        this.categoryData.commerce_id
      );

      // Check if categoryId is not null before proceeding
      if (categoryId !== null) {
        // Now, you have the categoryId, you can call deleteCategory with it
        await this.categoryService.deleteCategory(categoryId);

        // Dismiss the modal with a "true" value to indicate success
        this.modalController.dismiss(true);
      } else {
        console.error('Category ID is null.');
        // Handle the case where categoryId is null, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      // You can handle errors here, e.g., show an error message to the user
    }
  }
  
  ngOnInit() {
  }

}
