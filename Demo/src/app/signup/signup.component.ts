import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: any = {
    data: {},
    message: "",
  }
  inputerror: any = {}

  constructor(private httpclient: HttpClient) {

  }
  signUp() {
    var self = this;
    this.httpclient.post('http://localhost:8080/Auth/signUp', this.form.data).subscribe((res: any) => {
      self.form.message = res.result.message;
    })
  }
}
