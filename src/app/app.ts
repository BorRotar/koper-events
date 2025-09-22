import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import {Footer} from './components/footer/footer';
import {Home} from './components/home/home';
import {Wrapper} from './components/wrapper/wrapper';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Wrapper, RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected title = 'koper-events';
}
