# Text search for typeorm

## Requirements

| Dependency | version |
|---|:-:|
| node  | > 10 |
| typeorm | ^0.2.25 |

## Installation:

```bash
npm i --save typeorm-text-search
```

## Usage

```ts
import { textSearchByFields } from 'typeorm-text-search';

const queryBuilder = await connection.createQueryBuilder(User, "user");
textSearchByFields<User>(queryBuilder, 'SearchTerm', ['fields', 'to', 'search by']);

const users = queryBuilder.getMany();
```