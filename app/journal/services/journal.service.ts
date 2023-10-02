import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Journal} from "../models/journal.model";
import {PlantUser} from "../../plant-user/model/plant-user.model";
import {BackendService} from "../../back-end/services/back-end.service";

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = 'http://localhost:8080/journal';

  constructor(private http: HttpClient, private backendService: BackendService) {}


  addJournalEntry(journal: Journal): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, journal);
  }

  getAllEntriesForUserId(id: number | undefined): Observable<Journal[]> {
    return this.backendService.get(`http://localhost:8080/journal/plant-user/${id}`);
  }

}
