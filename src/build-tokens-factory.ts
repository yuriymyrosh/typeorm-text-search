import { SelectQueryBuilder } from 'typeorm';

export const buildTokensFactory = <T>(tokens: string[], fields: string[]) => {
  return (qb: SelectQueryBuilder<T>) => {
    tokens.forEach((token) => {
      fields.forEach((field) => {
        qb.orWhere(`LOWER(${field}) LIKE :search`, {
          search: `%${token.toLowerCase()}%`,
        });
      });
    });
  };
};
