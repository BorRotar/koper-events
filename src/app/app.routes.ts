import { Routes } from '@angular/router';
import {KoperNightlife} from './pages/koper-nightlife/koper-nightlife';
import {Home} from './components/home/home';
import {Card} from './components/card/card';
import {CardResolver} from './services/card.resolver';

export const routes: Routes = [{
  path: '',
  component: Home
},
  {
  path: 'nightlife',
  component: KoperNightlife,
},
  {
    path: 'nightlife/card/:id',
    component: Card,
    resolve: {
      cardData: CardResolver
    }
  }];
