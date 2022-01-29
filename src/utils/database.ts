import { SelectQueryBuilder, InsertQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder } from "typeorm";


export function logQuery(queryBuilder: any) {
    console.log(queryBuilder.getQuery())
    return queryBuilder
}