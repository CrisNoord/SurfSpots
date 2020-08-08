import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { SpotFormComponent } from '../spot-form/spot-form.component';
import { FirestoreService } from '../services/firestore.service';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab2PageRoutingModule
  ],
  declarations: [
    Tab2Page,
    SpotFormComponent
  ],
  providers: [FirestoreService]
})
export class Tab2PageModule {}
