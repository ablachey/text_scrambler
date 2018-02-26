"use strict";

class Scrambler {

  constructor() {
    this.leet = [
      {k: 'A', u: '4', l: '@'},
      {k: 'B', u: '8', l: '6'},
      {k: 'C', u: '(', l: '<'},
      {k: 'D', u: 'l)', l: 'ol'},
      {k: 'E', u: '3', l: '3'},
      {k: 'F', u: 'l"', l: 'l"'},
      {k: 'G', u: '(,', l: '(,'},
      {k: 'H', u: '4', l: '4'},
      {k: 'I', u: '1', l: '1'},
      {k: 'J', u: '_)', l: '_)'},
      {k: 'K', u: '|<', l: '|<'},
      {k: 'L', u: '[', l: '['},
      {k: 'M', u: '/\\/\\', l: '^^'},
      {k: 'N', u: '/\\/', l: '/\\/'},
      {k: 'O', u: '0', l: '0'},
      {k: 'P', u: '|o', l: '/o'},
      {k: 'Q', u: '(,)', l: '9'},
      {k: 'R', u: '|2', l: 'r'},
      {k: 'S', u: '$', l: '$'},
      {k: 'T', u: '7', l: '7'},
      {k: 'U', u: '|_|', l: '|_|'},
      {k: 'V', u: '\\/', l: '\\/'},
      {k: 'W', u: '\\/\\/', l: '\\/\\/'},
      {k: 'X', u: '}{', l: '><'},
      {k: 'Y', u: '¥', l: '¥'},
      {k: 'Z', u: 'Z', l: 'z'},
    ];
  }

  /**
  * Scramble all words in a string, re-arrange the letters
  * in between first and last letter
  * 
  * @param string text
  * 
  * @return string result
  * 
  */
  innerScramble(text) {
    var result = '';
    var words = text.split(' ');

    if(text.length > 0) {
      $.each(words, function(k, v){
        var newWord = '';
        if(v.length > 2) {
          var added = Array();
          var letters = v.split('');
          newWord = newWord + letters[0];
          
          while(letters.length - 1 != newWord.length) {
            var key = randNum(1, letters.length - 2);
            var exist = $.inArray(key, added);

            if(exist < 0) {
              newWord = newWord + letters[key];
              added.push(key);
            }
          }
          
          newWord = newWord + letters[letters.length - 1];
        }
        else {
          newWord = v;
        }
        
        result = result + ' ' + newWord;
      });

      result = result.trim();
    }

    return result;
  }

  /**
  * Maintains vowels
  * 
  * @param string text
  * 
  * @return string result
  */
  maintainVowels(text) {
    var result = '';
    var words = text.split(' ');
    var vowels = ['a', 'e', 'i', 'o', 'u'];

    if(text.length > 0) {
      $.each(words, function(k, v){
        var newWord = '';

        if(v.length > 2) {  
          var letters = v.split('');
          var lettersToChange = Array();

          $.each(letters, function(k, v){
            var isVowel = $.inArray(v.toLowerCase(), vowels);

            if(isVowel < 0) {
              lettersToChange.push(k);
            }
          });

          lettersToChange = shuffleArray(lettersToChange);

          $.each(letters, function(k, v){
            var isVowel = $.inArray(v.toLowerCase(), vowels);

            if(isVowel < 0) {
              if(lettersToChange.length > 0) {
                newWord = newWord + letters[lettersToChange[0]];
                lettersToChange.splice(0, 1);
              }
            }
            else {
              newWord = newWord + v;
            }
          });  
        }
        else {
          newWord = v;
        }
        
        result = result + ' ' + newWord;
      });

      result = result.trim();
    }

    return result;
  }

  /**
  * Leet letter conversion
  * 
  * @param string text
  * 
  * @return string result
  * 
  */
  leetConversion(text) {
    var result = '';
    var words = text.split(' ');
    var leet = this.leet;

    $.each(words, function(k, word) {
      var newWord = '';
      var letters = word.split('');
      
      $.each(letters, function(k, v) {
        var l = letterToLeet(leet, v);

        if(l != null) {
          newWord = newWord + l;
        }
        else {
          newWord = newWord + v;
        }
      });
      result = result + ' ' + newWord;
    });

    result = result.trim();

    return result;
  }
}

/**
* Generates a random number
* 
* @param number min max
* 
* @return number
* 
*/
function randNum(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

/**
* Shuffles array
* 
* @param array a
* 
* @return array a
* 
*/
function shuffleArray(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }

  return a;
}

/**
* Get the leet value
* 
* @param array leet
* 
* @return letter r
* 
*/
function letterToLeet(leet, letter) {
  var r = null;
  $.each(leet, function(key, value){
    if(value.k === letter.toUpperCase()) {
      if(letter === letter.toUpperCase()) {
        r = value.u;
      }
      else {
        r = value.l;
      }
    }
  });

  return r;
}