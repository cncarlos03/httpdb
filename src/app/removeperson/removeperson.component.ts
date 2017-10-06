import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { IPerson } from '../interfaces/iperson';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Component({
  selector: 'app-removeperson',
  templateUrl: './removeperson.component.html',
  styleUrls: ['./removeperson.component.css']
})
export class RemovepersonComponent implements OnInit {
  baseURL = 'https://first-project-fe877.firebaseio.com';
  rootNode = 'people';
  refID: any;
  remove = true;
  constructor(private dbService: DbService) { }

  peopleCollection: Array<IPerson> = [];
  ngOnInit() {
     this.loadData(); 
  }

  loadData() { 
     this.dbService.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }
  deletingData(id) {
   
     
       this.dbService.deleteData(`${this.baseURL}/${this.rootNode}/${id}.json`)
       .subscribe(
         (response) => console.log(response),
        (error) => console.log(error)
       );
        
  }

}
