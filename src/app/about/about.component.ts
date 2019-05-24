import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public frontendDependencies = [
    {
      name: 'Flask',
      href: 'http://flask.pocoo.org/'
    }
  ];

  public backendDependencies = [
    {
      name: 'Angular',
      href: 'https://angular.io'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
