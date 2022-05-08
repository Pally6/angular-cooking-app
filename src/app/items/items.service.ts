import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth"

export class Item {
    body:string;
}

@Injectable ({providedIn: 'root'})
export class itemService {

    items: FirebaseListObservable<Item[]> = null;
    userId: string;

    constructor() {}

}