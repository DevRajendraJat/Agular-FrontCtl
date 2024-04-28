import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  form: any = {
    searchParams: {},
    deleteParams: {},
    pageNo: 0,
    list: [],
    preload: [],
    message: '',

  }


  constructor(private httpService: HttpServiceService, private route: Router) {

  }
  ngOnInit(): void {
    this.preload();
    this.search();
  }
  next() {
    this.form.pageNo++;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }
  previous() {
    this.form.pageNo--;
    console.log('pageNo => ', this.form.pageNo)
    this.search();
  }

  preload() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/preload', function (res: any) {
      self.form.preload = res.result;
    })
  }
  edit(page: any) {
    this.route.navigateByUrl(page);
  }
  onCheckboxChange(userId: number) {
    console.log('Checkbox with ID', userId, 'is checked/unchecked');
    this.form.deleteParams.id = userId;
  }
  search() {
    console.log('dob =>', this.form.searchParams.dob)
    var self = this;
    this.httpService.post('http://localhost:8080/User/search/' + this.form.pageNo, this.form.searchParams, function (res: any) {
      self.form.list = res.result.data;
    })
  }
  delete() {
    var self = this;
    this.httpService.get('http://localhost:8080/User/delete/' + this.form.deleteParams.id, function (res: any) {
      self.form.message = res.result.message;
      console.log('message => ', self.form.message)
      self.form.pageNo = 0;
      self.search();
    });

  }
}

