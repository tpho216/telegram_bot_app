import { Question } from "./Question";

export class User {
    public id: string;
    public instanceNum : number;
    public QLeft : Array<Question>;
    constructor(id: string, instanceNum: number, QLeft : Array<Question>) {
        this.id = id;
        this.instanceNum = instanceNum;
        this.QLeft = QLeft;
    }
}