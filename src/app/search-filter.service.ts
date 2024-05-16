import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {

  constructor() { }

  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }
}
