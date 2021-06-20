import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { Route, Router, Text, ButtonGroup, Button, useText, Image } from '@urban-bot/core';
import logo from './assets/aether.jpg';
import { CompareEachAnswerWordWithModelAnswerKeyword } from './components/Quiz';
import { HttpClient } from './httpclient/implementation';
import { ModelAnswer } from './types/ModelAnswer';
import { Question } from './types/Question';
import {User} from './types/User';
const { StringUtils } = require('turbocommons-ts');
let ModelAnswersArr : Array <ModelAnswer> = new Array<ModelAnswer>();

let Users : Array<User> = new Array <User>();
let instanceNum : number = 0;
let CurrentChatId : string = "";
let isNewUser : boolean = false;
const initializeClient = () : HttpClient | undefined => {
    console.log("Initializing question answer sets...")
    const httpClient = HttpClient.getInstance();
    if (httpClient=== null || typeof(httpClient)==="undefined"){
        console.log("HttpClient instance is null or undefined");
    }
    else {
        return httpClient;
    }
}

const ToModelAnswer = (objects : Array<Object>) : Array<ModelAnswer> =>  {
    let ModelAnswersArr : Array<ModelAnswer> = new Array<ModelAnswer> ();
    objects.forEach((object) =>
    {
        var answer = Object.values(object);
        const id : number = answer[0];
        const keywords : Array<string> = answer[1];
        const fullanswer : string = answer[2];
        ModelAnswersArr.push(new ModelAnswer(id, keywords, fullanswer));
    });

    return ModelAnswersArr;
}

const ToQuestions = (objects : Array<Object>) : Array<Question> => {
    let QuestionsArr : Array<Question> = new Array<Question> ();
    objects.forEach((object) =>
    {
        var question = Object.values(object);
        const id : number = question[0];
        const fullquestion : string = question[1];
        QuestionsArr.push(new Question(id, fullquestion));
    });

    return QuestionsArr;

}
const fetchData = async(client : HttpClient) => {
    try {
        await client.getModelAnswers();
        await client.getQuestions();
    }
    catch (e) {
        console.log("Error fetching data from Quiz API : " + e);
    }
};

