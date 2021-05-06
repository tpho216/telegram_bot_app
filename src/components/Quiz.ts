import {ModelAnswer} from "./ModelAnswer"
import {Question} from "./Question"

let RevelationTitles: Array<string>;
let MockedQuestions : Array<string>;

let MockedModelAnswers : Array<string> = [""];
let ModelAnswers : Array<ModelAnswer> = new Array<ModelAnswer>();
let Questions : Array<Question> = new Array<Question>();

let TimeOfFulfillment : Array<string>;
let ModelAnswerKeywords : Array<string>;
let ModelAnswerKeywordsTwo : Array<string>;
let ModelAnswerKeywordsThree : Array<string>;
let ModelAnswerKeywordsFour : Array<string>;
let ModelAnswerKeywordsFive : Array<string>;
let ModelAnswerKeywordsSix : Array<string>;
let ModelAnswerKeywordsSeven : Array<string>;

let ModelAnswerKeywordsEight : Array<string>;
let ModelAnswerKeywordsNine : Array<string>;
let ModelAnswerKeywordsTen : Array<string>;
let ModelAnswerKeywordsEleven : Array<string>;
let ModelAnswerKeywordsTwelve : Array<string>;
let ModelAnswerKeywordsThirteen : Array<string>;
let ModelAnswerKeywordsFourteen : Array<string>;
let ModelAnswerKeywordsFifteen : Array<string>;
let ModelAnswerKeywordsSixteen : Array<string>;
let ModelAnswerKeywordsSeventeen : Array<string>;
let ModelAnswerKeywordsEighteen : Array<string>;
let ModelAnswerKeywordsNineteen: Array<string>;
let ModelAnswerKeywordsTwenty : Array<string>;

const {StringUtils} = require('turbocommons-ts');


MockedQuestions = [
  '1. ① Write down the chapters in which 3 mysteries are written in Revelation, ② write the reason why they have been recorded in parables.'
  ,'2. ① In which chapter was the promise in Rv 2-3 fulfilled?'
  ,'3. ① After what does the salvation and the power and the kingdom of God come? Record the chapter as well.  '
  ,'4. Write down ① 2 chapters that mention with what the new kingdom and new people of the new era in Revelation is created. '
  ,"5. Write down with what do God's children and the devil's children are distinguished and write the 3 chapters that are relevant"
  ,"6. Write 5 verses where the promised pastor of Revelation is mentioned."
  ,"7. In Rv 2-3, it was promised 7 times to fight and overcome the group of the dragon. ①Write down the reason. "
  ,"8. What does the beast with 7 heads and 10 horns which the prostitute of Rev 17 sits on do. ① Write the 2 chapters and what it does. "
  ,"9. ①Write the verse that mentions how are the seven messengers of Rv 2-3 different from the 12 tribes and great multitude in white of Rv 7."
  ,"10. What is God's will that will be done on earth as it is done in heaven. ① Write 3 things."
  ,"11. Write the relevant verses for ① what is the first heaven and first earth and the new heaven and new earth, and ② how the new kingdom and new people are different from the subjects of the kingdom."
  ,"12. ① Write down the relevant chapters that show who are the betrayers, destroyers, and saviour each in Revelation "
  ,"13. ① Write 2 chapters that show to whom the blood of the new covenant was shed on the Passover night. "
  ,"14. Write the contrasting chapters for Rv 7, 14 and 19 in order. "
  ,"15. The 144,000 in Rv 14 are established ① when, ② with what, and ③ how and ④ write the relevant chapters, and ⑤ write what kind of entity are the 12,000 who are sealed from each tribe. "
  ,"16. ① Write 2 verses that show the types of food which the devil gives and the food that God gives in Revelation."
  ,"17. In Revelation, there is a tree that lets know the tree of life and tree of good and evil. ①Write down the chapters where these two kinds of tree appear. "
  ,"18. ① Write down who does the work of judgment in each of Rv 6, 15 and 18 in order. "
  ,"19. In Rev 17, the eighth beast and the ten horns judge the prostitute and take over her nation. ①Write 2 chapters where we see this beast and the ten horns. "
  ,"20. Write 2 chapters that describe who judges in Rv 16."

]


