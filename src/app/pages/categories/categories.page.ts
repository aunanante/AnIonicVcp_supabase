import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'; // Replace with the correct path
import { UserService } from '../../services/user.service'; // Replace with the correct path
import { ModalController } from '@ionic/angular';
import { CreateCategoryModalPage } from '../create-category-modal/create-category-modal.page'; // Update the path
import { UpdateCategoryModalPage } from '../update-category-modal/update-category-modal.page'; // Update the path
import { DeleteCategoryModalPage } from '../delete-category-modal/delete-category-modal.page'; // Update the path


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  commerces: any[] = [];
  selectedCommerce: any = null; // Track the selected commerce
  categories: any[] = [];
  selectedCategory: any = null;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadCommercesForCurrentUser();
  }

  async loadCommercesForCurrentUser() {
    try {
      const userEmail = await this.getCurrentLoggedInUserEmail();
      if (userEmail !== null) {
        const businessOwnerId = await this.getBusinessOwnerIdByEmail(userEmail);
        if (businessOwnerId !== null) {
          this.commerces = await this.getAllCommercesByBusinessOwnerId(businessOwnerId);
          if (this.commerces.length > 0) {
            // Select the first commerce and load its categories
            this.selectCommerce(this.commerces[0]);
          }
        } else {
          console.error('Business owner ID not found.');
        }
      } else {
        console.error('User email not found.');
      }
    } catch (error) {
      console.error('Error loading commerces:', error);
    }
  }
  

  async getCurrentLoggedInUserEmail(): Promise<string | null> {
    const userEmail = await this.userService.getCurrentUserEmail(); // Use userService to get the user's email
    return userEmail;
  }
  

  async getBusinessOwnerIdByEmail(userEmail: string): Promise<string | null> {
    try {
      const businessOwnerId = await this.categoryService.getBusinessOwnerIdByEmail(userEmail);
      return businessOwnerId;
    } catch (error) {
      console.error('Error fetching business owner ID:', error);
      return null;
    }
  }

  async getAllCommercesByBusinessOwnerId(businessOwnerId: string): Promise<any[]> {
    try {
      const commerces = await this.categoryService.getAllCommercesByBusinessOwnerId(businessOwnerId);
      return commerces;
    } catch (error) {
      console.error('Error fetching commerces:', error);
      return []; // Return an empty array in case of an error
    }
  }
  
  // Method to select a commerce and load its categories
  async selectCommerce(commerce: any) {
    this.selectedCommerce = commerce;
    this.loadCategoriesByCommerceId(commerce.id);
  }

  async loadCategoriesByCommerceId(commerceId: number) {
    try {
      this.categories = await this.categoryService.getAllCategoriesByCommerceId(commerceId);
    } catch (error) {
      console.error('Error loading categories for commerce:', error);
    }
  }

  async openCreateCategoryModal() {
    const modal = await this.modalController.create({
      component: CreateCategoryModalPage,
      componentProps: {
        categoryData: {
          categoryname: '', // Initialize with default values or leave empty
          ville_id: this.selectedCommerce.ville_id,
          business_owner_id: this.selectedCommerce.business_owner_id,
          commerce_id: this.selectedCommerce.id,
        },
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data === true) {
        // The modal was dismissed with a "true" value, indicating that the category was created.
        // You can update your categories list or perform any other necessary actions here.
      }
    });

    return await modal.present();
  }

  async openUpdateCategoryModal() {
    const modal = await this.modalController.create({
      component: UpdateCategoryModalPage,
      componentProps: {
        categoryData: {
          categoryname: '', // Initialize with default values or leave empty
          ville_id: this.selectedCommerce.ville_id,
          business_owner_id: this.selectedCommerce.business_owner_id,
          commerce_id: this.selectedCommerce.id,
        },
      },
    });
    return await modal.present();
  }

  async openDeleteCategoryModal() {
    const categoryId = await this.categoryService.getCategoryIdBy(
      this.selectedCategory.categoryname,
      this.selectedCommerce.ville_id,
      this.selectedCommerce.business_owner_id,
      this.selectedCommerce.id 
    );

    if (categoryId !== null) {
      const modal = await this.modalController.create({
        component: DeleteCategoryModalPage,
        componentProps: {
          categoryId: categoryId // Pass the category ID to the modal
        },
      });
      return await modal.present();
    } else {
      console.error('Category not found.');
    }
  }

  // Implement a method to set the selected category
  setSelectedCategory(category: any) {
    this.selectedCategory = category;
  }

  resetForm() {
    
  }

}


