import { SelectQueryBuilder, Brackets } from 'typeorm';

export const buildOrWhereFactory = <T>(orBrackets: Brackets[]) => {
  return (qb: SelectQueryBuilder<T>) => {
    orBrackets.forEach((bracket) => {
      qb.orWhere(bracket);
    });
  };
};
