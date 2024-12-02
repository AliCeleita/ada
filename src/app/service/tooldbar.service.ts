import {EventEmitter, Injectable} from "@angular/core";
import {FormControl} from "@angular/forms";
import {debounceTime, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ToolbarService {

  onNew: EventEmitter<void> = new EventEmitter();
  onSearch$: Observable<string>;

  private searchCtrl: FormControl;

  constructor() {
    this.searchCtrl = new FormControl();

    this.onSearch$ = this.searchCtrl.valueChanges
      .pipe(debounceTime(300));
  }

  set searchText(value: string) {
    this.searchCtrl.setValue(value);
  }

  get searchText() {
    return this.searchCtrl.value;
  }
}
