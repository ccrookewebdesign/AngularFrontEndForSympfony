import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_HORIZONTAL },
    'pinch': { enable: false },
    'rotate': { enable: false }
  };
}

import { CharacterDescriptionPipe } from './character-description.pipe';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    CharacterDescriptionPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
