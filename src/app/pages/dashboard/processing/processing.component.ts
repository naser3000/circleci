import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { AnnotatedFileService } from 'src/app/services/annotated-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
      private _http: HttpClient,
      private _project: ProjectService,
      private _annotated_file: AnnotatedFileService) { }
    
    
    isCollapsed = false;
    project_id = null;
    project_details = null;
    currentChartDataIndex = null;
    currentAnnotatedData = null;
    currentSelectedArea = null;
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
        if (this.currentAnnotatedData) {
            this.writeAnnotatedData(this.filesList[this.currentChartDataIndex]);
        }
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

        console.log('@@@@@@', this.currentAnnotatedData);
        this.readFileData(this.currentChartDataIndex);
    }

    getAnnotatedData(value) {
        this.currentAnnotatedData = value['tags'];
        this.currentSelectedArea = value['areas'];
        setTimeout(() => {
        }, 500);
    }

    completeAnnotation() {
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
        let fileUrl = this.filesList[index]['file'];
        let selectedArea: any = {};
        if (this.filesList[index]['annotated_files']) {
            fileUrl = environment.rootURL + this.filesList[index]['annotated_files']['file'];
            selectedArea = this.filesList[index]['annotated_files']['selected_area'];
            selectedArea = JSON.parse(selectedArea || '{}');
        }
        this._http.get(fileUrl, {responseType: 'text'})
            .subscribe(
                response => {
                    // console.log(response);
                    this.chartData = {
                        data: response,
                        preSelectedArea: selectedArea,
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

    writeAnnotatedData(projectFile) {
        const data = {
            annotated: this.currentAnnotatedData,
            area: JSON.stringify(this.currentSelectedArea),
            parent: projectFile['id'],
        };
        this.currentAnnotatedData = null;
        this.currentSelectedArea = null;
        const anno_file = projectFile['annotated_files'];
        if (anno_file) {
            this._annotated_file.editAnnotatedFile(data, anno_file.id).subscribe(
                response => {
                    projectFile['annotated_files']['selected_area'] = response['selected_area'];
                },
                error => {}
            );
        } else {
            this._annotated_file.addNewAnnotatedFile(data).subscribe(
                response => {
                    projectFile['annotated_files'] = {
                        id: response['id'],
                        file: response['file'],
                    }
                },
                error => {}
            );
        }
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
