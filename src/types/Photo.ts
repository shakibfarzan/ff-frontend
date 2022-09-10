export default class Photo {
    constructor(
        public id?: number,
        public name?: string,
        public src?: string,
        public category?: number,
        public sub_category?: number,
    ) {}
}