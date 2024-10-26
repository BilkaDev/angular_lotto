import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [MatIconModule, NgOptimizedImage],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  public currentYear: number;
  public githubLink: string;
  public name: string;

  constructor() {
    this.currentYear = new Date().getFullYear();
    this.githubLink = "https://github.com/BilkaDev";
    this.name = this.githubLink.split("/")[3];
  }
}
