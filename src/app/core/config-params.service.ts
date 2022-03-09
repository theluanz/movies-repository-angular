import { HttpParams } from '@angular/common/http';
import { ConfigParams } from './../shared/models/config-params';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigParamsService {
  constructor() {}

  configurateParams(config: ConfigParams): HttpParams {
    let httpParams = new HttpParams();

    if (config.page) {
      httpParams = httpParams.set('_page', config.page);
    }
    if (config.numberOfPosts) {
      httpParams = httpParams.set('_limit', config.numberOfPosts);
    }
    if (config.textSearch) {
      httpParams = httpParams.set('q', config.textSearch);
    }
    if (config.field?.type) {
      httpParams = httpParams.set(config.field.type, config.field.value);
    }
    httpParams = httpParams.set('_sort', 'id').set('_order', 'desc');

    return httpParams;
  }
}
