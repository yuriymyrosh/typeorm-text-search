import { SelectQueryBuilder } from 'typeorm';

export const buildTokensFactory = <T>(tokens: string[], fields: string[]) => {
  return (qb: SelectQueryBuilder<T>) => {
    fields.forEach((field) => {
      tokens.forEach((token, index) => {
        qb.orWhere(`LOWER(${field}) LIKE :search_${index}`, {
          [`search_${index}`]: `%${token.toLowerCase()}%`,
        });
      });
    });
  };
};
