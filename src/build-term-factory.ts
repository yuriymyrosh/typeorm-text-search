import { SelectQueryBuilder } from 'typeorm';

export const buildTermFactory = <T>(term: string, fields: string[]) => {
  return (qb: SelectQueryBuilder<T>) => {
    fields.forEach((field) => {
      qb.orWhere(`LOWER(${field}) LIKE :search`, {
        search: `%${term.toLowerCase()}%`,
      });
    });
  };
};
