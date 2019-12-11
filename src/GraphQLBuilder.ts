export interface FilterInterface {
    [key: string]: any,
}

/**
 * Class GraphQLBuilder
 */
export default class GraphQLBuilder {
    base: string;
    filterObject: FilterInterface;
    selectObject: any[];
    builtQuery: string;

    /**
     * @param base
     * @param filter
     * @param select
     */
    constructor(base: string, filter: FilterInterface, select: any[])
    {
        this.base = base;
        this.filterObject = filter;
        this.selectObject = select;
        this.builtQuery = '';
        this.buildQuery();
    }

    public getQuery(): string
    {
        return this.builtQuery;
    }

    private buildQuery(): void
    {
        this.builtQuery =  '{'+this.base + this.filter() + this.select() + '}';
    }

    private filter(): string
    {
        let string = '(';
        let totalIteration = 1;
        let totalCount = Object.keys(this.filterObject).length;

        for (let key in this.filterObject) {

            if(Array.isArray(this.filterObject[key])) {

                string += key+ ': [';
                let iteration = 1;
                let itemCount = this.filterObject[key].length;
                for(let subkey in this.filterObject[key]) {
                    string += '"'+this.filterObject[key][subkey]+'"';
                    if(iteration === itemCount) {
                        string += '';
                    }
                    else {
                        string += ', ';
                    }
                    iteration++;
                }
                string += ']';
            }
            else {
                string += key+': '+this.getElementByType(this.filterObject[key]);
            }

            if(totalCount !== totalIteration) {
                string += ', ';
            }
            totalIteration++;
        }

        string += ')';
        return string;
    }

    private getElementByType (element: any): any
    {
        console.log(typeof (element));
        switch(typeof (element)) {
            case 'string':
                return '"'+element+'"';
            // @ts-ignore
            case 'array':
                return element.join('","');
            default:
                return element;
        }
    }

    private select(): string
    {
        let string = '{';
        string += this.recurse(this.selectObject);
        string += '}';
        return string;
    }

    private  recurse(object: any): string
    {
        let string = '';
        for (let key in object) {
            if(typeof (object[key]) === 'object') {

                for(let sub in object[key]) {
                    string += sub + '{'+this.recurse(object[key][sub])+'} ';
                }

            }
            else if(Array.isArray(object[key])) {
                //string += object[key].join(' ');
            }
            else {
                string += object[key] + ' ';
            }
        }
        return string;
    }
}