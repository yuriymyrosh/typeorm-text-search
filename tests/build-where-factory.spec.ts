import { buildTermFactory } from '../src/build-term-factory';


const builderMock = {
  andWhere() {
    return this;
  },
  orWhere() {
    return this;
  },
} as any;

describe('buildWhereFactory', () => {
  let orWhereSpy: any
  beforeEach(() => {
    orWhereSpy = spyOn(builderMock, 'orWhere').and.callThrough();
  });

  it('should buildWhereFactory', () => {
    const res = buildTermFactory('term', ['name']);
    res(builderMock);

    expect(orWhereSpy).toBeCalledTimes(1);
    expect(orWhereSpy).toBeCalledWith('LOWER(name) LIKE :search', {
      search: '%term%',
    });
  });

  it('should lower term when buildTermFactory', () => {
    const res = buildTermFactory('UPPER', ['name']);
    res(builderMock);

    expect(orWhereSpy).toBeCalledTimes(1);
    expect(orWhereSpy).toBeCalledWith('LOWER(name) LIKE :search', {
      search: '%upper%',
    });
  });

  it('should call orWhere count of fields times', () => {
    const fields = ['name', 'slug', 'text'];
    const res = buildTermFactory('UPPER', fields);
    res(builderMock);

    expect(orWhereSpy).toBeCalledTimes(fields.length);
    expect(orWhereSpy).toBeCalledWith('LOWER(name) LIKE :search', {
      search: '%upper%',
    });
  });
});