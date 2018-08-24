import { Moment } from 'moment';

export interface Project {
    title: string; // not the book title
    authors: Author[];
    description: string;
    notes?: Note[];
    book: Book;
}

export interface Note {
    message: string;
    date?: string;
    author: string;
}
export interface Author {
    name: string;
    email: string;
    roles?: string[];
}

export interface Book {
    metaData: BookMetadata;
    title: string;
    template: string;
    sections: Section[];
    cover: Image;
}

export interface BookMetadata {
    authors: Author[];
    language: string;
    lastModificationDate?: Date;
    rights?: Rights;
    attributionUrl?: string;
}

export interface Rights {
    description: string;
    attributionUrl: string;
}

export interface Section {
    subsections?: Section[];
    id: string;
    type: string;
    content: Content;
    includeInToc?: boolean;
    includeInLandmarks?: boolean;
}

export interface Content {
    title: string;
    content: string;
}

export enum Licence {
    MIT = 'mit',
    TEST = 'test',
}

export type Licences = Licence.MIT | Licence.TEST;

export interface Image {
    path: string;
    licence: Licences;
    attributionUrl: string;
}
