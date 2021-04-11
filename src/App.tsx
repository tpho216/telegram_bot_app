import React, { useState } from 'react';
import fs from 'fs';
import { Route, Router, Text, ButtonGroup, Button, useText, Image } from '@urban-bot/core';
import logo from './assets/logo.png';

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

export function App() {
    return (
        <>
            <Text>Welcome to Urban Bot! Type /echo or /increment</Text>
            <Router>
                <Route path="/echo">
                    <Echo />
                </Route>
                <Route path="/increment">
                    <Increment />
                </Route>
            </Router>
        </>
    );
}
