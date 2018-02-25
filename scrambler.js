"use strict";

class Scrambler {

  constructor() { }

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
          var alreadyAdded = Array();

          $.each(letters, function(k, v){
            var isVowel = $.inArray(v, vowels);

            if(isVowel < 0) {
              lettersToChange.push(k);
            }
          });

          lettersToChange = shuffleArray(lettersToChange);

          $.each(letters, function(k, v){
            var isVowel = $.inArray(v, vowels);

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
* Generates a random number
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