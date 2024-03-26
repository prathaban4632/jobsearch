import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Custom } from '../../custom.service';

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';



export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFav: boolean
}

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})

export class JobListComponent implements OnInit {
  http = inject(HttpClient)
  listOfJob: JobData[] = [];
  isSelected: boolean = false;
  error: string = "data not loading";
  constructor(private dataService: Custom, private router: Router){}

  ngOnInit(): void{
    if (this.dataService.selectedJobArray.length != 0) {
      this.listOfJob = this.dataService.DuplicateJobList;
    } else {
      this.fetchJobList();
    }
  }

  fetchJobList() {
    this.dataService.fetch().subscribe((data: JobData[]) => {
      this.listOfJob = data;
      this.dataService.DuplicateJobList = this.listOfJob;
    })
    }

    PreferredMarked(job: JobData) {
      const item = this.listOfJob.filter(x => x.id === job.id);
      if(item[0].isSelectedFav){
        item[0].isSelectedFav = false;
      } else {
        item[0].isSelectedFav = true;
      }
      this.onSelectJob(job);
    }

  onSelectJob(job: JobData) {
    if(this.dataService.selectedJobArray.length === 0) {
      this.dataService.selectedJobArray.push(job);
      this.dataService.duplicateArray = this.dataService.selectedJobArray;
      this.dataService.preferredJob = this.dataService.selectedJobArray;
    } 
    else {
      for(let i = 0; i < this.dataService.selectedJobArray.length ; i++){
          if(this.dataService.selectedJobArray.find(x => x.id === job.id) === undefined) {
            this.dataService.duplicateArray.push(job);
            break;
          } else {
            this.dataService.duplicateArray.forEach((item, index) => {
              if(item.id === job.id) {
                this.dataService.duplicateArray.splice(index, 1);
              }
            });
            break;
          }
        }
        this.dataService.selectedJobArray = this.dataService.duplicateArray;
        this.dataService.preferredJob = this.dataService.selectedJobArray;
      }
  }


  jobDetail(selectedJob: JobData) {
    this.dataService.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }

}
