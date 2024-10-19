export interface IBook {
    imageUrl: string;
    title: string;
    purchaseLink: string;
    PublishDate: string
}

export interface IAuthor {
    author: string;
    birthday: string;
    birthPlace: string;
    books: [IBook]
}

export interface IAuthorAPIResponse {
    data: IAuthor,
    status: string;
}