import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { Spot } from '../models/spot.model';


@Component({
    selector: 'spot-form',
    templateUrl: './spot-form.component.html',
    styleUrls: ['./spot-form.component.scss'],
  })
  export class SpotFormComponent implements OnInit {
    private spotForm: FormGroup

    constructor(private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private firestoreService: FirestoreService,
        private formBuilder: FormBuilder,
        private router: Router) { 
          this.spotForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            latitude: [0, Validators.required],
            longitude: [0, Validators.required],
            type: ['', Validators.required]
            });
        }

    ngOnInit() {
      
    } 

    public async submitSpot() {
        const loading = await this.loadingCtrl.create();
      
        const name = this.spotForm.value.name;
        const description = this.spotForm.value.description;
        const latitude = this.spotForm.value.latitude;
        const longitude = this.spotForm.value.longitude;
        const type = this.spotForm.value.type;
        const body: Spot = {
            name,
            description,
            latitude,
            longitude,
            type
        };

        this.firestoreService
        .createSpot(body)
        .then(
        () => {
            this.spotForm = this.formBuilder.group({
                name: ['', Validators.required],
                description: ['', Validators.required],
                latitude: [0, Validators.required],
                longitude: [0, Validators.required],
                type: ['', Validators.required]
                });
            loading.dismiss().then(() => {
            this.router.navigateByUrl('');
            });
        },
        error => {
            console.error(error);
        }
        );
        return await loading.present();
    }
  }  
