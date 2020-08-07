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
}
