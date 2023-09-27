import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-villes-commerces',
  templateUrl: './villes-commerces.page.html',
  styleUrls: ['./villes-commerces.page.scss'],
})
export class VillesCommercesPage implements OnInit {

  villes: any[] = [];
  filteredVilles: any[] = [];
  alternateColor = false;

  constructor(
    private router: Router,
    private userService: UserService
    
    ) {

  }

  ngOnInit() {
    this.loadVilles();
  }

  async loadVilles() {
    this.villes = await this.userService.getAllVilles();
    this.filteredVilles = [...this.villes];
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  onSearchQueryChange(event: any) {
    const searchQuery = event.target.value;
    // console.log('Search query:', searchQuery);
    this.filteredVilles = this.villes.filter(ville =>
      ville.villename.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  
  }

  async selectVille(ville: any) {
    
  }

  toggleAlternateColor() {
    this.alternateColor = !this.alternateColor;
    console.log('Alternate Color Toggled: ', this.alternateColor);
  }

  getItemClass(index: number): string {
    return index % 2 === 0 ? 'even-item' : 'odd-item';
  }
  

}
