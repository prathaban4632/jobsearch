import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface JobData {
  id: number,
  companyName: string,
  title: string,
  companyLogo: string,
  reference: string,
  isSelectedFav: boolean
} 

@Injectable({
  providedIn: 'root'
})

export class Custom {
  selectedJobArray: JobData[] = [];
  duplicateArray : JobData[] = [];
  SelectedJob!: JobData;
  preferredJob: JobData[] = [];
  DuplicateJobList: JobData[] = [];
  
  
  constructor(private http: HttpClient) { }

fetch() {
  const jobsUrl = '/jobs';
  return this.http.get<JobData[]>(jobsUrl);
}
}
