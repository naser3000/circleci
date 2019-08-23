import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  constructor(private _http: HttpClient) { }
    isCollapsed = false;

    availableFiles = [
        'data_nob.csv',
        'data_s3.csv',
        'data_s3e.csv',
        'dataa.csv',
        'h_data.csv',
        'v_data.csv',
    ];
    currentChartDataIndex = null;

    chartData = null;

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    setChartData(index) {
        if (index === 'next') {
            if (this.currentChartDataIndex === null) {
                this.currentChartDataIndex = -1;
                // return;
            }
            if (this.currentChartDataIndex === this.availableFiles.length - 1) {
                return;
            }
            this.currentChartDataIndex = this.currentChartDataIndex + 1;
        } else if (index === 'prev') {
            if (this.currentChartDataIndex === null) {
                return;
            }
            this.currentChartDataIndex = this.currentChartDataIndex - 1;
            if (this.currentChartDataIndex < 0) {
                this.currentChartDataIndex = 0;
                return;
            }
        } else {
            this.currentChartDataIndex = index;
        }

        const fileName = this.availableFiles[this.currentChartDataIndex];
        this._http.get(`assets/chart-data/${fileName}`, {responseType: 'text'})
            .subscribe(
                response => {
                    // console.log(response);
                    this.chartData = {
                        data: response,
                        type: {
                            curveNumber: 1,
                            xDataType: 'date'
                        }
                    };
                },
                error => {
                    // console.log('**', error);
                }
            );
    }

    ngOnInit() {

    }

}
