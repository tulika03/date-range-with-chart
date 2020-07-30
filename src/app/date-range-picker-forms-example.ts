import {Component, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Chart } from 'chart.js';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
/** @title Date range picker forms integration */
@Component({
  selector: 'date-range-picker-forms-example',
  templateUrl: 'date-range-picker-forms-example.html',
})
export class DateRangePickerFormsExample {
    chart: any;
  ageDataset : any = [];
  startDate : any = null;
  endDate: any = null;  
recievedDataSet = [];
chartData : [] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
//   @Output()
// dateChange(): EventEmitter<MatDatepickerInputEvent<D>>;
  ngOnInit() {

  let data : any  = [{
    id: 1, date: 1596097121000, age: 35, gestational: 33},
  {
    id: 2, date: 1594541921000, age: 92, gestational: 31},
  {
    id: 3, date: 1594455521000, age: 152, gestational: 31},
  {
    id: 4, date: 1593418721000, age: 168, gestational: 31}, 
  {
    id: 5, date: 1595837921000, age: 89, gestational: 34},
  {
    id: 6, date: 1592641121000, age: 169, gestational: 34},
  {
    id: 7, date: 1595837921000, age: 190, gestational: 36},
  {
    id: 8, date: 1595837921000, age: 90, gestational: 36},
  {
    id: 9, date: 1595492321000, age: 99, gestational: 36},
  {
    id: 9, date: 1593677921000, age: 109, gestational: 35}]
    this.recievedDataSet = data;
    this.ageDataset = data;
  this.getlabels();
  }

  get_age_chart() {
    this.chartData = [];
    this.chartData = this.ageDataset
     this.chart = new Chart('canvas', {
          type: 'doughnut',
          data: {
            labels: ['From 96h to 7d','From 96h to 7d', 'Greater than 7d'],
            datasets: [
              { 
                data: this.chartData,
                backgroundColor: ['rgb(242, 245, 60)','rgb(191, 191, 63)', 'rgb(246, 153, 54)'],
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: true
            },
            tooltips:{
              enabled:true
            }
          }
        });
  }

  getlabels() {
  let agelabel1Count  = this.ageDataset.filter(x => x['age'] < 96).length
  let agelabel2Count  = this.ageDataset.filter(x => x['age'] >= 96 && x['age'] <=168).length
  let agelabel3Count  = this.ageDataset.filter(x => x['age']> 168).length
  this.ageDataset = [];
  this.ageDataset.push(agelabel1Count)
  this.ageDataset.push(agelabel2Count)
  this.ageDataset.push(agelabel3Count)
  this.get_age_chart();
  }

getDate() {
  if(this.startDate != null && this.endDate != null && !this.range.controls.start.hasError('matStartDateInvalid') && !this.range.controls.end.hasError('matEndDateInvalid')) {
    let startDateVal = new Date(this.startDate).setDate(this.startDate.getDate() + 1);
    let endDateVal = new Date(this.endDate).setDate(this.endDate.getDate() + 1);;
  console.log("got date range as of now", this.startDate, this.endDate);
let new_dataset: any = this.recievedDataSet.filter(x => ((new Date(x['date']).getTime()) >= (this.startDate.getTime())) && ((new Date(x['date']).getTime()) <= (this.endDate.getTime())));
//  console.log(filteredDataSet)
//let new_dataset: [] = [];
// for(let i=0; i< this.recievedDataSet.length; i++) {
//  // console.log(new Date(this.recievedDataSet[i]['date']).getUTCDate())
//   if(((new Date(this.recievedDataSet[i]['date']).getTime()) >= (this.startDate.getTime())) && ((new Date(this.recievedDataSet[i]['date']).getTime()) <= (this.endDate.getTime()))) {
//     console.log("in range",  new Date(this.recievedDataSet[i]['date']))
//     new_dataset.push(this.recievedDataSet[i])
//   }
//   else {
//     console.log("nope")
//   }
// }
console.log("new Dataset", new_dataset)
this.ageDataset = [];
this.ageDataset = new_dataset;
  this.getlabels();
  }

}

}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */