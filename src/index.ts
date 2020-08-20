import { SelectQueryBuilder, Brackets } from 'typeorm';
import { buildTermFactory } from './build-term-factory';
import { DELIMITER, DOUBLE_QUOTE } from './constants';
import { buildTokensFactory } from './build-tokens-factory';

export function textSearchByFields<T>(
  builder: SelectQueryBuilder<T>,
  search: string,
  fields: string[],
) {
  if (isWholePhraseSearch(search)) {
    const term = search.slice(1, -1);
    builder.andWhere(new Brackets(buildTermFactory<T>(term, fields)));
  } else {
    const tokens = prepareTokens<T>(search);
    builder.andWhere(new Brackets(buildTokensFactory<T>(tokens, fields)));
  }
}

function isWholePhraseSearch(search: string) {
  return search.startsWith(DOUBLE_QUOTE) && search.endsWith(DOUBLE_QUOTE);
}

function prepareTokens<T>(search: string) {
  return search.split(DELIMITER);
}
