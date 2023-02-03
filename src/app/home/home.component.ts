
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'demoApp';
  data: any = [];

  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: any = ['s', 'value'];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const headers = {
      'X-RapidAPI-Key': 'c0891cb315msh652c9ae8876bf95p1d0827jsn28a8723c2449',
      'X-RapidAPI-Host': 'trading-view.p.rapidapi.com',
    };
    let transformedData = this.http
      .get<any>(
        'https://trading-view.p.rapidapi.com/market/get-movers?exchange=US&name=volume_gainers&locale=en',
        { headers }
      )
      .pipe(
        map((data) => {
          console.log(data);
          return data.symbols.map((element: any) => {
            return { s: element['s'], value: element['f'][0] };
          });
        })
      );
    transformedData.subscribe((result) => {
      this.data = new MatTableDataSource(result);
      this.data.paginator = this.paginator;
      console.log(this.data);
    });
  }

}
