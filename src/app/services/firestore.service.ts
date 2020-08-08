import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Spot } from '../models/spot.model';

@Injectable()
export class FirestoreService {

    constructor(private angularFirestore: AngularFirestore) { 
    }

    public getSpotList(): AngularFirestoreCollection<Spot> {
        return this.angularFirestore.collection(`spots`);
      }

    public createSpot(
        data: Spot
      ): Promise<void> {
        const id = this.angularFirestore.createId();
      
        return this.angularFirestore.doc(`spots/${id}`).set({
          id,
          name: data.name,
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude,
          type: data.type
        });
    }
}

