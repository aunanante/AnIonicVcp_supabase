import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private supabase: SupabaseClient;

  constructor( ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

   // Get Business Owner ID by Email
   async getBusinessOwnerIdByEmail(userEmail: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('business_owners')
      .select('id')
      .eq('email', userEmail)
      .single();

    if (error) {
      throw error;
    }

    return data ? data.id : null;
  }

  // Get All Commerces by Business Owner ID
  async getAllCommercesByBusinessOwnerId(businessOwnerId: string): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('commerces')
      .select('*')
      .eq('business_owner_id', businessOwnerId);

    if (error) {
      throw error;
    }

    return data || [];
  }

  // Create a new category
  async createCategory(categoryname: string, ville_id: number, business_owner_id: string, commerce_id: number): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .insert([
          {
            categoryname,
            ville_id,
            business_owner_id,
            commerce_id
          }
        ]);

      if (error) {
        throw error;
      }

      if (data) {
        return true; // Category created successfully
      } else {
        return false; // Category creation failed
      }
    } catch (error) {
      console.error('Error creating category:', error);
      return false;
    }
  }

  // Update an existing category
  async updateCategory(categoryname: string, ville_id: number, business_owner_id: string, commerce_id: number): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .upsert([
          {
            categoryname,
            ville_id,
            business_owner_id,
            commerce_id
          }
        ]);

      if (error) {
        throw error;
      }

      if (data) {
        return true; // Category updated successfully
      } else {
        return false; // Category update failed
      }
    } catch (error) {
      console.error('Error updating category:', error);
      return false;
    }
  }

  // Delete a category (provide category_id as an argument)
  async deleteCategory(categoryId: number): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) {
        throw error;
      }

      return true; // Category deleted successfully
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  // Get all categories by commerce_id
  async getAllCategoriesByCommerceId(commerce_id: number): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .select('*')
        .eq('commerce_id', commerce_id);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching categories by commerce_id:', error);
      return [];
    }
  }

  // Get category ID by category details
  async getCategoryIdBy(categoryname: string, ville_id: number, business_owner_id: string, commerce_id: number): Promise<number | null> {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .select('id')
        .eq('categoryname', categoryname)
        .eq('ville_id', ville_id)
        .eq('business_owner_id', business_owner_id)
        .eq('commerce_id', commerce_id);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        return data[0].id; // Return the first matching category's ID
      } else {
        return null; // Category not found
      }
    } catch (error) {
      console.error('Error fetching category ID:', error);
      return null;
    }
  }

  
  
}