function GetQuiz() {

    const [text, setText] = useState('Do you want to Quiz? ' + '\n answer "yes", "no" to stop');
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState('Not yet');
    const [reveal, setReveal] = useState('Not yet');
    const [modelAnswer, setModelAnswer] = useState('');
    const [modelKeywords, setModelKeywords] = useState(['']);
    const [answer, setAnswer] = useState('Not yet');

    useText(({chat}) => {
        CurrentChatId = chat.id;
        console.log("Quiz: current chat id = " + CurrentChatId);
    });

    //run once
    useEffect(() => {
        console.log("Quiz: current chat id = " + CurrentChatId);

        console.log("User at index = " + getUserIndexFromId(CurrentChatId) + " requests quiz");
        if (typeof (HttpClient.getInstance()) !== 'undefined') {
            var answer_values = HttpClient.getInstance().answers;
            var question_values = HttpClient.getInstance().questions;
        }
        if (typeof(answer_values) !== 'undefined') {
            ModelAnswersArr = ToModelAnswer(answer_values);
        }
        if (typeof(question_values) !== 'undefined') {
            Users[getUserIndexFromId(CurrentChatId)].QLeft = ToQuestions(question_values);
        }
        else {
            console.log('Instance data not fetched yet.');
        }
    },[CurrentChatId]);


    useEffect(() => {
        console.log('useEffect: Reveal');
        const result = 'Answer> ' + modelAnswer;
        const instruction = '\n\nsend "more" to see next question';
        setText(result + instruction);
    }, [reveal]);

    useEffect(() => {
        console.log('useEffect: Answer');
        setText("Please type in the answer or send 'ask me'");
    }, [answer]);

    useEffect(() => {
        if (Users[getUserIndexFromId(CurrentChatId)].QLeft.length == 0) {
            const congrats = '\n\n👏🎉🎊 You finished the Quiz. Congrats!';
            const instruction = "\n\n send 'reset' to do the quiz again";
            setText(congrats + instruction);
            return;
        }

        const instanceIndex = instanceNum - 1;
        console.log('Number of QUESTIONS = ' + Users[getUserIndexFromId(CurrentChatId)].QLeft.length);
        let numberQLeft = Users[getUserIndexFromId(CurrentChatId)].QLeft.length-1; //minus the one currently doing

        //Actually so that it won't reach 20 ^ break the boundary
        const randomIndex = Math.floor(Math.random() * numberQLeft);
        console.log('RANDOM INDEX = ' + randomIndex);
        const info = '\n\nNumber of questions left = ' + numberQLeft;

        setText(
            Users[getUserIndexFromId(CurrentChatId)].QLeft[randomIndex].text +
            '\n\nsend "stop" to finish the quiz' +
            '\nsend "more" to see question' +
            '\nsend "reveal" to see answer' +
            '\nsend "answer" to attempt answer' +
            info,
        );

        setModelAnswer(getFullAnswerFromId(Users[getUserIndexFromId(CurrentChatId)].QLeft[randomIndex].id-1, ModelAnswersArr));
        setModelKeywords(getKeywordsFromId(Users[getUserIndexFromId(CurrentChatId)].QLeft[randomIndex].id-1,  ModelAnswersArr));
        if (Users[getUserIndexFromId(CurrentChatId)].QLeft.length >= 1) {
            Users[getUserIndexFromId(CurrentChatId)].QLeft.splice(randomIndex, 1);
        } else if (Users[getUserIndexFromId(CurrentChatId)].QLeft.length == 0) {
            const congrats = '\n\n👏🎉🎊 You finished the Quiz. Congrats!';
            const instruction = "\n\n send 'reset' to do the quiz again";
            setText(info + congrats + instruction);
        }

        setIndex(randomIndex);
    }, [question]);


    useText(({ text }) => {
        if (text === 'ask me' || text === 'more') {
            setQuestion(Math.random().toString());
        } else if (text === 'reveal') {
            //a little hacky but this notifies UseEffect that is based on
            //answer value
            setReveal(Math.random().toString());
        } else if (text === 'answer') {
            setAnswer(Math.random().toString());
        } else if (text === 'stop') {
            setText('God bless!');
        }
        else if (text === 'reset') {
            if (typeof (HttpClient.getInstance()) !== 'undefined') {
                Users[getUserIndexFromId(CurrentChatId)].QLeft = ToQuestions(HttpClient.getInstance().questions);
            }
            setText("Quiz resetted, reply 'more' to redo questions")
        }
        else if (text !== 'answer' && text !== 'reveal' && text !== 'stop' && text !== 'more') {
            const isCorrect = CompareEachAnswerWordWithModelAnswerKeyword(modelKeywords, text.split(' '));
            let diff = '\nNumber of different characters from model answer is: ';
            diff += '\n' + StringUtils.compareByLevenshtein(text, modelAnswer);
            const result = isCorrect ? 'Correct' : 'Incorrect';
            const instruction = '\n\nsend "more" to see next question' + "\nsend 'reveal' to see the answer";
            const info = '\n\nNumber of questions left = ' + Users[getUserIndexFromId(CurrentChatId)].QLeft.length;
            setText('The answer was ' + result + diff + instruction + info);
        }

    });

    return (
        <Text>
            <i> {text} </i>
        </Text>
    );
}


const getKeywordsFromId = (id : number, ModelAnswersArr : Array<ModelAnswer>) : Array<string> => {
    return ModelAnswersArr[id].keywords;
}

const getFullAnswerFromId = (id : number, ModelAnswersArr : Array<ModelAnswer>) : string => {
    return ModelAnswersArr[id].fullAnswer;
}

const getUserIndexFromId = (id: string) : number => {
    return Users.findIndex(x => x.id === id);
}


export function App() {
    initializeClient();
    const dummyQLeft = new Array <Question>();

    useText(({chat})=> {
        let isOldUser = Users.find(x => x.id === chat.id);
        CurrentChatId = chat.id;

        console.log("Current Chat Id = " + CurrentChatId);
        if (typeof (isOldUser) === 'undefined') {
            console.log('This is a new user');
            //init user
            instanceNum = instanceNum + 1;

            const user : User = new User(chat.id, instanceNum, dummyQLeft);
            console.log("Created user number with chatId = " + chat.id + " with instanceNum = " + instanceNum);

            Users.push(user);
        }

        else {
            console.log('This is an old user. instanceNum = ' + instanceNum);
        }
    })

    if (typeof(HttpClient.getInstance()) !== 'undefined') {
        fetchData(HttpClient.getInstance());
        console.log("fetched data");
    } //TODO: Changes to try deployment on Heroku

    return (
        <>
            <Text>Hi, I'm a bot designed for quiz activities! Type /quizme to start the quiz </Text>
            <Router>
                <Route path="/quizme">
                    <GetQuiz />
                </Route>
            </Router>
        </>
    );
}
