import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  public imagePath: string;

  constructor() {
    this.imagePath = "/img/lotto-ticket-image.png";
  }
}
