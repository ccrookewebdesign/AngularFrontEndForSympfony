import { Component } from '@angular/core';

import { environment } from '../environments/environment';

import { MarvelService } from './marvel.service';
import { Character} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  thisYear = new Date().getFullYear();
  alphabetArray: string[] = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];
  characters: Character[] = [];
  totalCharacters: number = 0;
  limit: number = environment.pageSize;
  offset: number = 0;
  prefix: string = '';
  imgFilter: boolean = true;
  showSpinner: boolean = false;
    
  constructor(private marvel: MarvelService) {}

  ngOnInit() {
    this.refreshCharacters();
  }

  refreshCharacters(prefix = null, offset = 0) {
    this.showSpinner = true;
    this.marvel.getCharacters(this.limit, prefix, offset).subscribe(data => {
      console.log('data', data);
      this.characters = data.data.results;
      if(this.imgFilter) {
        this.characters = this.characters.filter(character => !character.thumbnail.path.includes('image_not_available'));
      }
      this.totalCharacters = data.data.total;
      this.showSpinner = false;
    });
  }

  minusOffset(offset: number) {
    if(this.offset > 0) {
      this.offset -= offset;
      this.refreshCharacters(this.prefix, this.offset);
    }
  }

  plusOffset(offset: number) {
    if((this.offset + offset) <= this.totalCharacters && this.totalCharacters > this.limit) {
      this.offset += offset;
      this.refreshCharacters(this.prefix, this.offset);
    }    
  }

  clearFilter() {
    this.offset = 0;
    this.refreshCharacters();
  }

  alphaFilter(letter) {
    this.offset = 0;
    this.prefix = letter;
    this.refreshCharacters(this.prefix, this.offset);
  }

  searchOnEnterBtn(e) {
    if(e.keyCode == 13) {
      this.searchFilter(this.prefix);
    } 
  }

  searchFilter(searchTerm) {
    this.offset = 0;
    this.prefix = searchTerm;
    this.refreshCharacters(this.prefix, this.offset);
  }

  photoFilter() {
    this.offset = 0;
    this.refreshCharacters(this.prefix, this.offset);
  }
  
  goToCharacter(url) {
    window.location.href = url;
  }

}
