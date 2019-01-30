import { Injectable } from '@angular/core';
import { END_POINT } from './api-registry';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private apiService: ApiService) {}

  get(schedule_id) {
    let url = [`${END_POINT.schedules}/show/${schedule_id}`];
    return this.apiService.get(url);
  }
}
