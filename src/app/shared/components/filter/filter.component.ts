import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  developersFilter,
  metacriticNumbers,
  orderByInfos,
  platformsFilter,
  tagsFilter,
} from '../../constants/filter.constants';
import {
  DevelopersFilters,
  Metacritics,
  OrderByInfos,
  PlatformsFilters,
  Tags,
} from '../../models/filter.interfaces';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  addFilterOptionsAction,
  clearFilterOptionsAction,
} from '../../../store/action/filter-options/filter-options.actions';

@Component({
  selector: 'app-filter',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: true,
})
export class FilterComponent implements OnInit {
  private store = inject(Store);

  filterForm!: FormGroup;
  searchFilterForm!: FormGroup;

  developers: DevelopersFilters[] = developersFilter;
  platforms: PlatformsFilters[] = platformsFilter;
  orderByInfos: OrderByInfos[] = orderByInfos;
  metacritics: Metacritics[] = metacriticNumbers;
  tags: Tags[] = tagsFilter;

  searchValues = {
    metacritic: '',
    developers: '',
    platforms: '',
    ordering: '',
    tags: '',
    search: '',
  };

  ngOnInit() {
    this.initFilterForm();
    this.initSearchFilter();
  }

  private initFilterForm() {
    this.filterForm = new FormGroup({
      metacritics: new FormControl(''),
      developers: new FormControl(''),
      platforms: new FormControl(''),
      orderBy: new FormControl(''),
      tags: new FormControl(''),
    });
  }
  private initSearchFilter() {
    this.searchFilterForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  clearFilterForm() {
    this.filterForm.patchValue({
      metacritic: '',
      developers: '',
      platforms: '',
      ordering: '',
      tags: '',
      search: '',
    });
    this.searchValues = {
      ...this.searchValues,
      developers: this.filterForm.value.developers,
      metacritic: this.filterForm.value.metacritics,
      platforms: this.filterForm.value.platforms,
      ordering: this.filterForm.value.orderBy,
      tags: this.filterForm.value.tags,
      search: this.searchFilterForm.value.search,
    };
    this.filterForm.patchValue(this.searchValues);
    this.store.dispatch(new clearFilterOptionsAction(this.searchValues));
  }

  clearSearchForm() {
    ({ ...this.searchValues }).search = '';
    this.searchFilterForm.patchValue({ search: '' });
    this.store.dispatch(new clearFilterOptionsAction(this.searchValues));
  }

  submitFilterForm() {
    this.searchValues = {
      ...this.searchValues,
      developers: this.filterForm.value.developers,
      metacritic: this.filterForm.value.metacritics,
      platforms: this.filterForm.value.platforms,
      ordering: this.filterForm.value.orderBy,
      tags: this.filterForm.value.tags,
      search: this.searchFilterForm.value.search,
    };
    this.store.dispatch(new addFilterOptionsAction(this.searchValues));
  }
}
