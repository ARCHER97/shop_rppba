import { Component } from '@angular/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt'


declare var Auth0Lock; 

@Component({
  selector: 'my-app',
  template: `
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span> 
          </button>
          <a class="navbar-brand" href="#">WebSiteName</a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li> 
            <li><a href="#">Page 3</a></li> 
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" *ngIf="!loggedIn()" (click)="login()"><span class="glyphicon glyphicon-user"></span> Login</a></li>
            <li><a href="#" *ngIf="loggedIn()" (click)="logout()"><span class="glyphicon glyphicon-log-in"></span> logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
   
    <div class="col-sm-2">
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Menu 1</a></li>
        <li><a href="#">Menu 2</a></li>
        <li><a href="#">Menu 3</a></li>
      </ul>
    </div>
    <div class="col-sm-8">
      <img src="imgDog.jpg" class="img-circle" align="center" width="100%" height="100%">
    </div>
    <div class="col-sm-2">
      menu
    </div>
  `
})
export class AppComponent {
  lock = new Auth0Lock("B8j2pPjGOFqeyQvOwA3DPXu2xcgsMuJN", "arturik.auth0.com");
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(){}
  
  proxyLogin(){
    this.login();
    setTimeout(function() {
       window.location.reload();
    }, 1000);
  }
  login(){
    var self = this;
    this.lock.show((err: string, profile: string, id_token: string)=>{
      if(err){
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      console.log(
        this.jwtHelper.decodeToken(id_token),
        this.jwtHelper.getTokenExpirationDate(id_token),
        this.jwtHelper.isTokenExpired(id_token)
      );
    });
    self.loggedIn();
  }
  logout(){
    var self = this;
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    self.loggedIn();
    this.authState = "not auth"
  }

  loggedIn(){
    return tokenNotExpired();
  }
}
