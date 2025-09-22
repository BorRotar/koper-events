import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface CardData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.html', // Ensure the path is correct
  styleUrls: ['./card.css'] // Ensure the path is correct
})
export class Card implements OnInit {
  data: CardData | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((resolvedData) => {
      console.log('Resolved data:', resolvedData); // Log to check what is actually resolved
      const cardData: { cardData: CardData } | null = resolvedData['cardData'];
      if (cardData && cardData.cardData) {
        this.data = cardData.cardData;
      } else {
        console.error('Missing or invalid cardData in resolved data');
        this.data = null;
      }
    });
  }
}
