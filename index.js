// Create grid reference object within grid object

let grid = {};

for (let i = 0; i < 10; i++) {
  grid[`row${i}`] = Array(10);
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    $(`[id=${i}]`)[0].cells[
      `${j}`
    ].innerHTML = `<div class="number"></div><div class="contents"></div>`;

    grid[`row${i}`][j] = {
      cell: $(`[id=${i}]`)[0].cells[`${j}`],
      contents: "",
      acrossNumber: "",
      downNumber: "",
      acrossMarked: false,
      downMarked: false,
      opposite: $(`[id=${9 - i}]`)[0].cells[`${9 - j}`],
    };
  }
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    grid[`row${i}`][j].above = i > 0 ? grid[`row${i - 1}`][j] : false;
    grid[`row${i}`][j].below = i < 9 ? grid[`row${i + 1}`][j] : false;
    grid[`row${i}`][j].last = j > 0 ? grid[`row${i}`][j - 1] : false;
    grid[`row${i}`][j].next = j < 9 ? grid[`row${i}`][j + 1] : false;
    grid[`row${i}`][j].opposite = grid[`row${9 - i}`][9 - j];
  }
}

// Randomly populate grid symmetrically with 50 black spaces

let difficultySetting = 0;
const difficulty = document.getElementById("difficulty");
if (localStorage.getItem("difficulty") === "1") {
  difficultySetting = 1;
  difficulty.children[1].selected = "selected";
}
let blackSqCount = 0;

while (blackSqCount < 80) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
      let random = Math.random();

      if (random < 0.7) {
        grid[`row${i}`][j].contents = "#";
        grid[`row${9 - i}`][9 - j].contents = "#";
        grid[`row${i}`][j].cell.style.backgroundColor = "black";
        grid[`row${9 - i}`][9 - j].cell.style.backgroundColor = "black";

        blackSqCount += 2;

        if (blackSqCount > 79) {
          break;
        }
      }
    }
  }
}

// Remove necessary black spaces to make sure there are no blocked off white squares

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 10; j++) {
    let blocked =
      (!grid[`row${i - 1}`] || grid[`row${i - 1}`][j].contents === "#") &&
      (!grid[`row${i + 1}`] || grid[`row${i + 1}`][j].contents === "#") &&
      (!grid[`row${i}`][j - 1] || grid[`row${i}`][j - 1].contents === "#") &&
      (!grid[`row${i}`][j + 1] || grid[`row${i}`][j + 1].contents === "#");

    if (blocked) {
      let surrounding = [];

      grid[`row${i - 1}`] &&
        surrounding.push([
          grid[`row${i - 1}`][j],
          grid[`row${9 - (i - 1)}`][9 - j],
        ]);
      grid[`row${i}`][j - 1] &&
        surrounding.push([
          grid[`row${i}`][j - 1],
          grid[`row${9 - i}`][9 - (j - 1)],
        ]);
      grid[`row${i}`][j + 1] &&
        surrounding.push([
          grid[`row${i}`][j + 1],
          grid[`row${9 - i}`][9 - (j + 1)],
        ]);
      grid[`row${i + 1}`] &&
        grid[`row${i + 1}`][j] &&
        surrounding.push([
          grid[`row${i + 1}`][j],
          grid[`row${9 - (i + 1)}`][9 - j],
        ]);

      let index = Math.floor(Math.random() * surrounding.length);
      surrounding[index][0].cell.style.backgroundColor = "";
      surrounding[index][0].contents = "";
      surrounding[index][1].cell.style.backgroundColor = "";
      surrounding[index][1].contents = "";
    }
  }
}

// change 2 letter words into 3 or more letters

for (let i = 0; i < 5; i++) {
  let count = 0;

  for (let j = 0; j < 10; j++) {
    const current = grid[`row${i}`][j];
    const opp = grid[`row${9 - i}`][9 - j];

    if (current.contents === "") {
      count++;
    }

    if (count === 2 && current.contents === "#") {
      current.contents = "";
      opp.contents = "";
      current.cell.style.backgroundColor = "";
      opp.cell.style.backgroundColor = "";
      count = 0;
    }

    if (current.contents === "#") {
      count = 0;
    }
  }
}

