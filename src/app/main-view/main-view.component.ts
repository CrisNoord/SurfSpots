/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Marker } from '../models/marker.model';
import { Geolocation} from '@capacitor/core';
import { Observable } from 'rxjs';
import { Spot } from '../models/spot.model';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  
  @ViewChild('map', {static: true}) mapElement : ElementRef;

  public map: any;
  private initialPosition: Marker;
  private spotsList: Observable<Spot[]>;
  
  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getLocation();
    this.loadSpots();
  }

  private loadSpots() {
    this.spotsList = this.firestoreService.getSpotList().valueChanges();
    this.spotsList.subscribe((spots: Spot[]) => {
      spots.forEach(spot => {
        const newMarker: Marker = {
          position : {
            lat: spot.latitude,
            lng: spot.longitude
          },
          title: spot.name
        };
        this.addMarker(newMarker);
      });
    })
  }

  private async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    
    this.initialPosition = {
      position : {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      title: 'You are here!'
    };
    this.initMap();
    this.addMarker(this.initialPosition);
  }

  private initMap() {
    let coords = new google.maps.LatLng(this.initialPosition.position.lat, this.initialPosition.position.lng);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  private addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}

