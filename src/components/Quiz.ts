let RevelationTitles: Array<string>;
let Questions : Array<string>;
let Answers : Array<string>;
let TimeOfFulfillment : Array<string>;
let ModelAnswerKeywords : Array<string>;

const {StringUtils} = require('turbocommons-ts');

Questions = [
  '1. ① Write down the chapters in which 3 mysteries are written in Revelation',
  '1. ② write the reason why they have been recorded in parables.',

]

Answers =  [
  "Rv 1 the mystery of the seven stars (also correct if written 'the mystery of the seven stars and the seven golden lampstands')"
  + "\nRv 17 the mystery of the prostitute and the beast with seven heads and ten horns (must include 'prostitute')"
  + "\nRv 10 the mystery of the seventh trumpet",
  "To hide it from the enemies (also correct if 'to hide it from the outsiders')"
]

TimeOfFulfillment = [
  "At the time of the second coming",
  "When the seven messengers of the seven golden lampstands tabernacle become one with Nicolaitans who invaded",
  "When the seven messengers of the seven golden lampstands tabernacle become one with Nicolaitans who invaded",
  "After apostle John (new John) sends the letters to the seven messengers of the seven golden lampstands tabernacle (after the event of Rev 2 ~3)",
  "After sending the advocate letters to the seven messengers of the seven golden lampstands tabernacle (after the event of Rev 2 ~3)",
  "After the Lamb took the scroll sealed with seven seals",
  "After the judgement of the tabernacle temple who betrayed (After Rev 6)",
  "After the 6th seal is broken (after Rev 6)",
  "After fourth angel sounded his trumpet",
  "After sixth angel sounded his trumpet (After Rev 9)",
  "After John (new john) eats God’s open scroll",
  "42 months period, when the red dragon reigned the tabernacle of the heaven and" +
  " after male child gains victory over the dragon",
  "When Dragon’s seven head and ten horns beast devoured the tabernacle of heaven",
  "After the event of Rev 13",
  "at the time of the harvest",
  "After the victory against the beast in Rev 13",
  "After establishment of the temple of the tabernacle of the testimony",
  "After pouring out the wrath of the seven golden bowls",
  "After the judgement of the great prostitute in Rev 17",
  "After betrayer oxen and the destroyer beasts are seized",
  "After inviting the spiritual and physical guests to the wedding banquet",
  "After the first heaven and the first earth passed away",
]

RevelationTitles = [
    'The summary and conclusion of the entire book of Revelation',
    'The beginning of the events of Revelation and the mystery of the seven stars and seven golden lampstands',
    'The letters to the messengers of the seven churches',
    'The throne and order of the spiritual realm',
    'The book sealed with seven seals',
    'The judgment of the first heaven, sun, moon, and stars who betrayed',
    'The newly created Spiritual Israel 12 tribes',
    'The last seal and the seven trumpets',
    'The locusts from the abyss and the angels who sinned',
    'The revealed book from heaven and the promised pastor',
    'The two witnesses and the seventh trumpet',
    'The war between Dragon and God',
    'The chosen people who received the mark of the beast and betrayed',
    'The 144,000 first fruits sealed and standing on Mount Zion',
    'The Temple of the Tabernacle of the Testimony - place all nation must come to worship',
    'The seven bowls of wrath',
    'The prostitute and the wine of adultery ( Tree of knowledge of good and evil)',
    'The marriage with Satan who detroyed all nations',
    'The wedding banquet of the Lamb between the spirits and the flesh',
    'The souls of the martyrs and the first resurrection',
    'The promised new heaven and new earth, Shincheonji',
    'The hold city where the tree of life is ',
];

ModelAnswerKeywords = [
  "holy",
  "city",
  "tree",
  "life"
]

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

const compareEachAnswerWordWithModelAnswerKeyword = (modelAnswerKeywords : Array<string>,
                                                     answerWords : Array<string>) : boolean =>
{

  let matchingSequence : Array<string> = [];

  modelAnswerKeywords.forEach((keyword) => {
    answerWords.forEach((word)=> {
      // console.log("word: " + word);
      // console.log("keyword: " + keyword);
      var result = StringUtils.compareSimilarityPercent(word, keyword);
      // console.log("compare: " + result);
      if (result > 50) {
        matchingSequence.push(word);
      }
    })

  });

  console.log("matchingSequence = " + matchingSequence);

  if (matchingSequence.length == ModelAnswerKeywords.length) {
    console.log(compareEachAnswerWordWithModelAnswerKeyword.name + ": determine that it is correct, returning true");
    return true;

  }
  else {
    console.log(compareEachAnswerWordWithModelAnswerKeyword.name + ": determine that it is incorrect, returning false");
    return false;
  }
}
// TestMatching();
// printEachElement();
// splitAnswerIntoWordsArray();
// console.log(splitAnswerIntoWordsArray());
compareEachAnswerWordWithModelAnswerKeyword(ModelAnswerKeywords, splitAnswerIntoWordsArray());
// console.log(Questions.length);
// console.log(RevelationTitles.length);
// console.log(TimeOfFulfillment.length);
// console.log(EventLocations.length);

export { RevelationTitles, Questions, Answers, TimeOfFulfillment, FormatQuiz };
