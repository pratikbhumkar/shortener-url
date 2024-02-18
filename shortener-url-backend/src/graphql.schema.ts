
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewURL {
    longURL: string;
}

export class URL {
    longURL: string;
    shortURL: string;
}

export abstract class IQuery {
    abstract URL(shortURL: string): Nullable<URL> | Promise<Nullable<URL>>;
}

export abstract class IMutation {
    abstract createURL(input: NewURL): URL | Promise<URL>;

    abstract deleteURL(longURL: string): Nullable<URL> | Promise<Nullable<URL>>;
}

type Nullable<T> = T | null;
