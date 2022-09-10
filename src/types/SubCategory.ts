export default class SubCategory {
    constructor(
        public name?: string,
        public slug?: string,
        public id?: number,
        public parent_category?: number,
    ) {}
}