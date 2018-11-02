import { Component } from '@angular/core';

import { environment } from '../environments/environment';

import { trigger, transition, animate, keyframes } from '@angular/animations';
import { slideOutLeft, slideOutRight } from './router.transition';

import { MarvelService } from './marvel.service';
import { Character} from './interfaces';

@Component({
  selector: 'app-root',
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutLeft', animate(300, keyframes(slideOutLeft))),
      transition('* => slideOutRight', animate(300, keyframes(slideOutRight)))
    ])
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  thisYear = new Date().getFullYear();
  alphabetArray: string[] = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];
  characters: Character[] = [];
  allCharacters: Character[] = [];
  allCharactersSorted: boolean = false;
  totalCharacters: number = 0;
  limit: number = environment.pageSize;
  offset: number = 0;
  prefix: string = '';
  imgFilter: boolean = false;
  showSpinner: boolean = false;
  animationState: string;
  callLimitReached: boolean = false;
    
  constructor(private marvel: MarvelService) {}

  async ngOnInit() {
    
    await this.getCharactersFromService();
    if(!this.callLimitReached) {
      this.loadCharacters();
    }
  }

  refreshCharacters(prefix = null, offset = 0) {
    if(this.allCharacters.length >= 1400) {
      if (!this.allCharactersSorted) this.sortCharacters();
      this.getCharacters(prefix, offset);
    } else {
      if(!this.callLimitReached) {
        this.getCharactersFromService(prefix, offset);
      }      
    }
    console.log('characters', this.characters);
  }

  getCharacters(prefix = null, offset = 0) {
    this.showSpinner = true;
    let newCharacterArray: Character[] = this.allCharacters;
    let tmpArray: Character[];

    if(prefix !== null) {
      tmpArray = newCharacterArray.filter(
        character => character.name.toLowerCase().startsWith(prefix.toLowerCase())
        //character => character.name.toLowerCase().includes(prefix.toLowerCase())
      );
      newCharacterArray = tmpArray;
    }
    if(this.imgFilter) {
      tmpArray = newCharacterArray.filter(
        character => !character.thumbnail.path.includes('image_not_available')
      );
      newCharacterArray = tmpArray;
    }
    this.totalCharacters = newCharacterArray.length;
    this.characters = newCharacterArray.slice(offset, offset + this.limit);
    this.showSpinner = false;
  }

  getCharactersFromService(prefix = null, offset = 0) {
    this.showSpinner = true;
    this.marvel.getCharacters(this.limit, prefix, offset).subscribe(data => {
      this.characters = data.data.results;      
      if(this.imgFilter) {
        this.characters = this.characters.filter(character => !character.thumbnail.path.includes('image_not_available'));
      }
      this.totalCharacters = data.data.total;
      this.showSpinner = false;
    },
    err => {
      this.callLimitReached = true;
      this.showSpinner = false;
      console.log('err', err);
    });
  }
  
  loadCharacters() {
    let startRow = 0;
    if(!this.callLimitReached) {
      for(let i = 0; i <= 14; i++) {
        if(!this.callLimitReached) {
          this.marvel.getCharacters(100, null, startRow).subscribe(data => {
            console.log('data', data);
            this.allCharacters = [...this.allCharacters, ...data.data.results];
          },
          err => {
            this.callLimitReached = true;
            console.log('err', err);
          });
          startRow += 100;      
        }
      }    
    }
  }

  sortCharacters() {
    this.allCharacters.sort(
      (a,b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase())
    );
    this.allCharactersSorted = true;
  }

  /* startAnimation(state) {
    if(!this.animationState) {
      this.animationState = state;
      if (state === 'slideOutLeft') {
        console.log('minusOffset');
        this.plusOffset();
      } else {
        console.log('plusOffset');
        this.minusOffset();
      }
    }
  } */

  resetAnimation() {
    this.animationState = '';
  }

  minusOffset(offset: number = this.limit) {
    if(this.offset > 0) {
      /* if(!this.animationState) {
        this.animationState = 'slideOutRight';
      } */
      this.offset -= offset;
      this.refreshCharacters(this.prefix, this.offset);
    }
  }

  plusOffset(offset: number = this.limit) {
    if((this.offset + offset) < this.totalCharacters && this.totalCharacters > this.limit) {
      /* if(!this.animationState) {
        this.animationState = 'slideOutLeft';
      } */
      this.offset += offset;
      this.refreshCharacters(this.prefix, this.offset);
    }    
  }

  searchOnEnterBtn(e) {
    if(e.keyCode == 13) {
      this.alphaFilter(this.prefix);
    } 
  }

  alphaFilter(letter) {
    this.offset = 0;
    this.prefix = letter;
    this.refreshCharacters(this.prefix, this.offset);
  }

  photoFilter(e) {
    this.offset = 0;
    this.refreshCharacters(this.prefix, this.offset);
  }

  clearFilter() {
    this.offset = 0;
    this.prefix = '';
    this.imgFilter = false;
    this.refreshCharacters();
  }
  
  goToCharacter(url) {
    window.open(url, '_blank');
  }

}


