import { BaseHttpClient } from './base';
import { ModelAnswer } from '../types/ModelAnswer';
import { Question } from '../types/Question';

export class HttpClient extends BaseHttpClient {
  private static classInstance?: HttpClient;
  public answers: any;
  public questions: any;

  private constructor() {
    super('http://localhost:5000');
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new HttpClient();
    }
    return this.classInstance;
  }



  public getModelAnswers = async ()  => {
      this.instance.get<ModelAnswer[]>('/modelanswers').then(response =>{
          this.answers = response;
          });
  }



  public getQuestions = async () => {
      this.instance.get<Question[]>('/questions').then(response => {
        this.questions = response;
      });
  }


}