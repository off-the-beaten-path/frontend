import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public frontendDependencies = [
    {
      name: 'Angular',
      href: 'https://angular.io',
      license: 'MIT'
    },
    {
      name: 'Angular Material',
      href: 'https://material.angular.io/',
      license: 'MIT'
    },
    {
      name: 'Leaflet',
      href: 'https://leafletjs.com/',
      license: 'BSD'
    },
    {
      name: 'File Pond',
      href: 'https://github.com/pqina/filepond',
      license: 'MIT'
    },
    {
      name: 'Jdenticon',
      href: 'https://jdenticon.com/',
      license: 'MIT'
    },
    {
      name: 'ngx toastr',
      href: 'https://github.com/scttcper/ngx-toastr',
      license: 'MIT'
    },
    {
      name: 'And many more!',
      href: 'https://github.com/off-the-beaten-path/frontend/blob/master/package.json',
      license: ''
    }
  ];

  public backendDependencies = [
    {
      name: 'Flask',
      href: 'http://flask.pocoo.org/',
      license: 'BSD'
    },
    {
      name: 'Flask SQLAlchemy',
      license: 'BSD',
      href: 'http://flask-sqlalchemy.pocoo.org/2.3/'
    },
    {
      name: 'flask-apispec',
      href: 'https://github.com/jmcarp/flask-apispec',
      license: 'MIT'
    },
    {
      name: 'Flask Mail',
      href: 'https://pythonhosted.org/Flask-Mail/',
      license: 'BSD'
    },
    {
      name: 'Marshmallow',
      href: 'https://marshmallow.readthedocs.io/en/3.0/',
      license: 'MIT'
    },
    {
      name: 'flask-praetorian',
      href: 'https://flask-praetorian.readthedocs.io/en/latest/',
      license: 'MIT'
    },
    {
      name: 'geopy',
      href: 'https://geopy.readthedocs.io/en/stable/',
      license: 'MIT'
    },
    {
      name: 'jsonschema',
      href: 'https://pypi.org/project/jsonschema/',
      license: 'MIT'
    },
    {
      name: 'And many more!',
      href: 'https://github.com/off-the-beaten-path/backend/blob/master/requirements.txt',
      license: ''
    }
  ];

  public mediaAttrs = [
    {
      href: 'https://openclipart.org/detail/233063/compass-rose-2',
      name: 'Compass',
      license: ''
    },
    {
      href: 'https://opengameart.org/content/16x16-person-sprite',
      name: 'Player Sprite',
      license: 'CC0'
    },
    {
      href: 'https://www.openstreetmap.org/#map=5/38.007/-95.844',
      name: 'OSM',
      license: 'ODbL'
    },
    {
      href: 'http://clipart.nicubunu.ro/?gallery=rpg_map',
      name: 'Road Post',
      license: 'Public Domain'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
