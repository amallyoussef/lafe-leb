import directus from "@/app/utils/config";
import { createItem, readItems, readSingleton, withToken } from "@directus/sdk";
import { isEmpty } from "lodash";

export type Res = { [key: string]: any | { [key: string]: any } };

export const directusFetch = ({
  collection,
  query = {},
  limit = -1,
  offset,
  page,
  fields = ["*"],
  withoutStatus = false,
  withoutSort = false,
  deep = {},
  singleton = false,
  withAuth = false,
  body = {},
}: any) => {
  const readParams: any = {
    limit,
    fields,
    filter: query,
    sort: withoutSort ? [] : ["sort"],
  };
  if (typeof offset !== "undefined") {
    readParams.offset = offset;
  }
  if (typeof page !== "undefined") {
    readParams.page = page;
  }
  if (!withoutStatus) {
    readParams.query = { ...query, status: { _eq: "published" } };
  }
  if (deep && !isEmpty(deep)) {
    readParams.deep = deep;
  }

  if (singleton) {
    return new Promise(function (resolve, reject) {
      directus
        .request(
          withAuth
            ? withToken(
                process.env.NEXT_PUBLIC_AUTH_TOKEN as string,
                readSingleton(collection, readParams)
              )
            : readSingleton(collection, readParams)
        )
        .then((res: Res) => {
          resolve(res);
        })
        .catch((e: Res) => {
          console.log(e);
          reject({ error: e });
        });
    });
  }
  return new Promise(function (resolve, reject) {
    directus
      .request(
        withAuth
          ? withToken(
              process.env.NEXT_PUBLIC_AUTH_TOKEN as string,
              body && !isEmpty(body)
                ? createItem(collection, body)
                : readItems(collection, readParams)
            )
          : body && !isEmpty(body)
          ? createItem(collection, body)
          : readItems(collection, readParams)
      )
      .then((res: Res) => {
        resolve(res);
      })
      .catch((e: Res) => {
        console.log(e);
        reject({ error: e });
      });
  });
};
