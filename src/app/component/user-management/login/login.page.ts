import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PhoneValidator } from '../validators/phone.validator';
import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login_form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.login_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required),

    });

   // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
    ]
  };

  onLogin(values){
      if (this.login_form.invalid) {
            return;
      }
      this.loading = true;
      this.authenticationService.login(values.username, values.password)
        //  .pipe(first())
          .subscribe(
              data => {
                  console.log(data);
                  debugger;
                  if(this.returnUrl){
                    this.router.navigate([this.returnUrl]);
                  } else {
                      this._getHomePageUrl();
                  }

              })
  }

  goToSignup(){
    this.router.navigate(["/signup"]);
  }

  _getHomePageUrl(){

    let user = this.authenticationService.currentUserValue

      debugger;
      for (let r of user.roles) {
         if(r.role === "SERVICE_PROVIDER"){
          // this.router.navigate(['/track-time']);
            this.router.navigate(['/tabs/home/service-provider'])
            break;
         }
        if(r.role === "ADMIN"){
            this.router.navigate(['/tabs/home/admin']);
            break;
        }
        if(r.role === "DOCTOR"){
            // this.router.navigate(['/track-time']);
            break;
        }
        this.router.navigate(['/']);
      }
  }


}
