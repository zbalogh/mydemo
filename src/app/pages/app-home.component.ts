import {Component} from "@angular/core";

@Component({
  selector : 'app-home',

  template : `
      <br>
      <div align="center">
        <h1>Welcome to Zoltan Application!</h1>
        <br>
        
        <div class="row center">
        
          <div class="col-sm-2">&nbsp;</div>
          
          <div class="col-sm-4">
            <h3>Most popular web browsers</h3>
              <p-chart type="pie" [data]="chart1Data" width="300" height="300"></p-chart>
          </div>
          
          <div class="col-sm-4">
               <h3>Most often visited pages</h3>
              <p-chart type="pie" [data]="chart2Data" width="300" height="300"></p-chart>
          </div>
          
          <div class="col-sm-2">&nbsp;</div>
          
        </div>
        
        <br>
      </div>
`
})
export class HomeComponent {

  chart1Data: any;

  chart2Data : any;

  constructor()
  {
      this.chart1Data = {
          labels: ['Firefox','Internet Explorer','Chrome', 'Others'],
          datasets: [
            {
              data: [30, 20, 45, 5],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "lightgray"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "lightgray"
              ]
            }
          ]
      };

      this.chart2Data = {
        labels: ['Home', 'Messages','Settings','Users'],
        datasets: [
          {
            data: [10, 40, 20, 30],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4FCE56"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4FCE56"
            ]
          }
        ]
      };
  }

}
