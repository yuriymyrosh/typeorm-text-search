import { SelectQueryBuilder, Brackets } from 'typeorm';
import { buildWhereFactory } from './build-where-factory';

export function textSearchByFields<T>(
  builder: SelectQueryBuilder<T>,
  term: string,
  fields: string[],
) {
  const brackets = new Brackets(buildWhereFactory(term, fields));
  builder.andWhere(brackets);
}
