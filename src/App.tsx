import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { Route, Router, Text, ButtonGroup, Button, useText, Image } from '@urban-bot/core';
import logo from './assets/aether.jpg';
import {RevelationTitles, FormatQuiz, Questions, ModelAnswers,
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

function GetQuiz() {
  console.log("Get Quiz called");
  const [text, setText] = useState('Do you want to Quiz? ' +
    '\n answer "yes", "no" to stop');
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState('Not yet');
  let [reveal, setReveal] = useState('Not yet');
  let [modelAnswer, setModelAnswer] = useState('Not yet');
  let [answer, setAnswer] = useState('Not yet');

  useEffect(() => {
    console.log("useEffect: Reveal")
    var result = "Answer> " + modelAnswer;
    var instruction = '\n\nsend "more" to see next question';
    setText(result + instruction);
  },[reveal])

  useEffect(() => {
    var questionTemplate = "";
    var randomIndex = Math.floor(Math.random() * Questions.length);
    console.log("random index = " + randomIndex);
    setText( Questions[randomIndex] +
       + questionTemplate +
      '\n\nsend "stop" to finish the quiz' +
      '\nsend "more" to see question' +
      '\nsend "reveal" to see answer' +
      '\nsend "answer" to attempt answer');
    console.log("Model answer: " + ModelAnswers[randomIndex]);
    setModelAnswer(ModelAnswers[randomIndex]);
    console.log("Number of questions left: " + Questions.length);
    setIndex(randomIndex);
  }, [question])

  useEffect(() => {
      console.log("useEffect: Answer")
      setText("Please type in the answer or send 'ask me'");

  }, [answer])

  useText(({ text }) => {
    if (text === 'ask me' || text === 'more') {
      console.log("User ask for a question");
      setQuestion(Math.random().toString());
    }

    if (text === 'reveal'){
      //a little hacky but this notifies UseEffect that is based on
      //answer value

      setReveal(Math.random().toString());
    }

    if (text === 'answer'){
      setAnswer(Math.random().toString());
    }
    if (text === 'stop') {
      setText('God bless!');
    }

    else if (text !== 'answer' && text !== 'reveal'
    && text !== 'stop' && text !== 'more') {
      // console.log("A different case");
      // console.log("index =" + index);
      let modelKeywords : Array <string> = [""];
      modelKeywords = switchQuestions(index);
      console.log("Model keywords are " + modelKeywords);
      var isCorrect = CompareEachAnswerWordWithModelAnswerKeyword(modelKeywords,text.split(' '))

      var diff = "\nNumber of different characters from model answer is: ";

      diff += "\n" + StringUtils.compareByLevenshtein(text, modelAnswer);
      var result = isCorrect ? "Correct" : "Incorrect";


      var instruction = '\n\nsend "more" to see next question'
      + "\n send 'reveal' to see the answer";
      setText("The answer was " + result + diff + instruction)
    }


  });

  const switchQuestions = (index : number) : Array<string> => {
    let result : Array <string> = [""];

    switch (index) {
      case 0:
        return ModelAnswerKeywords;
      case 1:
        return ModelAnswerKeywordsTwo;
      case 2:
        return ModelAnswerKeywordsThree;
      case 3:
        return ModelAnswerKeywordsFour;
      case 4:
        return ModelAnswerKeywordsFive;
      case 5:
        return ModelAnswerKeywordsSix;
      case 6:
        return ModelAnswerKeywordsSeven;
      case 7:
        return ModelAnswerKeywordsEight;
      case 8:
        return ModelAnswerKeywordsNine;
      case 9:
        return ModelAnswerKeywordsTen;
      case 10:
        return ModelAnswerKeywordsEleven;
      case 11:
        return ModelAnswerKeywordsTwelve;
      case 12:
        return ModelAnswerKeywordsThirteen;
      case 13:
        return ModelAnswerKeywordsFourteen;
      case 14:
        return ModelAnswerKeywordsFifteen;
      case 15:
        return ModelAnswerKeywordsSixteen;
      case 16:
        return ModelAnswerKeywordsSeventeen;
      case 17:
        return ModelAnswerKeywordsEighteen;
      case 18:
        return ModelAnswerKeywordsNineteen;
      case 19:
        return ModelAnswerKeywordsTwenty;
      default:
        return result;
        break;
    }
  }

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