for (let i = 5; i >= 0; i--) {
  let count = 0;

  for (let j = 9; j >= 0; j--) {
    const current = grid[`row${i}`][j];
    const opp = grid[`row${9 - i}`][9 - j];

    if (current.contents === "") {
      count++;
    }

    if (count === 2 && current.contents === "#") {
      current.contents = "";
      opp.contents = "";
      current.cell.style.backgroundColor = "";
      opp.cell.style.backgroundColor = "";
      count = 0;
    }

    if (current.contents === "#") {
      count = 0;
    }
  }
}

for (let j = 0; j < 10; j++) {
  let count = 0;

  for (let i = 0; i < 5; i++) {
    const current = grid[`row${i}`][j];
    const opp = grid[`row${9 - i}`][9 - j];

    if (current.contents === "") {
      count++;
    }

    if (count === 2 && current.contents === "#") {
      current.contents = "";
      opp.contents = "";
      current.cell.style.backgroundColor = "";
      opp.cell.style.backgroundColor = "";
      count = 0;
    }

    if (current.contents === "#") {
      count = 0;
    }
  }
}

for (let j = 9; j >= 0; j--) {
  let count = 0;

  for (let i = 5; i >= 0; i--) {
    const current = grid[`row${i}`][j];
    const opp = grid[`row${9 - i}`][9 - j];

    if (current.contents === "") {
      count++;
    }

    if (count === 2 && current.contents === "#") {
      current.contents = "";
      opp.contents = "";
      current.cell.style.backgroundColor = "";
      opp.cell.style.backgroundColor = "";
      count = 0;
    }

    if (current.contents === "#") {
      count = 0;
    }
  }
}

// Reduce large blocks of white spaces

for (let i = 1; i < 5; i++) {
  for (let j = 1; j < 9; j++) {
    let nineSquare = [
      grid[`row${i - 1}`][j - 1],
      grid[`row${i - 1}`][j],
      grid[`row${i - 1}`][j + 1],
      grid[`row${i + 1}`][j - 1],
      grid[`row${i + 1}`][j],
      grid[`row${i + 1}`][j + 1],
      grid[`row${i}`][j - 1],
      grid[`row${i}`][j + 1],
      grid[`row${i}`][j],
    ];

    let count = 0;

    nineSquare.forEach((sq) => {
      sq.contents !== "#" && count++;
    });

    if (count > 7) {
      let current = grid[`row${i}`][j];
      let opp = grid[`row${9 - i}`][9 - j];
      current.contents = "#";
      current.cell.style.backgroundColor = "black";
      opp.contents = "#";
      opp.cell.style.backgroundColor = "black";
      console.log("9x9 triggered", "row: ", i, "col: ", j);
    }
    count = 0;
  }
  console.log("completed 9x9");
}

// re-run blacksquare clearance to prevent single white squares

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 10; j++) {
    let blocked =
      (!grid[`row${i - 1}`] || grid[`row${i - 1}`][j].contents === "#") &&
      (!grid[`row${i + 1}`] || grid[`row${i + 1}`][j].contents === "#") &&
      (!grid[`row${i}`][j - 1] || grid[`row${i}`][j - 1].contents === "#") &&
      (!grid[`row${i}`][j + 1] || grid[`row${i}`][j + 1].contents === "#");

    if (blocked) {
      let surrounding = [];

      grid[`row${i - 1}`] &&
        surrounding.push([
          grid[`row${i - 1}`][j],
          grid[`row${9 - (i - 1)}`][9 - j],
        ]);
      grid[`row${i}`][j - 1] &&
        surrounding.push([
          grid[`row${i}`][j - 1],
          grid[`row${9 - i}`][9 - (j - 1)],
        ]);
      grid[`row${i}`][j + 1] &&
        surrounding.push([
          grid[`row${i}`][j + 1],
          grid[`row${9 - i}`][9 - (j + 1)],
        ]);
      grid[`row${i + 1}`] &&
        grid[`row${i + 1}`][j] &&
        surrounding.push([
          grid[`row${i + 1}`][j],
          grid[`row${9 - (i + 1)}`][9 - j],
        ]);

      let index = Math.floor(Math.random() * surrounding.length);
      surrounding[index][0].cell.style.backgroundColor = "";
      surrounding[index][0].contents = "";
      surrounding[index][1].cell.style.backgroundColor = "";
      surrounding[index][1].contents = "";
    }
  }
}

