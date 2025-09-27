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
  data: any | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((resolvedData) => {
      console.log('Resolved data:', resolvedData); // Log to check what is actually resolved
      const cardData: { cardData: CardData } | null = resolvedData['cardData'];
      if (cardData && cardData.cardData) {
        this.data = cardData.cardData;
        console.log(Object.keys(this.data))
        // console.log(Object.values(this.data))
        // console.log(this.data.count)
      } else {
        console.error('Missing or invalid cardData in resolved data');
        this.data = {
          results: {
          name: 'SWAPI vehicle',
          },
          title: 'Postgres title',
          image: 'https://i5.walmartimages.com/seo/Handmadetneonsign-Aloha-Island-Palm-Tree-Neon-Sign-Beach-Neon-Wall-Art-Decor-Home-Wall-Decor_74cf0304-fee9-4768-b0ce-9975ab45b1ef.bb440113f66e0dd27f9583691455d210.jpeg'
        };
        console.log(this.data)
      }
    });
  }
}
