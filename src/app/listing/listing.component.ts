import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { IPerson } from '../interfaces/iperson';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 

import { PagerService } from '../services/pager.service';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
  @Output() modifyClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Input() update: boolean;
  @Input() delete: boolean;

  baseURL = 'https://first-project-fe877.firebaseio.com';
  rootNode = 'people';

  peopleCollection: Array<IPerson> = [];

  constructor(private dbservice: DbService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() { 
     this.dbservice.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }

  modifyData(dataID) {
    // console.log(dataID);
    this.modifyClicked.emit(dataID);
  }
 
//-----------------------------------------------------

  deleteData(dataID) {
    // console.log(dataID);
    this.deleteClicked.emit(dataID);
  }


//-----------------------------------------------------
}