// Check for disjointed across words

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 10; j++) {
    let current = grid[`row${i}`][j];
    if (current.contents !== "#") {
      let count = 1;
      let disconnected = 0;
      let running = true;
      let blackSquareArr = [];

      while (running && j < 10) {
        let cur = grid[`row${i}`][j + (count - 1)];
        let next = grid[`row${i}`][j + count];

        let above = cur.above;
        let below = cur.below;

        if (next !== undefined && next.contents !== "#") {
          count++;
        } else {
          running = false;
        }

        if ((!above || above.contents === "#") && below.contents === "#") {
          disconnected++;
          if (above) {
            blackSquareArr.push(above);
          }

          blackSquareArr.push(below);
        }
      }

      if (disconnected === count && count > 1) {
        let targetSquare =
          blackSquareArr[Math.floor(Math.random() * blackSquareArr.length)];
        targetSquare.contents = "";
        targetSquare.cell.style.backgroundColor = "";
        targetSquare.opposite.contents = "";
        targetSquare.opposite.cell.style.backgroundColor = "";
        console.log(
          "black square added to join disjointed across word",
          targetSquare
        );
      }
      j += count;
    } else {
      continue;
    }
  }
}

// Check for disjointed down words

for (let j = 0; j < 10; j++) {
  for (let i = 0; i < 5; i++) {
    let current = grid[`row${i}`][j];
    if (current.contents !== "#") {
      let count = 1;
      let disconnected = 0;
      let running = true;
      let blackSquareArr = [];

      while (running && i < 5) {
        let cur = grid[`row${i + (count - 1)}`][j];
        let below = cur.below;

        let last = cur.last;
        let next = cur.next;

        if (below && below.contents !== "#") {
          count++;
        } else {
          running = false;
        }

        if (
          (!last || last.contents === "#") &&
          (!next || next.contents === "#")
        ) {
          disconnected++;
          if (last) {
            blackSquareArr.push(last);
          }

          if (next) {
            blackSquareArr.push(next);
          }
        }
      }

      if (disconnected === count && count > 1) {
        let targetSquare =
          blackSquareArr[Math.floor(Math.random() * blackSquareArr.length)];
        targetSquare.contents = "";
        targetSquare.cell.style.backgroundColor = "";
        targetSquare.opposite.contents = "";
        targetSquare.opposite.cell.style.backgroundColor = "";
        console.log(
          "black square added to join disjointed down word",
          targetSquare
        );
      }
      i += count;
    } else {
      continue;
    }
  }
}

// build words object and number grid

let words = {
  across: {},
  down: {},
};

let numberCount = 1;

