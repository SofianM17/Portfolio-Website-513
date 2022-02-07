// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB

// getStats function completed by Sofian Mustafa


function getStats(txt) {
    // nChars

    let nChars = txt.length;

    /////////////////////////////////////////////////////////////////////////////// nWords

    // array of matches of words without numbers
    let wordListAlpha_PreProcessed = txt.match(/[a-z]+[^\s\d]*/gi) || [];
    let wordListAlpha = []
    // remove special characters from alphabetical words
    for(word of wordListAlpha_PreProcessed){
        let cleanedWord = word.replace(/[^\w]/gi, '')
        wordListAlpha.push(cleanedWord.toLowerCase());
    }
    
    // array of matches of words with only numbers
    let wordListNum = txt.match(/[\d]+/gi) || [];
    
    // 0 words initially
    let nWords = 0;
    // if the array of matches of alphabetic words is not empty
    if(wordListAlpha.length>0){
        // add the number of alphabetical words matched to the total word count
        nWords+=wordListAlpha.length;
    }
    // if the array matches of numeric words is not not empty
    if(wordListNum.length>0){
        //  add the number of numerical words matched to the total word count
        nWords+=wordListNum.length;
    }

    //console.log(wordListAlpha);
    //console.log(wordListNum);

    //////////////////////////////////////////////////////////////////////////////// nLines
    // 0 lines initially
    let nLines = 0;
    //  array of lines in txt
    let nLineList = (txt.split('\n'));
    // if the array of lines is not empty and there are some words in the field
    if(nLineList.length > 0 && (wordListAlpha_PreProcessed.length>0 || wordListNum.length>0)){
        // update nLines to the number of lines in txt
        nLines=nLineList.length;
    }
   
    //console.log(nLineList);

    /////////////////////////////////////////////////////////////////////////////// nNonEmptyLines
    // initialize nNonEmptyLines
    let nNonEmptyLines = 0;
    // For every line in the list of lines
    for(let line of nLineList){
        //  if the length of the line is greater than 0
        if (line.length>0){
            // increment the number of non empty lines
            nNonEmptyLines++;
        }
    }

    /////////////////////////////////////////////////////////////////////////////// maxLineLength
    let maxLineLength = 0;
    // Loop over the list of lines
    for(let line of nLineList){
        // Update maxLineLength if a line with a larger length is found
        if(line.length > maxLineLength){
            maxLineLength = line.length;
        }
    }

    ////////////////////////////////////////////////////////////////////////////// averageWordLength 
    // initialize averageWordLength to 0
    let averageWordLength = 0;
    let wordList = wordListAlpha.concat(wordListNum);

    //console.log(wordList, wordList.length);
    // If wordListAlpha and wordListNum were not both empty such that wordList is not empty
    if(wordList.length>0){
        // Sum the length of every word in txt
        for(let word of wordList){
            averageWordLength+= word.length;
        }
        // divide the sum of all word lengths by the number of words in txt
        averageWordLength /= wordList.length;

        // Round averageWordLength to 2 decimal places
        averageWordLength = Math.round(averageWordLength*100)/100
    }

    //////////////////////////////////////////////////////////////////////////// tenLongestWords
    let tenLongestWords= []
    // remove duplicates
    noDupWords = [...new Set(wordList)];
    // sort wordList in descending order of word length or alphabetically secondarily
    noDupWords.sort((w1,w2)=>w2.length-w1.length || w1.localeCompare(w2));
    
    // get first 10 words of the sorted wordList
    tenLongestWords = noDupWords.slice(0, 10);

    //////////////////////////////////////////////////////////////////////////// tenMostFrequentWords
    let tenMostFrequentWords = [];
    let countObj = {};

    // create an object with key = word and value = the number of times the word appears in txt
    for(let word of wordList){
        countObj[word] = 0;
        for(let word1 of wordList){
            if (word1 == word){
                countObj[word]+=1;
            }
        }
    }

    // convert countObj to a 2D array
    countObj = Object.entries(countObj);
    // sort countObj based on count and alphabetically secondly, if needed.
    countObj.sort((w1,w2)=>w2[1]-w1[1] || w1[0].localeCompare(w2[0]));

    // Populate tenMostFrequentWords with the first 10 words in countObj and their respective counts
    for(wItem of countObj.slice(0, 10)){
        tenMostFrequentWords.push(wItem[0].toString() + '(' + wItem[1].toString() + ')');
    }

    

    return {
        nChars,                                                    
        nWords,
        nLines,
        nNonEmptyLines,
        averageWordLength,
        maxLineLength,
        tenLongestWords,
        tenMostFrequentWords
    };

}
