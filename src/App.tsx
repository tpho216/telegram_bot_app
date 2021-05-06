import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { Route, Router, Text, ButtonGroup, Button, useText, Image } from '@urban-bot/core';
import logo from './assets/aether.jpg';
import {RevelationTitles, FormatQuiz, MockedQuestions, ModelAnswers, MockedModelAnswers,
  switchQuestions,
  ModelAnswerKeywords, ModelAnswerKeywordsTwo,
  ModelAnswerKeywordsThree, ModelAnswerKeywordsFour,
  ModelAnswerKeywordsFive, ModelAnswerKeywordsSix,
  ModelAnswerKeywordsSeven, ModelAnswerKeywordsEight,
  ModelAnswerKeywordsNine, ModelAnswerKeywordsTen,
  ModelAnswerKeywordsEleven, ModelAnswerKeywordsTwelve,
  ModelAnswerKeywordsThirteen, ModelAnswerKeywordsFourteen,
  ModelAnswerKeywordsFifteen, ModelAnswerKeywordsSixteen,
  ModelAnswerKeywordsSeventeen, ModelAnswerKeywordsEighteen,
  ModelAnswerKeywordsNineteen, ModelAnswerKeywordsTwenty,
  GetModelKeywordsFromId,
  Questions, GetQuestionTextFromId,
  TimeOfFulfillment, CompareEachAnswerWordWithModelAnswerKeyword} from './components/Quiz';
const {StringUtils} = require('turbocommons-ts');

function Echo() {
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
  )
}

let numberQLeft : number;


function GetQuiz() {

  const [text, setText] = useState('Do you want to Quiz? ' +
    '\n answer "yes", "no" to stop');
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState('Not yet');
  let [reveal, setReveal] = useState('Not yet');

  let [modelAnswer, setModelAnswer]  = useState("");


  let [modelKeywords, setModelKeywords] = useState([""]);
  let [answer, setAnswer] = useState('Not yet');
  //console.log("Get Quiz called");

  useEffect(() => {
    console.log("useEffect: Reveal");
    var result = "Answer> " + modelAnswer;
    var instruction = '\n\nsend "more" to see next question';
    setText(result + instruction);

  }, [reveal])

  useEffect(() => {
    console.log("useEffect: Answer")
    setText("Please type in the answer or send 'ask me'");

  }, [answer])


  useEffect(() => {
    console.log("Number of QUESTIONS = " + Questions.length);
    numberQLeft = Questions.length - 1; //A little hacky but it makes sense ^^
    //Actually so that it won't reach 20 ^ break the boundary
    var randomIndex = Math.floor(Math.random() * numberQLeft);
    console.log("RANDOM INDEX = " + randomIndex);
    var info = "\n\nNumber of questions left = " + numberQLeft;

    setText(Questions[randomIndex].text +
      '\n\nsend "stop" to finish the quiz' +
      '\nsend "more" to see question' +
      '\nsend "reveal" to see answer' +
      '\nsend "answer" to attempt answer' + info);
    // console.log("Before spliced \n" + Questions[randomIndex].text);
    // console.log("ID = " + Questions[randomIndex].id);
    // console.log("index = " + randomIndex);

    // console.log("Model answer: " + ModelAnswers[randomIndex]);
    setModelAnswer(MockedModelAnswers[Questions[randomIndex].id]);
    setModelKeywords(switchQuestions(Questions[randomIndex].id));

    // console.log("Look at this" + modelKeywords);
    // console.log("Number of questions left: " + Questions.length);
    if (Questions.length > 1) {
      Questions.splice(randomIndex, 1);
    }
    else if (Questions.length <= 1) {
      numberQLeft = 0;
      var congrats = "\n\n👏🎉🎊 You finished the Quiz. Congrats! Happy sealing!";
      setText(info + congrats);
    }
    // console.log("After spliced \n" + Questions[randomIndex].text);
    // console.log("index = " + randomIndex);
    // console.log("ID = " + Questions[randomIndex].id);

    setIndex(randomIndex);
  }, [question])



  useText(({ text }) => {
    if (text === 'ask me' || text === 'more') {
      // console.log("User ask for a question");
      setQuestion(Math.random().toString());

    }

    else if (text === 'reveal'){
      //a little hacky but this notifies UseEffect that is based on
      //answer value
      setReveal(Math.random().toString());
    }

    else if (text === 'answer'){
      setAnswer(Math.random().toString());
    }

    else if (text === 'stop') {
      setText('God bless!');
    }

    else if (text !== 'answer' && text !== 'reveal'
    && text !== 'stop' && text !== 'more') {

      //modelKeywords = switchQuestions(index);
      // console.log("Model keywords are " + modelKeywords);
      var isCorrect = CompareEachAnswerWordWithModelAnswerKeyword(modelKeywords,text.split(' '))

      var diff = "\nNumber of different characters from model answer is: ";
      // console.log("model keywords: " + modelKeywords);
      diff += "\n" + StringUtils.compareByLevenshtein(text, modelAnswer);
      var result = isCorrect ? "Correct" : "Incorrect";

      var instruction = '\n\nsend "more" to see next question'
      + "\nsend 'reveal' to see the answer";

      var info = "\n\nNumber of questions left = " + numberQLeft;
      setText("The answer was " + result + diff + instruction + info)
    }


  });



  return (
    <Text>
      <i> {text} </i>
    </Text>
  )

}

export function App() {
    return (
        <>
            <Text>Welcome to Urban Bot! Type /echo or /increment or
              /pray or /quizme </Text>
            <Router>
                <Route path="/echo">
                    <Echo />
                </Route>
                <Route path="/increment">
                    <Increment />
                </Route>
                <Route path="/pray">
                  <AddPrayer/>
                </Route>
                <Route path="/quizme">
                  <GetQuiz/>
                </Route>
            </Router>
        </>
    );
}
