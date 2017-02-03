"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var AppComponent = (function () {
    function AppComponent() {
        this.lock = new Auth0Lock("B8j2pPjGOFqeyQvOwA3DPXu2xcgsMuJN", "arturik.auth0.com");
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AppComponent.prototype.proxyLogin = function () {
        this.login();
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        var self = this;
        this.lock.show(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token), _this.jwtHelper.isTokenExpired(id_token));
        });
        self.loggedIn();
    };
    AppComponent.prototype.logout = function () {
        var self = this;
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        self.loggedIn();
        this.authState = "not auth";
    };
    AppComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <nav class=\"navbar navbar-inverse\">\n      <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span> \n          </button>\n          <a class=\"navbar-brand\" href=\"#\">WebSiteName</a>\n        </div>\n        <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\n          <ul class=\"nav navbar-nav\">\n            <li class=\"active\"><a href=\"#\">Home</a></li>\n            <li><a href=\"#\">Page 1</a></li>\n            <li><a href=\"#\">Page 2</a></li> \n            <li><a href=\"#\">Page 3</a></li> \n          </ul>\n          <ul class=\"nav navbar-nav navbar-right\">\n            <li><a href=\"#\" *ngIf=\"!loggedIn()\" (click)=\"login()\"><span class=\"glyphicon glyphicon-user\"></span> Login</a></li>\n            <li><a href=\"#\" *ngIf=\"loggedIn()\" (click)=\"logout()\"><span class=\"glyphicon glyphicon-log-in\"></span> logout</a></li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n   \n    <div class=\"col-sm-2\">\n      <ul class=\"nav nav-pills nav-stacked\">\n        <li class=\"active\"><a href=\"#\">Home</a></li>\n        <li><a href=\"#\">Menu 1</a></li>\n        <li><a href=\"#\">Menu 2</a></li>\n        <li><a href=\"#\">Menu 3</a></li>\n      </ul>\n    </div>\n    <div class=\"col-sm-8\">\n      <img src=\"imgDog.jpg\" class=\"img-circle\" align=\"center\" width=\"100%\" height=\"100%\">\n    </div>\n    <div class=\"col-sm-2\">\n      menu\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map