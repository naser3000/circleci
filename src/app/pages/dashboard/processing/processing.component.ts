import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
      private _http: HttpClient,
      private _project: ProjectService) { }
    
    
    isCollapsed = false;
    project_id = null;
    project_details = null;
    currentChartDataIndex = null;
    // availableFiles = [
    //     'data_nob.csv',
    //     'data_s3.csv',
    //     'data_s3e.csv',
    //     'dataa.csv',
    //     'h_data.csv',
    //     'v_data.csv',
    // ];
    filesList = [];
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
            if (this.currentChartDataIndex === this.filesList.length - 1) {
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

        this.readFileData(this.currentChartDataIndex);
    }

    // readFileData(index) {
    //     const fileName = this.availableFiles[index];
    //     this._http.get(`assets/chart-data/${fileName}`, {responseType: 'text'})
    //         .subscribe(
    //             response => {
    //                 // console.log(response);
    //                 this.chartData = {
    //                     data: response,
    //                     type: {
    //                         curveNumber: 1,
    //                         xDataType: 'date'
    //                     }
    //                 };
    //             },
    //             error => {
    //                 // console.log('**', error);
    //             }
    //         );
    // }

    readFileData(index) {
        const fileUrl = this.filesList[index]['file'];
        this._http.get(fileUrl, {responseType: 'text'})
            .subscribe(
                response => {
                    // console.log(response);
                    this.chartData = {
                        data: response,
                        type: {
                            curveNumber: this.filesList[index]['curves_count'],
                            xDataType: this.filesList[index]['data_type'],
                            isHorizontal: this.filesList[index]['is_horizontal'],
                        }
                    };
                },
                error => {
                    // console.log('**', error);
                }
            );
    }

    getProjectDetails() {
        this._project.getSingleProject(this.project_id).subscribe(
            response => {
                this.project_details = response;
                this.filesList = response['files'];
            },
          error => {}
        );
    }

    ngOnInit() {
        this._route.params.subscribe(param => {
            this.project_id = param['id'];
            this.getProjectDetails();
        });
    }

}
