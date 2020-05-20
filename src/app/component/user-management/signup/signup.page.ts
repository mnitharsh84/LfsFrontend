import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PhoneValidator } from '../validators/phone.validator';
import { PasswordValidator } from '../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/service/rest-api.service';
import { AuthenticationService } from '../_services';
import { Signup } from 'src/app/component/user-management/_models';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
//https://github.com/ionicthemes/ionic-forms-and-validations/tree/master/src/app
export class SignupPage implements OnInit {

  signup_form: FormGroup;
  matching_passwords_group: FormGroup;
  //country_phone_group: FormGroup;

  countries: Array<CountryPhone>;
  genders: Array<string>;
  states:  [];
  cities: [];
  selectedState: null;
  selectedCity: null;
  roles: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private restApiService: RestApiService,
     private authenticationService: AuthenticationService
  ) { }


  onChangeState() {
   // debugger;
    let stateId = this.selectedState;
    if (stateId) {
      this.restApiService.getCities(stateId).subscribe(
        data => {
              this.cities = data.cities
              console.log(data.cities);
        }
      );
    } else {
      this.cities = [];
    }
  }

  ngOnInit() {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
     // debugger;
  //https://www.truecodex.com/course/angular-6/cascading-or-dependent-dropdown-list-country-state-city-in-angular-6-7
     this.restApiService.getStates().subscribe(
        data => {
          this.states = data.states;
          console.log(data);
        }
      );

    this.genders = [
      "Male",
      "Female"
    ];

    this.roles = [
      "ADMIN",
      "DOCTOR",
      "SERVICE_PROVIDER"
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.signup_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      mobile_number: new FormControl('', Validators.required),
      matching_passwords: this.matching_passwords_group,
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'state': [
       { type: 'required', message: 'Name is required.' }

    ],
    'city': [
       { type: 'required', message: 'Name is required.' }

    ],
    'role': [
       { type: 'required', message: 'Name is required.' }

    ],
    'fullname': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'mobile_number': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  onSubmit(values){
  debugger;


    let signup = new Signup();
    signup.username = values.username;
    signup.email = values.email;
    signup.fullname = values.fullname;
    signup.mobilenumber = values.mobile_number;
    signup.city = values.city;
    signup.state = values.state;
    signup.roles.push(values.role);
    signup.gender = values.gender;
    signup.password = values.matching_passwords.password;
    this.authenticationService.signup(signup)
    .subscribe( data => {
          this.router.navigate(["/login"]);
    })

   // console.log(values);

  }

  goToLogin(){
    this.router.navigate(["/login"]);
  }


}
