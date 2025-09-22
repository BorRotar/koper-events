import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SwapiService} from '../../services/swapi';
// import {Card} from '../../components/card/card';

@Component({
  selector: 'app-koper-nightlife',
  imports: [
    RouterLink
  ],
  templateUrl: './koper-nightlife.html',
  standalone: true,
  styleUrl: './koper-nightlife.css'
})
export class KoperNightlife implements OnInit {
  data: any;

  constructor(private swapiService: SwapiService) {
  }

  ngOnInit() {
    try {
      this.swapiService.getResource('people', '2').subscribe(res => this.data = res);
    } catch (error) {
      console.error('There was an error!', error)
    }
  }
}
