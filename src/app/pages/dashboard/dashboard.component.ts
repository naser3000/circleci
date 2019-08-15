import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor() { }
    isCollapsed = false;

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    chart = null;

    chartConfig = {
        type: 'line',
        data: {
            // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", 
            // "Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            labels: [],
            datasets: [{
                    label: '# of Votes',
                    // data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                    // data: [
                    //     { x: new Date(2017, 01, 06, 18, 39, 30).getTime(), y: 100 },
                    //     { x: new Date(2017, 01, 07, 18, 39, 28).getTime(), y: 101 },
                    // ],
                    data: [],
                    borderWidth: 1,
                    borderColor: 'blue',
                    backgroundColor: 'transparent',
                },
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    // type: 'time',
                    // time: {
                    //     displayFormats: {
                    //         quarter: 'YYYY-MM-DD'
                    //     }
                    // }
                }],
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            elements: {
                line: {
                    tension: 0,
                }
            }
        }
    }

    // createChart() {
        // this.chart = new Chart('canvas', {
        //   type: 'line',
        //   data: {
        //     labels: ['s1', 's2', 's3', 's4'],
        //     datasets: [
        //       { 
        //         data: [2, 8, 56, 31],
        //         borderColor: "#3cba9f",
        //         fill: false
        //       },
        //       { 
        //         data: [12, 45, 67, 36],
        //         borderColor: "#ffcc00",
        //         fill: false
        //       },
        //     ]
        //   },
        //   options: {
        //     legend: {
        //       display: false
        //     },
        //     scales: {
        //       xAxes: [{
        //         display: true
        //       }],
        //       yAxes: [{
        //         display: true
        //       }],
        //     }
        //   }
        // });
    // }





    
    allTagsColor = {
        tag1: '#ff0000',
        tag2: '#08ffc8',
        tag3: '#ff00c8',
        tag4: '#f7b71d',
        tag5: '#e42c64',
    };
    currentTag = 'tag1';
    currentcolor = this.allTagsColor[this.currentTag];
    savedAllArea = {};
    tagsStatusInfo = {};
    selectionContext = null;

    xNearestPosition = [null, null];
    xClickPosition = [null, null];
    startIndex = 0;
    endIndex = 0;
    selectedArea = [];


    createChart() {
        this.chart = new Chart('chartJSContainer', this.chartConfig);
        const canvas = <HTMLCanvasElement>document.getElementById('chartJSContainer');
        // ctx = canvas.getContext('2d');
        // chart = new Chart(ctx, options);
        const chart = this.chart;
        const overlay = <HTMLCanvasElement>document.getElementById('overlay');
        // const xNearestPosition = [null, null];
        // const xClickPosition = [null, null];
        // const startIndex = 0;
        // const endIndex = 0;
        overlay.width = 1000;
        overlay.height = 600;
        // overlay.width = canvas.width;
        // overlay.height = canvas.height;
        // const selectionContext = overlay.getContext('2d');
        this.selectionContext = overlay.getContext('2d');
        this.selectionContext.globalAlpha = 0.3;
        let selectionRect = {
            w: 0,
            startX: 0,
            startY: 0
        };
        const verticalLineMoving = {
            w: 0,
            startX: 0,
            startY: 0
        };
        // const selectedArea = [];
        let drag = false;
        canvas.addEventListener('pointerdown', evt => {
            const points = chart.getElementsAtEventForMode(evt, 'index', {
                intersect: false
            });
            this.xClickPosition[0] = this.getRelativePosition(evt, chart)['x'];
            this.xNearestPosition[0] = points[0]._view.x;
            this.startIndex = points[0]._index;
            const rect = canvas.getBoundingClientRect();
            selectionRect.startX = evt.clientX - rect.left;
            selectionRect.startY = chart.chartArea.top;
            drag = true;
            // save points[0]._index for filtering
        });
        canvas.addEventListener('pointermove', evt => {
            const rect = canvas.getBoundingClientRect();
            this.selectionContext.fillStyle = this.currentcolor;
            if (drag) {
                const rect = canvas.getBoundingClientRect();
                selectionRect.w = (evt.clientX - rect.left) - selectionRect.startX;
                this.selectionContext.clearRect(0, 0, canvas.width, canvas.height);
                // drawRects(selectedArea);
                this.drawAllRects();
                this.selectionContext.fillRect(selectionRect.startX,
                    selectionRect.startY,
                    selectionRect.w,
                    chart.chartArea.bottom - chart.chartArea.top);
            } else {
                this.selectionContext.clearRect(0, 0, canvas.width, canvas.height);
                // drawRects(selectedArea);
                this.drawAllRects();
                const x = evt.clientX - rect.left;
                this.selectedArea.forEach(area => {
                    if (x > area.startX && x < area.startX + area.w) {
                        return;
                    }
                });
                if (x > chart.chartArea.left) {
                    this.selectionContext.fillRect(x,
                        chart.chartArea.top,
                        1,
                        chart.chartArea.bottom - chart.chartArea.top);
                }
            }
        });
        canvas.addEventListener('pointerup', (evt) => {  
            const points = chart.getElementsAtEventForMode(evt, 'index', {
                intersect: false
            });
            this.xClickPosition[1] = this.getRelativePosition(evt, chart)['x'];
            this.xNearestPosition[1] = points[0]._view.x;
            const endIndex = points[0]._index;

            // save selected area
            const overlappedAreaIndex = [];
            this.selectedArea.forEach((area, index) => {
                if (this.hasOverlay(area, selectionRect)) {
                    overlappedAreaIndex.push(index);
                    const overlayArea = this.combineArea(selectionRect, area);
                    selectionRect = overlayArea;
                }
            });
            overlappedAreaIndex.reverse();
            overlappedAreaIndex.forEach(index => {
                this.selectedArea.splice(index, 1);
            });
            this.selectedArea.push(JSON.parse(JSON.stringify(selectionRect)));
            this.savedAllArea[this.currentTag] = this.selectedArea;

            drag = false;

            // record status 1 for selected data-point of chart
            const indexes = this.getSelectedIndex();
            this.tagSelectedArea(indexes);
            console.log('>>>>>>>', this.tagsStatusInfo);
            // console.log('implement filter between ' 
            // + options.data.labels[indexes[0]] + ' and ' 
            // + options.data.labels[indexes[1]]);  
        });
    }
    drawRects(rectList) {
        rectList.forEach(area => {
            this.selectionContext.fillRect(area.startX,
                area.startY,
                area.w,
                this.chart.chartArea.bottom - this.chart.chartArea.top);
        });
    }
    drawAllRects() {
        Object.keys(this.savedAllArea).forEach(tag_id => {
            this.selectionContext.fillStyle = this.allTagsColor[tag_id];
            this.drawRects(this.savedAllArea[tag_id]);
        });
        this.selectionContext.fillStyle = this.currentcolor;
    }
    hasOverlay(area1, area2) {
        const xs = this.x1x2(area1);
        const xxs = this.x1x2(area2);
        if ((xs[0] > xxs[0] && xs[0] < xxs[1]) || (xxs[0] > xs[0] && xxs[0] < xs[1])) {
            return true;
        }
        if (xs[0] == xxs[1] || xxs[0] == xs[1]) {
            return true;

        }
        return false;
    }
    combineArea(new_area, old_area) {
        const x1 = this.x1x2(new_area);
        const x2 = this.x1x2(old_area);
        const x_start = Math.min(x1[0], x2[0]);
        const x_end = Math.max(x1[1], x2[1]);
        return {
            w: x_end - x_start,
            startX: x_start,
            startY: new_area.startY
        };
    }
    x1x2(area) {
        const xs = [area.startX, area.startX + area.w];
        xs.sort(function(a, b){return a - b});
        return xs
    }
    getSelectedIndex() {
        let index = [this.startIndex, this.endIndex].sort(function(a, b){return a - b});
        this.xClickPosition.sort(function(a, b){return a - b});
        this.xNearestPosition.sort(function(a, b){return a - b});
        if (this.xClickPosition[0] < this.xNearestPosition[0]) {
            index[0]--;
        }
        if (this.xClickPosition[1] > this.xNearestPosition[1]) {
            index[1]++;
        }
        return index;
    }
    tagSelectedArea(indexes) {
        for (let i = indexes[0] + 1; i < indexes[1]; i++) {
            this.tagsStatusInfo[this.currentTag][i] = 1;
        }
    }

    setTag(e) {
        // savedAllArea[currentTag] = selectedArea;
        let tagLength = 0;
        if (this.tagsStatusInfo[this.currentTag]) {
            tagLength = this.tagsStatusInfo[this.currentTag].length;
        }
        // const v = document.getElementById("select-tag").value;
        const v = e.terget.value;
        this.currentTag = v;
        this.currentcolor = this.allTagsColor[this.currentTag];
        this.selectionContext.fillStyle = this.currentcolor;
        this.tagsStatusInfo[this.currentTag] = new Array(tagLength).fill(0);
        if ( this.savedAllArea[this.currentTag]) {
            this.selectedArea = this.savedAllArea[this.currentTag];
        } else {
            this.selectedArea = [];
        }
    }
    setChartData(e) {
        // const input = document.getElementById("data-upload");
        const input = e.target;
        const files = input.files;
        // if (files && files[0]) {
        for (let key in files) {
            if (typeof(files[key]) === 'object') {
                const file = files[key];
                const reader = new FileReader();
                // Closure to capture the file information.
                const chart = this.chart;
                const currentTag = this.currentTag;
                const chartConfig = this.chartConfig;
                const tagsStatusInfo = this.tagsStatusInfo;
                reader.onload = (function(theFile) {
                    return function(e) {
                        const data = e.target.result;
                        const lines = data.split('\n');
                        // timestamp = [];
                        // datasets = [];
                        tagsStatusInfo[currentTag] = new Array(lines.length).fill(0);
                        chartConfig.data.labels = [];
                        chartConfig.data.datasets[0].data = [];
                        lines.forEach((line, index) => {
                            const colData = line.split(',');
                            // timestamp.push(colData[0]);
                            // datasets.push(colData[1]);
                            if (!isNaN(Number(colData[0])) && !isNaN(Number(colData[0]))) {
                                // x-y
                                // options.data.labels.push(new Date(Number(colData[0])));
                                // options.data.datasets[0].data.push(Number(colData[1]));

                                // time series
                                // options.data.datasets[0].data.push({
                                //     x: Number(colData[0])*1000,
                                //     y: Number(colData[1])
                                // });

                                // custom label with moment.js
                                const m = moment(Number(colData[0]) * 1000);
                                // options.data.labels.push([m.format('YYYY-MM-DD'), m.format('HH:mm')]);
                                chartConfig.data.labels.push([`${index}---${m.format('HH:mm')}`]);
                                chartConfig.data.datasets[0].data.push(Number(colData[1]));
                            }
                        });
                        chart.update();
                    };
                })(file);
                // Read in the image file as a data URL.
                reader.readAsText(file);
            }
        }
    }
    getRelativePosition = function (t, e) {
        let  i, n, a = t.originalEvent || t,
            o = t.target || t.srcElement,
            r = o.getBoundingClientRect(),
            s = a.touches;
        s && s.length > 0 ? (i = s[0].clientX, n = s[0].clientY) : (i = a.clientX, n = a.clientY);
        // const l = parseFloat(ut.getStyle(o, "padding-left")),
        //     d = parseFloat(ut.getStyle(o, "padding-top")),
        //     u = parseFloat(ut.getStyle(o, "padding-right")),
        //     h = parseFloat(ut.getStyle(o, "padding-bottom")),
        // my code
        const pd = e.config.options.layout.padding;
        // const l = pd.left,
        //     d = pd.top,
        //     u = pd.right,
        //     h = pd.bottom,
        const l = 0,
            d = 0,
            u = 0,
            h = 0,

        // my code
            c = r.right - r.left - l - u,
            f = r.bottom - r.top - d - h;
        return {
            x: i = Math.round((i - r.left - l) / c * o.width / e.currentDevicePixelRatio),
            y: n = Math.round((n - r.top - d) / f * o.height / e.currentDevicePixelRatio)
        }
    }












    ngOnInit() {
        setTimeout(() => {
        this.createChart();
        }, 1000);
    }

}