for (let i = 0; i < 10; i++) {
  let wordAdded = false;

  for (let j = 0; j < 10; j++) {
    let current = grid[`row${i}`][j];

    if (current.contents === "#") {
      current.acrossMarked = true;
      current.downMarked = true;
    }

    if (current.acrossMarked === true && current.downMarked === true) {
      continue;
    }

    //mark across words

    if (!current.acrossMarked) {
      if (grid[`row${i}`][j + 1]) {
        if (grid[`row${i}`][j + 1].contents !== "#") {
          current.cell.children[0].textContent = `${numberCount}`;
          current.acrossNumber = numberCount;

          for (let x = 1; ; x++) {
            let next = grid[`row${i}`][j + x];

            if (!next || next.contents === "#") {
              wordAdded = true;

              let word = {
                word: "",
                ref: [],
                clue: "",
              };

              for (let z = x - 1; z >= 0; z--) {
                word.ref.unshift(grid[`row${i}`][j + z]);
              }

              words.across[`${numberCount}across`] = word;

              break;
            } else {
              next.acrossMarked = true;
              next.acrossNumber = numberCount;
            }
          }
        }
      }
    }

    //mark down words

    if (!current.downMarked) {
      if (grid[`row${i + 1}`]) {
        if (grid[`row${i + 1}`][j].contents !== "#") {
          current.cell.children[0].textContent = `${numberCount}`;
          current.downNumber = numberCount;

          for (let x = 1; ; x++) {
            if (
              !grid[`row${i + x}`] ||
              grid[`row${i + x}`][j].contents === "#"
            ) {
              wordAdded = true;

              let word = {
                word: "",
                ref: [],
                clue: "",
              };

              for (let z = x - 1; z >= 0; z--) {
                word.ref.unshift(grid[`row${i + z}`][j]);
              }

              words.down[`${numberCount}down`] = word;

              break;
            } else {
              let next = grid[`row${i + x}`][j];

              next.downMarked = true;
              next.downNumber = numberCount;
            }
          }
        }
      }
    }

    if (wordAdded) {
      wordAdded = false;
      numberCount++;
    }
  }
}

// Create error handler for build failures

window.addEventListener("unhandledrejection", function (e) {
  window.location.reload();
});

// Call word finder API to discover words for answers

// fill across word spaces with words from API

let complete = false;
let allWords = [];
let order = 1;

let disallowed = [
  "bitch",
  "sex",
  "cum",
  "homo",
  "ass",
  "lie",
  "eff",
  "effed",
  "anus",
  "ed",
  "eds",
];

