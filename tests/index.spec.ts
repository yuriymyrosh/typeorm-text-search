import { textSearchByFields } from '../src';
import { buildOrWhereFactory } from '../src/build-or-where-factory';
jest.mock('../src/build-or-where-factory');

describe('textSearchByFields', () => {
  let orWhereSpy: any;
  let andWhereSpy: any;

  const builderMock = {
    andWhere() {
      return this;
    },
    orWhere() {
      return this;
    },
  } as any;

  beforeEach(() => {
    orWhereSpy = spyOn(builderMock, 'orWhere').and.callThrough();
    andWhereSpy = spyOn(builderMock, 'andWhere').and.callThrough();

    (buildOrWhereFactory as jest.Mock).mockClear();
  });

  it('should call andWhere', () => {
    const search = 'test search string';

    textSearchByFields(builderMock, search, ['some']);

    expect(andWhereSpy).toBeCalledTimes(1);
  });

  it('should call orWhere TOKENS time', () => {
    const search = 'test search string';

    textSearchByFields(builderMock, search, ['some']);

    expect(buildOrWhereFactory).toHaveBeenCalled();
    expect((buildOrWhereFactory as jest.Mock).mock.calls[0][0].length).toBe(3);
  });

  it('should call orWhere TOKENS time (5)', () => {
    const search = 'test search string one more';

    textSearchByFields(builderMock, search, ['some']);

    expect(buildOrWhereFactory).toHaveBeenCalled();
    expect((buildOrWhereFactory as jest.Mock).mock.calls[0][0].length).toBe(5);
  });

  it("shouldn't call orWhereFactory when whole term search", () => {
    const search = '"test search"';

    textSearchByFields(builderMock, search, ['some']);
    expect(buildOrWhereFactory).not.toHaveBeenCalled();
  });
});