MockedModelAnswers =  [
  "1. ① Rv 1 the mystery of the seven stars (also correct if written 'the mystery of the seven stars and the seven golden lampstands')"
  + "\nRv 17 the mystery of the prostitute and the beast with seven heads and ten horns (must include 'prostitute')"
  + "\nRv 10 the mystery of the seventh trumpet" +
  "② To hide it from the enemies (also correct if 'to hide it from the outsiders')"
  ,"2. ① Rv 12"
  ,"3. ① Rv 12, after fighting and overcoming the group of the dragon"
  ,'4. ① Rv 7, Rv 14'
  ,'5. ① Mt 13, two types of seed, Rv 14, harvest, Rv 7, belonging to the 12 tribes'
  ,'6. ① Rv 1:1-2, Rv 2-3, Rv 10, Rv 12:11, Rv 22:16'
  ,"7. ① Because by overcoming, there comes the salvation and the power and the kingdom of God."
  ,"8. ① Rv 13, made the congregation receive the mark of the beast\n" +
  "Rv 12, war, opposes God\n"
  ,"9. ① 7(seven) messengers : the work of preparing the way as lamps, Rv 2-3\n" +
  "12(twelve) tribes : sealed, Rv 7 (Rv 7:1~8)\n" +
  "great multitude in white : those whose sins are washed with Jesus' blood, Rv 7 (Rv 7:14)\n"
  ,"10. ① The creation of the Holy City, new Jerusalem, the creation of 12 tribes, war of spirit and flesh"
  ,"11. ① The first heaven and first earth : Rv 6, world of the corrupted former heaven\n" +
  "          New heavn and new earth : Rv 7, recreation \n" +
  "     ② The subjects of the kingdom : Not born of God's seed\n" +
  "         New kingdom and new people: born of God's seed and are sealed\n" +
  "         Verses : Mt 8:11-12 and also Rv 6 and 7 \n"
  ,"12. ① Betrayer : Rv 13, Destroyer : Rv 17, Saviour : Rv 12"
  ,"13. ① Rv 5, Rv 7"
  ,"14. ① Rv 6, Rv 13, Rv 18"
  ,"15. ① At the fulfilment of Revelation     ② God's seed, harvest, sealed, 12 tribes\n" +
  "    ③ sealed    ④ Rv 14, Rv 7\n" +
  "    ⑤ God's kingdom of priests\n"
  ,"16. ① God's food: hidden manna, Rv 2:17\n" +
  "      ② Devil's foood : maddening wine of adultery, Rv 17 and also Rv 18\n" +
  "\n"
  ,"17. ① Tree of life : Rv 22 \n" +
  "    ② Tree of good and evil : Rv 17-18\n"
  ,"18. ① Jesus and the four living creatures, angel, God"
  ,"19. ① Rv 13, Rv 12"
  ,"20. ① Rv 12, Rv 15",

]

let id : number = 0;


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

ModelAnswerKeywords = [
  "Revelation",
  "Rv",
  "1",
  "17",
  "10",
  "mystery",
  "seven stars",
  "lampstands",
  "prostitute",
  "beast",
  "seven heads",
  "ten horns",
  "seventh trumpet",
  "hide", "enemies"];


ModelAnswerKeywordsTwo = [
  "Rv",
  "12"
];

ModelAnswerKeywordsThree = [
  "Rv",
  "12",
  "After",
  "fighting",
  "overcoming",
  "group",
  "dragon"
];

ModelAnswerKeywordsFour = [
  "Rv",
  "7",
  "14"
];

ModelAnswerKeywordsFive = [
  "Mt",
  "13",
  "two",
  "types",
  "seed",
  "Rv",
  "14",
  "harvest",
  "7",
  "belonging",
  "12 tribes"
];

ModelAnswerKeywordsSix = [
  "Rv",
  "1:1-2",
  "2-3",
  "10",
  "12:11",
  "22:16"
];

ModelAnswerKeywordsSeven = [
  "overcoming",
  "salvation",
  "power",
  "kingdom","God"
];

ModelAnswerKeywordsEight = [
  "Rv","13", "congregation", "receive",
  "mark","beast",
  "12", "war",
  "opposes","God",
];

ModelAnswerKeywordsNine = [
  "7 (seven)","messengers"," work","preparing", "way", "lamps"
  ,"2-3", "Rv", "12", "twelve 12", "sealed", "7"
  ,"7:1-8", "great","multitude","white", "sins","washed",
  "Jesus", "blood", "7:14"
];

ModelAnswerKeywordsTen = [
  "creation", "Holy","city", "New Jerusalem"," 12", "tribes", "war",
  "flesh", "spirit"
];

ModelAnswerKeywordsEleven = [
  "first","heaven", "first", "earth", "Rv", "6", "world", "corrupted", "former",
  "New", "Rv", "7", "recreation",
  "subjects", "kingdom", "Not", "born", "God's", "sealed", "seed", "8:11-12", "6",
  "7", "Mt"
];

ModelAnswerKeywordsTwelve = [
  "Betrayer", "Rv", "13", "Destroyer", "17", "Saviour", "12"
];

ModelAnswerKeywordsThirteen = [
  "Rv", "5", "7"
];

ModelAnswerKeywordsFourteen = [
  "Rv", "6", "13", "18"
];

ModelAnswerKeywordsFifteen = [
  "fulfillment","Revelation", "God's", "seed", "harvest", "sealed", "12","tribes"
  , "sealed", "Rv", "14", "Rv", "7", "God's", "kingdom","priests"
];


ModelAnswerKeywordsSixteen = [
  "God", "food", "hidde", "manna", "Rv","2:17", "Devil's","food", "maddening","wine" +
  "of", "aldultery", "Rv","17", "Rv","18"
];

