import { SelectQueryBuilder, Brackets } from 'typeorm';
import { buildWhereFactory } from './build-where-factory';
import { DELIMITER, DOUBLE_QUOTE } from './constants';
import { buildOrWhereFactory } from './build-or-where-factory';

export function textSearchByFields<T>(
  builder: SelectQueryBuilder<T>,
  search: string,
  fields: string[],
) {
  if (isWholePhraseSearch(search)) {
    const token = search.slice(1, -1);
    const brackets = new Brackets(buildWhereFactory<T>(token, fields));
    builder.andWhere(brackets);
  } else {
    const orBrackets = prepareTokensSearches(search, fields);
    builder.andWhere(new Brackets(buildOrWhereFactory<T>(orBrackets)));
  }
}

function isWholePhraseSearch(search: string) {
  return search.startsWith(DOUBLE_QUOTE) && search.endsWith(DOUBLE_QUOTE);
}

function prepareTokensSearches(search: string, fields: string[]) {
  const tokens = search.split(DELIMITER);

  return tokens.map((token) => new Brackets(buildWhereFactory(token, fields)));
}
