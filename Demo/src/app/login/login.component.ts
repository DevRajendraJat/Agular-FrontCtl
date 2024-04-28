import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form = {
    loginId: '',
    password: '',
    message: ''

  }
  inputerror: any = {};
  constructor(private router: Router, private httpService: HttpServiceService,private route:ActivatedRoute) {

  }ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.form.message=params['errorMessage'] || null;
    })
  }
 signIn() {
    if (this.form.loginId == 'admin' && this.form.password == 'admin') {
      this.router.navigateByUrl('welcome')
    } else {
      this.form.message = 'Invalid loginId & password'
    }
  }
  login() {
    var self = this;
    this.httpService.post('http://localhost:8080/Auth/login/', this.form, function (res: any) {
      console.log('response => ', res)
      if (res.success) {
        localStorage.setItem('fname', res.result.data.firstName);
        localStorage.setItem('lname', res.result.data.lastName);
        self.router.navigateByUrl('welcome');
      } else {
        self.form.message = res.result.message;
        if (res.result.inputerror) {
          self.inputerror = res.result.inputerror;
        }
      }
    })
  }
}