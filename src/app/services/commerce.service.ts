import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  private supabase: SupabaseClient;

  constructor( ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async createCommerce(commerceData: any): Promise<any> {
    try {
      const { data, error } = await this.supabase.from('commerces').insert([commerceData]);
      if (error) {
        console.error('Error creating commerce:', error.message);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
 
  async getCommerceIdByCommerce(commerce: any): Promise<number | null> {
    try {
      const { data: foundCommerce, error } = await this.supabase
        .from('commerces')
        .select('id')
        .eq('commercename', commerce.commercename)
        .eq('services', commerce.services)
        .eq('ville_id', commerce.ville_id)
        .eq('business_owner_id', commerce.business_owner_id)
        .single(); // Use single() if you expect only one result
  
      if (error) {
        console.error('Error fetching commerce:', error.message);
        return null;
      }
  
      return foundCommerce ? foundCommerce.id : null;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async getCommercesByCurrentUser(currentUserEmail: string): Promise<any[]> {
    try {
      // Step 1: Retrieve the business owner ID of the current user
      const businessOwner = await this.getBusinessOwnerByEmail(currentUserEmail);
  
      if (!businessOwner) {
        // No business owner found for the current user
        return [];
      }
  
      const currentBusinessOwnerId = businessOwner.id;
  
      // Step 2: Retrieve all commerces owned by the current business owner
      const { data: commerces, error } = await this.supabase
        .from('commerces')
        .select('*')
        .eq('business_owner_id', currentBusinessOwnerId);
  
      if (error) {
        console.error('Error fetching commerces:', error.message);
        return [];
      }
  
      return commerces || [];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  // Helper method to retrieve a business owner by email
  async getBusinessOwnerByEmail(email: string): Promise<any | null> {
    try {
      const { data, error } = await this.supabase
        .from('business_owners')
        .select('*')
        .eq('email', email);
  
      if (error) {
        console.error('Error fetching business owner:', error.message);
        return null;
      }
  
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Fetch commerces by business_owner_id
  async getCommercesByBusinessOwner(businessOwnerId: string): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('commerces')
        .select('*')
        .eq('business_owner_id', businessOwnerId);

      if (error) {
        console.error('Error fetching commerces:', error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Update an existing commerce owned by the current business owner
  async updateCommerce(commerceId: number, commerceData: any): Promise<any> {
    try {
      // Perform an update query to update the commerce record
      const { data, error } = await this.supabase
        .from('commerces')
        .update(commerceData)
        .eq('id', commerceId);

      if (error) {
        console.error('Error updating commerce:', error.message);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // Delete a commerce owned by the current business owner
  async deleteCommerce(commerceId: number): Promise<void> {
    try {
      // Perform a delete query to delete the commerce record
      const { error } = await this.supabase
        .from('commerces')
        .delete()
        .eq('id', commerceId);

      if (error) {
        console.error('Error deleting commerce:', error.message);
        throw error;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  

  
}
