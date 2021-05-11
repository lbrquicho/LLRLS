import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(value: any[], query: string): any[] {
    return query
        ? value.filter(
              obj =>
                  Object.keys(obj)
                      .map(key => obj[key])
                      .toString()
                      .toLocaleLowerCase()
                      .indexOf(query.toLocaleLowerCase()) !== -1
          )
        : value;
}
}
