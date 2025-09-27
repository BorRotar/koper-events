import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SwapiService} from '../../services/swapi';
import {ItemService} from '../../services/database.service';
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
  swapiData: any;
  itemData: any;

  constructor(private swapiService: SwapiService, private itemService: ItemService) {
  }

  ngOnInit() {
    try {
      this.swapiService.getResource('people', '2').subscribe(res => this.swapiData = res);
      this.itemService.getItem(1).subscribe(res => {this.itemData = res;
        // console.log('Item Data:', this.itemData);
      });
    } catch (error) {
      console.error('There was an error!', error)
    }
  }
}