ModelAnswerKeywordsSeventeen = [
  "Tree", "life", "22", "Tree", "good","evil", "17-18", "Rv"
];

ModelAnswerKeywordsEighteen = [
  "Jesus", "Four", "living","creatures", "angel", "God"
];

ModelAnswerKeywordsNineteen = [
  "Rv","13", "12"
];

ModelAnswerKeywordsTwenty = [
  "Rv","12","15"
];



const FormatQuiz = (title: Array<string>) => {
    console.log("FormatQuiz ran");
    let result: string = '';

    title.forEach((value : string)=> {
      result += value;
      result += '\n';
      //console.log("adding " + value + " to result")
    });

    return result;
};

const TestMatching = () => {
  var n = StringUtils.countWords("word1 word2 word3");
  var number = StringUtils.countStringOccurences('The holy city where the tree of life is in', 'holy city')
  console.log(n);
  console.log(number);

  var string1 = "tees"
  var string2 = "tree"
  var l = StringUtils.compareByLevenshtein(string1, string2);
  var percent = StringUtils.compareSimilarityPercent(string1, string2);
  console.log(l);
  console.log(percent);
}

const printEachElement = () => {
  ModelAnswerKeywords.forEach((value) => {
    console.log(value)
  });
}



const splitAnswerIntoWordsArray = (): Array<string> =>
{
  let result : Array <string>;
  const answer =  RevelationTitles[21];
  result = answer.split(" ");

  return result;
}

const CompareEachAnswerWordWithModelAnswerKeyword = (modelAnswerKeywords : Array<string>,
                                                     answerWords : Array<string>) : boolean =>
{

  let matchingSequence : Array<string> = [];

  modelAnswerKeywords.forEach((keyword) => {
    answerWords.forEach((word)=> {
      // console.log("word: " + word);
      // console.log("keyword: " + keyword);
      var result = StringUtils.compareSimilarityPercent(word, keyword);
      // console.log("compare: "+ "word " + word + " keyword " + keyword + "-> result: " + result);
      if (result > 50) {
        matchingSequence.push(word);
      }
    })

  });

  // console.log("matchingSequence = " + matchingSequence);
  // console.log("length of matchingSequence = " + matchingSequence.length);
  // console.log("length of model answer keywords = " + modelAnswerKeywords.length);

  if ((matchingSequence.length/modelAnswerKeywords.length) >= 0.75) {
    console.log(CompareEachAnswerWordWithModelAnswerKeyword.name + ": determine that it is correct, returning true");
    return true;

  }
  else {
    console.log(CompareEachAnswerWordWithModelAnswerKeyword.name + ": determine that it is incorrect, returning false");
    return false;
  }

}

MockedQuestions.forEach(() => {
  Questions.push(new Question(id, MockedQuestions[id]));
  id++;
})

MockedModelAnswers.forEach(() => {
  let keywords = switchQuestions(id);
  ModelAnswers.push(new ModelAnswer(id, keywords,  MockedModelAnswers[id]))
  id++;
})

// TestMatching();
// printEachElement();
// splitAnswerIntoWordsArray();
// console.log(splitAnswerIntoWordsArray());
// CompareEachAnswerWordWithModelAnswerKeyword(ModelAnswerKeywords, splitAnswerIntoWordsArray());
// console.log(Questions.length);
// console.log(RevelationTitles.length);
// console.log(TimeOfFulfillment.length);
// console.log(EventLocations.length);
//console.log(Questions);


const GetModelKeywordsFromId = (id : number) : Array <string> =>  {
  return ModelAnswers[id].keywords;
}

const GetQuestionTextFromId = (id : number) : string => {
  return Questions[id].text;
}

export { RevelationTitles, MockedQuestions,
  ModelAnswers, TimeOfFulfillment,
  ModelAnswerKeywords,
  ModelAnswerKeywordsTwo,
  ModelAnswerKeywordsThree,
  ModelAnswerKeywordsFour,
  ModelAnswerKeywordsFive,
  ModelAnswerKeywordsSix,
  ModelAnswerKeywordsSeven,
  ModelAnswerKeywordsEight,
  ModelAnswerKeywordsNine,
  ModelAnswerKeywordsTen,
  ModelAnswerKeywordsEleven,
  ModelAnswerKeywordsTwelve,
  ModelAnswerKeywordsThirteen,
  ModelAnswerKeywordsFourteen,
  ModelAnswerKeywordsFifteen,
  ModelAnswerKeywordsSixteen,
  ModelAnswerKeywordsSeventeen,
  ModelAnswerKeywordsEighteen,
  ModelAnswerKeywordsNineteen,
  ModelAnswerKeywordsTwenty,
  FormatQuiz, MockedModelAnswers, switchQuestions, CompareEachAnswerWordWithModelAnswerKeyword,
  Questions, GetQuestionTextFromId,
  GetModelKeywordsFromId};
