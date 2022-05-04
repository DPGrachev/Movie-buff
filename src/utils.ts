import type { QueryParams } from './types/search';

export function concatParams(params: QueryParams) {
  return Object.entries(params).reduce((acc, [param, value]) => {
    if (value) {
      return acc + `${param}=${value}&`;
    }
    return acc;
  }, '');
}
