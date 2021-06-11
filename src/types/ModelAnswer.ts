export class ModelAnswer {
    public id: number;
    public keywords: Array<string>;
    public fullAnswer: string;

    constructor(id: number, keywords: Array<string>, fullAnswer: string) {
        this.id = id;
        this.keywords = keywords;
        this.fullAnswer = fullAnswer;
    }
}
