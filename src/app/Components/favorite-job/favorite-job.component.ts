import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Custom } from '../../custom.service';



export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFav: boolean
} 

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './favorite-job.component.html',
  styleUrl: './favorite-job.component.css'
})
export class FavoriteJobComponent implements OnInit {
  noPreferredJob: string | undefined;
  isPreferred: boolean = false;

  constructor(private dataService: Custom,
    private router: Router){}
    preferredJobList: JobData[] = [];

 ngOnInit(): void {
    if(this.dataService.preferredJob.length !== 0) {
      this.isPreferred = true;
      this.preferredJobList = this.dataService.preferredJob;
    } else {
      this.isPreferred = false;
      this.noPreferredJob = 'No favourites selected'
    }
  }

  jobDetail(selectedJob: JobData) {
    this.dataService.SelectedJob = selectedJob;
    this.router.navigate(['/jobDetails']);
  }
}
