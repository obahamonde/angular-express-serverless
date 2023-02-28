import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  url: string;
  query: string;
  offset: number;
  data: any;
  constructor() {
    this.query = '';
    this.offset = 0;
    this.url = `/api?query=${this.query}&offset=${this.offset}`
    this.data = [];
  }
  updateQuery(query: string) {
    this.query = query;
    this.url = `/api?query=${this.query}&offset=${this.offset}`
  }
  async updateOffset(offset: number) {
    if (offset <= 0) {
      return;
    }
    this.offset = offset;
    this.url = `/api?query=${this.query}&offset=${this.offset}`
    await this.updateData();
  }
  async updateData(){
    this.updateQuery(this.query);
    const response = await fetch(this.url);
    const data = await response.json();
    this.data = data.results
  }
  
}
