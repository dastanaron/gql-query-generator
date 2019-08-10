class QueryBuilder {

    constructor(base, filter, select)
    {
        this.base = base;
        this.filterObject = filter;
        this.selectObject = select;
        this.buildQuery();
    }

    buildQuery()
    {
        this.queryString =  '{'+this.base + this.filter() + this.select() + '}';
    }

    get query()
    {
        return this.queryString;
    }

    filter()
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
                string += key+': '+this.elementType(this.filterObject[key]);
            }

            if(totalCount !== totalIteration) {
                string += ', ';
            }
            totalIteration++;
        }

        string += ')';
        return string;
    }

    elementType(element)
    {
        switch(typeof (element)) {
            case 'string':
                return '"'+element+'"';
            case 'array':
                return element.loin('","');
            default:
                return element;
        }
    }

    select()
    {
        let string = '{';
        string += this.recurse(this.selectObject);
        string += '}';
        return string;

        //console.log(this.recurse(this.selectObject));

    }


    recurse(object) {
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

module.exports = QueryBuilder;