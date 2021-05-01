"use strict";
exports.__esModule = true;
exports.FormatQuiz = exports.TimeOfFulfillment = exports.EventLocations = exports.Questions = exports.RevelationTitles = void 0;
var RevelationTitles;
exports.RevelationTitles = RevelationTitles;
var Questions;
exports.Questions = Questions;
var EventLocations;
exports.EventLocations = EventLocations;
var TimeOfFulfillment;
exports.TimeOfFulfillment = TimeOfFulfillment;
var ModelAnswerKeywords;
var StringUtils = require('turbocommons-ts').StringUtils;
exports.Questions = Questions = [
    'Revelation 1:1-8',
    'Revelation 1:9-20',
    'Revelation 2 & 3',
    'Revelation 4',
    'Revelation 5',
    'Revelation 6',
    'Revelation 7',
    'Revelation 8',
    'Revelation 9',
    'Revelation 10',
    'Revelation 11',
    'Revelation 12',
    'Revelation 13',
    'Revelation 14',
    'Revelation 15',
    'Revelation 16',
    'Revelation 17',
    'Revelation 18',
    'Revelation 19',
    'Revelation 20',
    'Revelation 21',
    'Revelation 22'
];
exports.EventLocations = EventLocations = [
    "God’s seven stars and the seven golden lampstand of tabernacle temple(the tabernacle temple that prepares the way of the Lord)",
    "God’s seven stars and the seven golden lampstands tabernacle",
    "God’s seven stars and the seven golden lampstands tabernacle",
    "Before the throne of God in spiritual realm",
    "Before the throne of God in spiritual realm",
    "God’s Tabernacle temple (the seven golden lampstands tabernacle)",
    "Mt Zion the temple of the tabernacle of the testimony",
    "Among caves and rocks of mountains where the chosen people of the tabernacle temple hid",
    "The tabernacle temple which belongs to Gentile and the Euphrates",
    "The land and the sea",
    "Measured God’s temple and the altar",
    "The tabernacle temple which belongs to  Gentile (tabernacle of heaven)",
    "Tabernacle temple that betrayed (tabernacle of heaven)",
    "Before the throne in Mt Zion",
    "The temple of the tabernacle of the testimony",
    "before the throne of God besides the sea of glass",
    "Tabernacle temple that betrayed (first tabernacle) and the Beast’s nation.",
    "The desert Babylon that captures the chosen people",
    "Denominations which belong to Babylon, the demon’s nation",
    "The wedding banquet of the Lamb (the temple of the tabernacle of the testimony)",
    "The wedding banquet of the Lamb (the temple of the tabernacle of the testimony)",
    "New heaven and new earth (TTT), the Holy City",
    "the new Jerusalem in spiritual realm"
];
exports.TimeOfFulfillment = TimeOfFulfillment = [
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
];
exports.RevelationTitles = RevelationTitles = [
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
];
var FormatQuiz = function (title) {
    console.log("FormatQuiz ran");
    var result = '';
    title.forEach(function (value) {
        result += value;
        result += '\n';
        //console.log("adding " + value + " to result")
    });
    return result;
};
exports.FormatQuiz = FormatQuiz;
var TestMatching = function () {
    var n = StringUtils.countWords("word1 word2 word3");
    var number = StringUtils.countStringOccurences('The holy city where the tree of life is in', 'holy city');
    console.log(n);
    console.log(number);
    var string1 = "tees";
    var string2 = "tree";
    var l = StringUtils.compareByLevenshtein(string1, string2);
    var percent = StringUtils.compareSimilarityPercent(string1, string2);
    console.log(l);
    console.log(percent);
};
var printEachElement = function () {
    ModelAnswerKeywords.forEach(function (value) {
        console.log(value);
    });
};
var splitAnswerIntoWordsArray = function () {
    var result;
    var answer = RevelationTitles[21];
    result = answer.split(" ");
    return result;
};
var compareEachAnswerWordWithModelAnswerKeyword = function (modelAnswerKeywords, answerWords) {
    var matchingSequence = [];
    modelAnswerKeywords.forEach(function (keyword) {
        answerWords.forEach(function (word) {
            // console.log("word: " + word);
            // console.log("keyword: " + keyword);
            var result = StringUtils.compareSimilarityPercent(word, keyword);
            // console.log("compare: " + result);
            if (result > 50) {
                matchingSequence.push(word);
            }
        });
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
};
// TestMatching();
// printEachElement();
// splitAnswerIntoWordsArray();
// console.log(splitAnswerIntoWordsArray());
compareEachAnswerWordWithModelAnswerKeyword(ModelAnswerKeywords, splitAnswerIntoWordsArray());
