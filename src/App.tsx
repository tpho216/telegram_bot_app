import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { Route, Router, Text, ButtonGroup, Button, useText, Image } from '@urban-bot/core';
import logo from './assets/aether.jpg';
import { CompareEachAnswerWordWithModelAnswerKeyword } from './components/Quiz';
import { HttpClient } from './httpclient/implementation';
import { ModelAnswer } from './types/ModelAnswer';
import { Question } from './types/Question';
const { StringUtils } = require('turbocommons-ts');
let ModelAnswersArr : Array <ModelAnswer> = new Array<ModelAnswer>();
let QuestionsArr : Array <Question> = new Array <Question>();

function Increment() {
    const [value, setValue] = useState(0);

    const addNumber = () => {
        setValue(value + 1);
    };

    return (
        <Image
            title={value}
            file={fs.createReadStream(logo)}
            buttons={
                <ButtonGroup>
                    <Button onClick={addNumber}>Add one</Button>
                </ButtonGroup>
            }
        />
    );
}

//prayer : string, userId : string
function AddPrayer() {
    const [text, setText] = useState('Say something');

    useText(({ text }) => {
        setText(text);
    });

    return (
        <Text>
            <i>{text}</i>
        </Text>
    );
}

let numberQLeft: number;

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

const ToModelAnswer = (objects : Array<Object>) =>  {
    objects.forEach((object) =>
    {
        var answer = Object.values(object);
        const id : number = answer[0];
        const keywords : Array<string> = answer[1];
        const fullanswer : string = answer[2];
        ModelAnswersArr.push(new ModelAnswer(id, keywords, fullanswer));
    });
}

const ToQuestions = (objects : Array<Object>) => {
    QuestionsArr = [];
    objects.forEach((object) =>
    {
        var question = Object.values(object);
        const id : number = question[0];
        const fullquestion : string = question[1];
        QuestionsArr.push(new Question(id, fullquestion));
    });

}
const fetchData = async(client : HttpClient) => {
    try {
        await client.getModelAnswers();
        await client.getQuestions();
    }
    catch (e) {
        console.log(e);
    }

};

function GetQuiz(props : any) {
    const [prepare, setPrepare]  : any = useState(null);
    const [init, setInit] : any = useState(null);
    const [text, setText] = useState('Do you want to Quiz? ' + '\n answer "yes", "no" to stop');
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState('Not yet');
    const [reveal, setReveal] = useState('Not yet');
    const [modelAnswer, setModelAnswer] = useState('');
    const [modelKeywords, setModelKeywords] = useState(['']);
    const [answer, setAnswer] = useState('Not yet');
    //run once
    useEffect(() => {
        if (typeof (HttpClient.getInstance()) !== 'undefined')
            var answer_values = HttpClient.getInstance().answers;
        var question_values = HttpClient.getInstance().questions;
        if (typeof(answer_values) !== 'undefined') {
            ToModelAnswer(answer_values);
        }
        if (typeof(question_values) !== 'undefined') {
            ToQuestions(question_values);
        }
        else {
            console.log('Instance data not fetched yet.');
        }
    },[]);


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
        if (QuestionsArr.length <= 1) {
            numberQLeft = 0;
            const info = '\n\nNumber of questions left = ' + numberQLeft;
            const congrats = '\n\n👏🎉🎊 You finished the Quiz. Congrats!';
            const instruct = "send 'reset' to do quiz again";
            setText(info + congrats);
            return;
        }
        console.log('Number of QUESTIONS = ' + QuestionsArr.length);
        numberQLeft = QuestionsArr.length - 1; //A little hacky but it makes sense ^^
        //Actually so that it won't reach 20 ^ break the boundary
        const randomIndex = Math.floor(Math.random() * numberQLeft);
        console.log('RANDOM INDEX = ' + randomIndex);
        const info = '\n\nNumber of questions left = ' + numberQLeft;

        setText(
            QuestionsArr[randomIndex].text +
                '\n\nsend "stop" to finish the quiz' +
                '\nsend "more" to see question' +
                '\nsend "reveal" to see answer' +
                '\nsend "answer" to attempt answer' +
                info,
        );

        setModelAnswer(getFullAnswerFromId(QuestionsArr[randomIndex].id-1));
        setModelKeywords(getKeywordsFromId(QuestionsArr[randomIndex].id-1));
        debugger;
        if (QuestionsArr.length > 1) {
            QuestionsArr.splice(randomIndex, 1);
        } else if (QuestionsArr.length <= 1) {
            numberQLeft = 0;
            const congrats = '\n\n👏🎉🎊 You finished the Quiz. Congrats!';
            setText(info + congrats);
        }

        setIndex(randomIndex);
        debugger;
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
            //TODO Should have a new instance of HttpClient
            if (typeof (HttpClient.getInstance()) !== 'undefined') {
                ToQuestions(HttpClient.getInstance().questions);
            }
            setText("Quiz resetted, reply 'more' to redo questions")
        }
        else if (text !== 'answer' && text !== 'reveal' && text !== 'stop' && text !== 'more') {
            const isCorrect = CompareEachAnswerWordWithModelAnswerKeyword(modelKeywords, text.split(' '));
            let diff = '\nNumber of different characters from model answer is: ';
            diff += '\n' + StringUtils.compareByLevenshtein(text, modelAnswer);
            const result = isCorrect ? 'Correct' : 'Incorrect';

            const instruction = '\n\nsend "more" to see next question' + "\nsend 'reveal' to see the answer";

            const info = '\n\nNumber of questions left = ' + numberQLeft;
            setText('The answer was ' + result + diff + instruction + info);
        }

    });

    return (
        <Text>
            <i> {text} </i>
        </Text>
    );
}

const getKeywordsFromId = (id : number) : Array<string> => {
    return ModelAnswersArr[id].keywords;
}

const getFullAnswerFromId = (id : number) : string => {
    return ModelAnswersArr[id].fullAnswer;
}

export function App() {
    initializeClient();
    if (typeof(HttpClient.getInstance()) !== 'undefined') {
        fetchData(HttpClient.getInstance());
        console.log("fetched data");
    }

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
