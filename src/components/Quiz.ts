import { ModelAnswer } from '../types/ModelAnswer';
import { Question } from '../types/Question';

const ModelAnswers: Array<ModelAnswer> = new Array<ModelAnswer>();
const Questions: Array<Question> = new Array<Question>();

const { StringUtils } = require('turbocommons-ts');

const FormatQuiz = (title: Array<string>) => {
    let result = '';
    title.forEach((value: string) => {
        result += value;
        result += '\n';
    });
    return result;
};

const cleanKeyword = (keyword: string) : string => {
    const result =  keyword.replace(new RegExp("'", 'g'), "");
    return result;
}

const CompareEachAnswerWordWithModelAnswerKeyword = (
    modelAnswerKeywords: Array<string>,
    answerWords: Array<string>,
): boolean => {
    const matchingSequence: Array<string> = [];

    modelAnswerKeywords.forEach((keyword) => {
        answerWords.forEach((word) => {
            const cleanKey = cleanKeyword(keyword);
            const result = StringUtils.compareSimilarityPercent(word, cleanKey);
            debugger;
            if (result > 50) {
                matchingSequence.push(word);
            } else {
                console.log(word);
            }
        });
    });

    console.log("matchingSequence = " + matchingSequence);
    console.log("length of matchingSequence = " + matchingSequence.length);
    console.log("length of model answer keywords = " + modelAnswerKeywords.length);
    if (matchingSequence.length / modelAnswerKeywords.length >= 0.75) {
        console.log(CompareEachAnswerWordWithModelAnswerKeyword.name +
          ': determine that it is correct, returning true');
        return true;
    } else {
        console.log(CompareEachAnswerWordWithModelAnswerKeyword.name +
          ': determine that it is incorrect, returning false');
        return false;
    }
};


const GetModelKeywordsFromId = (id: number): Array<string> => {
    return ModelAnswers[id].keywords;
};

const GetQuestionTextFromId = (id: number): string => {
    return Questions[id].text;
};

export {
    ModelAnswers,
    FormatQuiz,
    CompareEachAnswerWordWithModelAnswerKeyword,
    Questions,
    GetQuestionTextFromId,
    GetModelKeywordsFromId,
};
