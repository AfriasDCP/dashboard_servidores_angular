import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AccordionModule,
    BrowserAnimationsModule,
    KnobModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
