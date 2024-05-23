import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalServidoresFisicosComponent } from './modals/modal-servidores-fisicos/modal-servidores-fisicos.component';
import { TableModule } from 'primeng/table';
import { ModalCpuComponent } from './modals/modal-cpu/modal-cpu.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalMemoriaComponent } from './modals/modal-memoria/modal-memoria.component';
import { ModalDiscoComponent } from './modals/modal-disco/modal-disco.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalServidoresFisicosComponent,
    ModalCpuComponent,
    ModalMemoriaComponent,
    ModalDiscoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AccordionModule,
    BrowserAnimationsModule,
    KnobModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    NgxSpinnerModule
  ],
  providers: [
    provideClientHydration(),
    HttpClient,
    NgbActiveModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],

})
export class AppModule { }
