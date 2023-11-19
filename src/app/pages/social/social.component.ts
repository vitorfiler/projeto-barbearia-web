import { Component, OnInit } from '@angular/core';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { Link } from 'src/@vex/interfaces/link.interface';

@Component({
  selector: 'vex-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SocialComponent implements OnInit {
  userName: string = this.getUser();
  links: Link[] = [
    {
      label: 'ABOUT',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'TIMELINE',
      route: './timeline'
    },
    {
      label: 'FRIENDS',
      route: '',
      disabled: true
    },
    {
      label: 'PHOTOS',
      route: '',
      disabled: true
    }
  ];

  constructor() { }

  ngOnInit() {
  }
  getUser() {
    var nome = localStorage.getItem('currentUser');
    if (nome == null) {
      var nomeEmpe = localStorage.getItem('usuarioLogadoEmpresa');
      if (nomeEmpe == null) {
        return "";
      }
      return nomeEmpe.replace('"', '').replace('"', '');
    }
    return nome.replace('"', '').replace('"', '');
  }
}
