import { Pipe, PipeTransform } from "@angular/core";
import { IBook } from "./model/author";

@Pipe({
    name: 'sortBy'
})
export class SortPipe implements PipeTransform {
    /**
     * 
     * @param value 
     * @param args 
     * @returns ascending or descending books by title
     */
    transform(value: any, ...args: any[]) {
        return value.sort((firstItem: IBook, secondItem: IBook) => {
            const firstItemTitle = firstItem.title.toLowerCase();
            const secondItemTitle = secondItem.title.toLowerCase();

            if (firstItemTitle > secondItemTitle) {
                return args[0] === 'asc' ? 1 : -1 
            } 
            if (firstItemTitle < secondItemTitle) {
                return args[0] === 'asc' ? -1 : 1
            }    
            return 0
        })
    }
}