const createWordsAndClues = async () => {
  const getNewWord = async (p) => {
    let data;
    const response = await fetch(
      `https://api.datamuse.com/words?sp=${p}&md=df`
    );

    try {
      data = await response.json();
    } catch (err) {
      throw new Error("Could not retrieve word(s)");
    }
    return data;
  };

  let acrossWords = Object.keys(words.across);

  let common = [
    "t",
    "l",
    "d",
    "e",
    "i",
    "s",
    "r",
    "a",
    "o",
    "y",
    "p",
    "c",
    "n",
    "m",
  ];

  let bufferAmount = 3;

  for (let i = 0; i < acrossWords.length; i++) {
    let word = words.across[acrossWords[i]];
    let len = word.ref.length;
    let queryParams = "?".repeat(len);
    queryParams = queryParams.split("");

    let count = 0;

    for (let j = 0; j < len; j++) {
      if (word.ref[j].contents !== "") {
        count++;
        queryParams[j] = word.ref[j].contents.toLowerCase();
      }
    }

    if (count === 0) {
      queryParams[Math.floor(Math.random() * queryParams.length)] =
        common[Math.floor(Math.random() * common.length)];
    }

    queryParams = queryParams.join("");

    //Call API

    let shuffledWordList = [];
    let retrievedWordList = [];
    let retrievedWord;

    console.log("getting new words for across", word);

    retrievedWordList = await getNewWord(queryParams);

    if (retrievedWordList.length === 0) {
      throw new Error("No words found");
    }

    if (difficultySetting === 1) {
      shuffledWordList = retrievedWordList.sort((a, b) => {
        return Math.random() > 0.5 ? 1 : -1;
      });
    } else {
      shuffledWordList = retrievedWordList.sort((a, b) => {
        return b.score - a.score;
      });

      let first = shuffledWordList.splice(
        0,
        Math.min(shuffledWordList.length, bufferAmount)
      );

      randomFirst = first.sort((a, b) => {
        return Math.random() > 0.5 ? 1 : -1;
      });

      shuffledWordList = randomFirst.concat(shuffledWordList);
    }

    console.log(shuffledWordList);

    let index = 0;

    retrievedWord = shuffledWordList[index];

    // Check novel word and has definitions available, is correct length and doesn't include spaces

    while (
      !retrievedWord.defs ||
      allWords.includes(retrievedWord.word) ||
      retrievedWord.word.length !== word.ref.length ||
      retrievedWord.word.match(" ") ||
      retrievedWord.word.match(/[0-9]/) ||
      retrievedWord.word.match(/["!£$%&:-@/<>]/) ||
      disallowed.includes(retrievedWord.word)
    ) {
      index++;

      if (index >= shuffledWordList.length) {
        throw new Error("no words were suitable");
      }

      if (!shuffledWordList[index]) {
        queryParams = "?".repeat(len);
        queryParams = queryParams.split("");

        index = 0;

        let count = 0;

        for (let k = 0; k < len; k++) {
          if (word.ref[k].contents !== "") {
            count++;
            queryParams[k] = word.ref[k].contents;
          }
        }

        if (count === 0) {
          queryParams[Math.floor(Math.random() * queryParams.length)] =
            common[Math.floor(Math.random() * common.length)];
        }

        queryParams = queryParams.join("");

        console.log("getting new words - refetch across", word);

        retrievedWordList = await getNewWord(queryParams);

        if (retrievedWordList.length === 0) {
          throw new Error("No words found");
        }

        if (difficultySetting === 1) {
          shuffledWordList = retrievedWordList.sort((a, b) => {
            return Math.random() > 5 ? 1 : -1;
          });
        } else {
          shuffledWordList = retrievedWordList.sort((a, b) => {
            return b.score - a.score;
          });

          let first = shuffledWordList.splice(
            0,
            Math.min(shuffledWordList.length, bufferAmount)
          );

          randomFirst = first.sort((a, b) => {
            return Math.random() > 0.5 ? 1 : -1;
          });

          shuffledWordList = randomFirst.concat(shuffledWordList);
        }
      }

      retrievedWord = shuffledWordList[index];
    }

    // Set across word

    let clue = undefined;

    for (let a = 0; a < retrievedWord.defs.length; a++) {
      if (
        !retrievedWord.defs[a].split("\t")[1].includes(retrievedWord.word) &&
        !retrievedWord.defs[a]
          .split("\t")[1]
          .toLowerCase()
          .match(/sexual/)
      ) {
        clue = retrievedWord.defs[a].split("\t")[1];
        break;
      }
    }

    if (clue === undefined) {
      clue =
        retrievedWord.defs[
          Math.floor(Math.random() * retrievedWord.defs.length)
        ].split("\t")[1];

      let x = 0;

      while (clue.toLowerCase().match(/sexual/)) {
        x++;
        clue =
          retrievedWord.defs[
            Math.floor(Math.random() * retrievedWord.defs.length)
          ].split("\t")[1];

        if (x > 3) {
          throw new Error("no def suitable");
        }
      }
    }

    word.clue = clue;
    word.word = retrievedWord.word.split(" ").join("");
    allWords.push(retrievedWord.word.split(" ").join(""));
    console.log("Word ADDED ACROSS", word, "order: ", order);
    order++;

    let splitWord = word.word.split("");

    for (let l = 0; l < len; l++) {
      word.ref[l].contents = splitWord[l].toUpperCase();
    }

    //check for down word(s) needed in across word squares + add in down words using same method

    const findDownWords = async () => {
      for (let m = 0; m < word.ref.length; m++) {
        if (word.ref[m].downNumber !== "") {
          let downWord = words.down[`${word.ref[m].downNumber}down`];

          let count = 0;

          downWord.ref.forEach(async (square) => {
            square.contents === "" && count++;
          });

          if (count > 0) {
            console.log("DOWN WORD ANALYSIS RAN");
            let qParams = "?".repeat(downWord.ref.length);
            qParams = qParams.split("");

            downWord.ref.forEach((letter, index) => {
              if (letter.contents !== "") {
                qParams[index] = letter.contents.toLowerCase();
              }
            });

            qParams = qParams.join("");
            console.log(qParams);

            console.log("getting new words for down", downWord);
            let downWordList = await getNewWord(qParams);

            if (downWordList.length === 0) {
              throw new Error("No words found");
            }

            let shuffledDownWordList = [];

            if (difficultySetting === 1) {
              shuffledDownWordList = downWordList.sort((a, b) => {
                return Math.random() > 0.5 ? 1 : -1;
              });
            } else {
              shuffledDownWordList = downWordList.sort((a, b) => {
                return b.score - a.score;
              });

              let first = shuffledDownWordList.splice(
                0,
                Math.min(shuffledDownWordList.length, bufferAmount)
              );

              randomFirst = first.sort((a, b) => {
                return Math.random() > 0.5 ? 1 : -1;
              });

              shuffledDownWordList = randomFirst.concat(shuffledDownWordList);
            }

            console.log(shuffledDownWordList);

            index = 0;
            let randomDownWord = shuffledDownWordList[index];

            // Check novel word and has definitions available, is correct length and doesn't include spaces

            while (
              !randomDownWord.defs ||
              allWords.includes(randomDownWord.word) ||
              randomDownWord.word.length !== downWord.ref.length ||
              randomDownWord.word.match(" ") ||
              randomDownWord.word.match(/[0-9]/) ||
              randomDownWord.word.match(/["!£$%&:-@/<>]/) ||
              disallowed.includes(randomDownWord.word)
            ) {
              if (index > shuffledDownWordList.length) {
                throw new Error("no words were suitable");
              }

              index++;

              if (!shuffledDownWordList[index]) {
                qParams = "?".repeat(len);
                qParams = qParams.split("");

                let count = 0;

                for (let n = 0; n < len; n++) {
                  if (downWord.ref[n].contents !== "") {
                    count++;
                    qParams[n] = downWord.ref[n].contents;
                  }
                }

                qParams = qParams.join("");

                console.log("getting new words - refetch down", downWord.ref);

                downWordList = await getNewWord(qParams);

                if (downWordList.length === 0) {
                  throw new Error("No words found");
                }

                if (difficultySetting === 1) {
                  shuffledDownWordList = downWordList.sort((a, b) => {
                    return Math.random() > 0.5 ? 1 : -1;
                  });
                } else {
                  shuffledDownWordList = downWordList.sort((a, b) => {
                    return b.score - a.score;
                  });

                  let first = shuffledDownWordList.splice(
                    0,
                    Math.min(shuffledDownWordList.length, bufferAmount)
                  );

                  randomFirst = first.sort((a, b) => {
                    return Math.random() > 0.5 ? 1 : -1;
                  });

                  shuffledDownWordList =
                    randomFirst.concat(shuffledDownWordList);
                }

                index = 0;
              }

              randomDownWord = shuffledDownWordList[index];
            }

            // set down word

            let clue = undefined;

            for (let a = 0; a < randomDownWord.defs.length; a++) {
              if (
                !randomDownWord.defs[a]
                  .split("\t")[1]
                  .includes(randomDownWord.word) &&
                !randomDownWord.defs[a]
                  .split("\t")[1]
                  .toLowerCase()
                  .match(/sexual/)
              ) {
                clue = randomDownWord.defs[a].split("\t")[1];
                break;
              }
            }

            if (clue === undefined) {
              clue =
                randomDownWord.defs[
                  Math.floor(Math.random() * randomDownWord.defs.length)
                ].split("\t")[1];

              let x = 0;

              while (clue.toLowerCase().match(/sexual/)) {
                x++;
                clue =
                  randomDownWord.defs[
                    Math.floor(Math.random() * randomDownWord.defs.length)
                  ].split("\t")[1];

                if (x > 3) {
                  throw new Error("no def suitable");
                }
              }
            }

            downWord.clue = clue;

            downWord.word = randomDownWord.word.split(" ").join("");
            allWords.push(randomDownWord.word.split(" ").join(""));

            console.log("Word ADDED DOWN", downWord, "order: ", order);
            order++;

            let spltWord = downWord.word.split("");
            len = spltWord.length;

            for (let p = 0; p < len; p++) {
              downWord.ref[p].contents = spltWord[p].toUpperCase();
            }
          }
        }
      }
    };

    await findDownWords();
  }

  const fillRemainingDownWords = async () => {
    allDownWords = Object.keys(words.down);

    for (let i = 0; i < allDownWords.length; i++) {
      let current = words.down[allDownWords[i]];

      if (current.ref[0].contents === "") {
        let query = "?".repeat(current.ref.length);
        query = query.split("");
        query[Math.floor(Math.random() * query.length)] =
          common[Math.floor(Math.random() * common.length)];
        query = query.join("");

        console.log("final down words query: ", query);

        let newWordList = await getNewWord(query);

        if (newWordList.length === 0) {
          throw new Error("no words found");
        }

        let shuffledNewWordList = newWordList.sort((a, b) => {
          return Math.random() > 0.5 ? 1 : -1;
        });

        let index = 0;
        let finalNewWord = shuffledNewWordList[index];

        while (
          !finalNewWord.defs ||
          allWords.includes(finalNewWord.word) ||
          finalNewWord.word.length !== current.ref.length ||
          finalNewWord.word.match(" ") ||
          finalNewWord.word.match(/[0-9]/) ||
          finalNewWord.word.match(/["!£$%&:-@/<>]/) ||
          disallowed.includes(finalNewWord.word)
        ) {
          index++;
          if (index > shuffledWordList.length) {
            throw new Error("no words were suitable");
          }
          finalNewWord = shuffledNewWordList[index];
          console.log("stuck in while loop");
        }

        // set down word

        let clue = undefined;

        for (let a = 0; a < finalNewWord.defs.length; a++) {
          if (
            !finalNewWord.defs[a].split("\t")[1].includes(finalNewWord.word) &&
            !finalNewWord.defs[a]
              .split("\t")[1]
              .toLowerCase()
              .match(/sexual/)
          ) {
            clue = finalNewWord.defs[a].split("\t")[1];
            break;
          }
        }

        if (clue === undefined) {
          clue =
            finalNewWord.defs[
              Math.floor(Math.random() * finalNewWord.defs.length)
            ].split("\t")[1];

          let x = 0;

          while (clue.toLowerCase().match(/sexual/)) {
            x++;
            clue =
              finalNewWord.defs[
                Math.floor(Math.random() * finalNewWord.defs.length)
              ].split("\t")[1];

            if (x > 3) {
              throw new Error("no def suitable");
            }
          }
        }

        current.clue = clue;

        current.word = finalNewWord.word.split(" ").join("");
        allWords.push(finalNewWord.word.split(" ").join(""));

        console.log("Word ADDED DOWN", current, "order: ", order);
        order++;

        let splWord = current.word.split("");
        len = splWord.length;

        for (let q = 0; q < len; q++) {
          current.ref[q].contents = splWord[q].toUpperCase();
        }
      }
    }
  };

  await fillRemainingDownWords();
  complete = true;
  console.log("build completed");

  populateCluesList();

  const overlay = document.querySelector(".modal");
  overlay.style.display = "none";
};

const populateCluesList = () => {
  let acrossCard = document.querySelector(".across-card");
  let downCard = document.querySelector(".down-card");

  let across = Object.keys(words.across);
  let down = Object.keys(words.down);

  let h = document.createElement("h3");
  h.textContent = "Across";
  acrossCard.append(h);

  let lineBreak = document.createElement("div");
  lineBreak.className = "line-break";
  acrossCard.append(lineBreak);

  across.forEach((val) => {
    let current = words.across[val];
    let p = document.createElement("p");
    p.innerHTML = `<strong>${val.replace("across", "")}</strong> ${
      current.clue
    } (${current.ref.length})`;
    acrossCard.append(p);
  });

  let h3 = document.createElement("h3");
  h3.textContent = "Down";
  downCard.append(h3);

  let lineBreakB = document.createElement("div");
  lineBreakB.className = "line-break";
  downCard.append(lineBreakB);

  down.forEach((val) => {
    let current = words.down[val];
    let p = document.createElement("p");
    p.innerHTML = `<strong>${val.replace("down", "")}</strong> ${
      current.clue
    } (${current.ref.length})`;
    downCard.append(p);
  });
};

createWordsAndClues();

const difficultySelect = (value) => {
  localStorage.setItem("difficulty", value);
  difficultySetting = parseInt(value);
};

difficulty.addEventListener("change", (e) => {
  difficultySelect(e.target.value);
  window.location.reload();
});

const reveal = document.querySelector(".reveal");

const revealGrid = () => {
  console.log("reveal clicked");

  const allAcross = Object.keys(words.across);

  clearHighlight();

  let letterCount = 0;
  let entered = 0;
  let correct = 0;

  allSquares.forEach((cell) => {
    let row = cell.parentElement.id;
    let index = cell.cellIndex;
    let current = grid[`row${row}`][index];

    if (current.contents !== "#") {
      letterCount++;

      if (current.cell.children[1].textContent !== "") {
        entered++;
      }

      if (current.cell.children[1].textContent === current.contents) {
        correct++;
      }
    }
  });

  if (entered > 0 && correct !== letterCount) {
    allSquares.forEach((cell) => {
      let row = cell.parentElement.id;
      let index = cell.cellIndex;
      let current = grid[`row${row}`][index];

      if (
        current.contents !== "#" &&
        current.cell.children[1].textContent !== current.contents
      ) {
        current.cell.style.border = "2px solid red";
      }
    });
  }

  if (correct === letterCount) {
    let table = document.querySelector("table");
    table.style.border = "5px solid green";
    let message = document.querySelector(".message");
    message.style.display = "block";
  }

  allAcross.forEach((word) => {
    words.across[`${word}`].ref.forEach((cell, index) => {
      cell.cell.children[1].textContent =
        words.across[`${word}`].word[index].toUpperCase();
    });
  });

  const allDown = Object.keys(words.down);

  allDown.forEach((word) => {
    words.down[`${word}`].ref.forEach((cell, index) => {
      cell.cell.children[1].textContent =
        words.down[`${word}`].word[index].toUpperCase();
    });
  });

  reveal.removeEventListener("click", revealGrid);
};

reveal.addEventListener("click", revealGrid);

const newGrid = document.querySelector(".new");

newGrid.addEventListener("click", () => {
  window.location.reload();
});

let allSquares = Array.from(document.querySelectorAll("td"));

const clearHighlight = () => {
  allSquares.forEach((cell) => {
    cell.style.border = "1px solid black";
    if (cell.children[2]) {
      let target = cell.children[2];
      cell.children[1].textContent = target.value.toUpperCase();
      cell.removeChild(target);
    }
  });
};

allSquares.forEach((el) => {
  el.addEventListener("click", (e) => {
    let row = e.target.parentElement.id;
    let index = e.target.cellIndex;
    if (grid[`row${row}`][index].contents === "#") {
      clearHighlight();
      return;
    }
    highlightCells(e.target.parentElement.id, e.target.cellIndex);
  });
});

const highlightCells = (i, j) => {
  let current = grid[`row${i}`][j];
  let direction = "";
  let wordNumber = "";

  if (current.acrossNumber !== "") {
    direction = "across";
    wordNumber = current.acrossNumber;
  } else {
    direction = "down";
    wordNumber = current.downNumber;
  }

  let wordToHighlight = words[`${direction}`][`${wordNumber}${direction}`];

  if (
    wordToHighlight.ref[0].cell.style.border === "2px solid blue" &&
    wordToHighlight.ref[1].cell.style.border === "2px solid blue" &&
    current.acrossNumber !== "" &&
    current.downNumber !== ""
  ) {
    direction = "down";
    wordNumber = current.downNumber;
    wordToHighlight = words[`${direction}`][`${wordNumber}${direction}`];
  }

  clearHighlight();

  wordToHighlight.ref.forEach((cell, index) => {
    cell.cell.style.border = "2px solid blue";
    let target = cell.cell.children[1];
    let value = target.textContent;
    cell.cell.innerHTML += `<input class="input" type="text" maxlength="1" value="${value}" />`;
    cell.cell.children[1].textContent = "";
  });

  let inputs = Array.from(document.querySelectorAll(".input"));

  inputs.forEach((el, index) => {
    el.addEventListener("input", (e) => {
      if (e.inputType.includes("delete")) {
        return;
      }
      if (wordToHighlight.ref[index + 1]) {
        wordToHighlight.ref[index + 1].cell.children[2].select();
      }
    });
  });

  wordToHighlight.ref[0].cell.children[2].select();
};
