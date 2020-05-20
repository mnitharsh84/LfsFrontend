import { Component } from '@angular/core';
import {RestApiService}from "src/app/service/rest-api.service";
import {Router, ActivatedRoute}from '@angular/router';
import {AuthenticationService}from 'src/app/component/user-management/_services';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  isAdmin:boolean = false;
  isServiceProvider:boolean = false;
  isDoctor:boolean = false;
  constructor(private restApiService: RestApiService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {}

   ngOnInit() {

  }

}
