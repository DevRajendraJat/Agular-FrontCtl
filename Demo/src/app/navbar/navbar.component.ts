import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  form: any = {
    data: {}
  }

  constructor(private router: Router,private httpService:HttpServiceService) {
  }

  isLogin() {
    let check = localStorage.getItem('fname');
    if (check != "null" && check != null) {
      this.form.data.fname = localStorage.getItem("fname");
      this.form.data.lname = localStorage.getItem("lname");
      return true;
    } else {
      return false;
    }
  }

  logout() {
    var self=this;
    this.httpService.get('http://localhost:8080/Auth/logout/', function (res: any){
    localStorage.clear();
    self.router.navigateByUrl('/login')
  
  });
  
  }
}