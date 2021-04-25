import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { Route, Router, Text, ButtonGroup, Button, useText, Image } from '@urban-bot/core';
import logo from './assets/aether.jpg';
import {RevelationTitles, FormatQuiz, Questions, EventLocations, TimeOfFulfillment} from './components/Quiz';


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

  const [text, setText] = useState('Do you want to Quiz? ' +
    '\n answer "yes", "no" to stop');
  let [index, setIndex] = useState(0);
  let [answer, setAnswer] = useState('Not yet');


  useEffect(() => {
    var result = "Title: " + RevelationTitles[index] + '\n' +
      "Event Location: " + EventLocations[index] + '\n' +
     "Time of Fulfillment: " + TimeOfFulfillment[index];
    setText(result + '\n\nsend "more" to see next question');
  },[answer])

  useEffect(() => {
    var questionTemplate = "Title: " + '\n' +
      "Event Location: " + '\n' +
      "Time of Fulfillment: ";
    var randomIndex = Math.floor(Math.random() * Questions.length);
    setText( Questions[randomIndex] +
      '\n\n' + questionTemplate +
      '\n\nsend "stop" to finish the quiz' +
      '\nsend "more" to see question' +
      '\nsend "reveal" to see answer');
    setIndex(randomIndex);

  }, [index])

  useText(({ text }) => {
    if (text === 'more') {
      setIndex(0);
    }

    if (text === 'reveal'){
      //a little hacky but this notifies UseEffect that is based on
      //answer value
      setAnswer(index.toString());
    }

    if (text === 'stop') {
      setText('God bless!');
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
