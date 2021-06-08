import { NotFoundException } from "@nestjs/common";
import { Like, UpdateResult } from "typeorm";

export function checkPagination(obj: any) {
  const paginate = {
    take: 10,
    skip: 0
  };
  if (!obj.limit) delete paginate.take;
  if (!obj.skip) delete paginate.skip;
  if (obj.skip) {
    paginate.skip = obj.skip;
    paginate.take = 10;
  }
  return paginate
}

export function isCanGetData(obj: any, id: number) {
  if (!obj) {
    throw new NotFoundException(`The given id '${id}' is not found.`)
  }
}

export function checkFilterArg(obj: object): object {
  for (let [key, value] of Object.entries(obj)) {
      if (!value) {
          delete obj[key]
      }
  }

  return obj;
}

export function isCanDeleteData(obj: UpdateResult, id: number | string): void {
  if (obj?.affected === 0) {
      throw new NotFoundException(`The given id '${id}' is not found`);
  }

  if (obj?.raw?.affectedRows === 0) {
      throw new NotFoundException(`The given id '${id}' is not found`);
  }
}

export function checkSearchArg(obj: any): object[] {
  const array = [];
    for (let [key, value] of Object.entries(obj)) {
        if (!value) {
            delete obj[key]
        }

        array.push({ [key]: Like(`%${value}%`) });
    }

    return array;
}

