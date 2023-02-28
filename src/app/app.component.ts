import { Component } from '@angular/core';
import { Result } from './app.types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    query:string = '';
    offset:number = 0;
    url:string = `/api?query=${this.query}&offset=${this.offset*10}`
    data:Result[] = [];

  async updateData(){
    this.url = `/api?query=${this.query}&offset=${this.offset*10}`
    const response = await fetch(this.url);
    const data = await response.json();
    this.data = data.results
  }

  updateOffset(offset:number){
   if (offset < 0){
    return
    }
    this.offset = offset;
    this.updateData();
  }
}