import React, { useState } from 'react';

const KmpSearch = () => {
  const [text, setText] = useState('');
  const [pattern, setPattern] = useState('');
  const [result, setResult] = useState('');

  const kmpPatternProcessing = (pattern) => {
    let m = pattern.length;
    let kmpTable = new Array(m).fill(0);
    let prefixEnd = 0;
    let suffixEnd = 1;

    while (suffixEnd < m) {
      if (pattern[prefixEnd] === pattern[suffixEnd]) {
        prefixEnd++;
        kmpTable[suffixEnd] = prefixEnd;
        suffixEnd++;
      } else if (prefixEnd !== 0) {
        prefixEnd = kmpTable[prefixEnd - 1];
      } else {
        kmpTable[suffixEnd] = 0;
        suffixEnd++;
      }
    }

    return kmpTable;
  };

  const kmpSearch = () => {
    let n = text.length;
    let m = pattern.length;
    let kmpTable = kmpPatternProcessing(pattern);
    let textPos = 0;
    let patternPos = 0;
    let foundIndexes = [];

    while (textPos < n) {
      if (pattern[patternPos] === text[textPos]) {
        patternPos++;
        textPos++;
      }

      if (patternPos === m) {
        foundIndexes.push(textPos - patternPos);
        patternPos = kmpTable[patternPos - 1];
      } else if (textPos < n && pattern[patternPos] !== text[textPos]) {
        if (patternPos !== 0) {
          patternPos = kmpTable[patternPos - 1];
        } else {
          textPos++;
        }
      }
    }

    if (foundIndexes.length === 0) {
      setResult('Pattern not found');
    } else {
      setResult('Pattern found at index(es): ' + foundIndexes.join(', '));
    }
  };

  return (
    <div>
      <h2>KMP Search Algorithm</h2>
      <div>
        <label>Text: </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label>Pattern: </label>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        />
      </div>
      <div>
        <button onClick={kmpSearch}>Search</button>
      </div>
      {result && <div><strong>{result}</strong></div>}
    </div>
  );
};

export default KmpSearch;
