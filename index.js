// Create grid reference object within grid object

let grid = {};

for (let i = 0; i < 10; i++) {
  grid[`row${i}`] = Array(10);
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    $(`[id=${i}]`)[0].cells[
      `${j}`
    ].innerHTML = `<span class="number"></span><span class="contents"></span>`;

    grid[`row${i}`][j] = {
      cell: $(`[id=${i}]`)[0].cells[`${j}`],
      contents: "",
      acrossNumber: "",
      downNumber: "",
      acrossMarked: false,
      downMarked: false,
    };
  }
}

// Randomly populate grid symmetrically with 50 black spaces

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

// Call word finder API to discover words for answers

// fill across word spaces with words from API

let complete = false;
let allWords = [];
let order = 1;

const createWordsAndClues = async () => {
  const getNewWord = async (p) => {
    let data;
    const response = await fetch(
      `https://api.datamuse.com/words?sp=${p}&md=df`
    );
    try {
      data = await response.json();
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  let acrossWords = Object.keys(words.across);

  let common = ["t", "d", "e", "i", "s", "r", "a", "o"];

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
    console.log(queryParams);

    //Call API

    let shuffledWordList = [];
    let retrievedWordList = [];
    let retrievedWord;

    console.log("getting new words for across", word);

    retrievedWordList = await getNewWord(queryParams);

    shuffledWordList = retrievedWordList.sort((a, b) => {
      Math.random() > 0.5 ? 1 : -1;
    });

    console.log(shuffledWordList);

    let index = 0;

    retrievedWord = shuffledWordList[index];

    // Check novel word and has definitions available, is correct length and doesn't include spaces

    while (
      !retrievedWord.defs ||
      allWords.includes(
        retrievedWord.word ||
          retrievedWord.word.length !== word.ref.length ||
          retrievedWord.word.includes(" ") ||
          retrievedWord.word.includes("-")
      )
    ) {
      index++;

      if (!shuffledWordList[index]) {
        queryParams = "?".repeat(len);
        queryParams = queryParams.split("");

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

        shuffledWordList = retrievedWordList.sort((a, b) => {
          b.tags.f - a.tags.f;
        });

        index = 0;
      }

      retrievedWord = shuffledWordList[index];
    }

    // Set across word

    word.clue =
      retrievedWord.defs[
        Math.floor(Math.random() * retrievedWord.defs.length)
      ].split("\t")[1];
    word.word = retrievedWord.word;
    allWords.push(retrievedWord.word);
    console.log("Word ADDED ACROSS", word, "order: ", order);
    order++;

    let splitWord = retrievedWord.word.split("");

    for (let l = 0; l < len; l++) {
      word.ref[l].contents = splitWord[l].toUpperCase();
      word.ref[l].cell.children[1].textContent = `${splitWord[
        l
      ].toUpperCase()}`;
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
            let shuffledDownWordList = downWordList.sort((a, b) => {
              parseInt(b.tags[0].replace("f:", "")) -
                parseInt(a.tags[0].replace("f:", ""));
            });

            console.log(shuffledDownWordList);

            index = 0;
            let randomDownWord = shuffledDownWordList[index];

            // Check novel word and has definitions available, is correct length and doesn't include spaces

            while (
              !randomDownWord.defs ||
              allWords.includes(randomDownWord.word) ||
              randomDownWord.word.length !== downWord.ref.length ||
              randomDownWord.word.includes(" ") ||
              randomDownWord.word.includes("-")
            ) {
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

                shuffledDownWordList = downWordList.sort((a, b) => {
                  Math.random() > 0.5 ? 1 : -1;
                });

                index = 0;
              }

              randomDownWord = shuffledDownWordList[index];
            }

            // set down word

            downWord.clue =
              randomDownWord.defs[
                Math.floor(Math.random() * randomDownWord.defs.length)
              ].split("\t")[1];

            downWord.word = randomDownWord.word;
            allWords.push(randomDownWord.word);

            console.log("Word ADDED DOWN", downWord, "order: ", order);
            order++;

            let spltWord = randomDownWord.word.split("");
            len = spltWord.length;

            for (let p = 0; p < len; p++) {
              downWord.ref[p].contents = spltWord[p].toUpperCase();
              downWord.ref[p].cell.children[1].textContent = `${spltWord[
                p
              ].toUpperCase()}`;
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

        let shuffledNewWordList = newWordList.sort((a, b) => {
          return b.score - a.score;
        });

        let index = 0;
        let finalNewWord = shuffledNewWordList[index];

        while (
          !finalNewWord.defs ||
          allWords.includes(finalNewWord.word) ||
          finalNewWord.word.length !== current.ref.length ||
          finalNewWord.word.includes(" ") ||
          finalNewWord.word.includes("-")
        ) {
          index++;
          finalNewWord = shuffledNewWordList[index];
          console.log("stuck in while loop");
        }

        // set down word

        current.clue =
          finalNewWord.defs[
            Math.floor(Math.random() * finalNewWord.defs.length)
          ].split("\t")[1];

        current.word = finalNewWord.word;
        allWords.push(finalNewWord.word);

        console.log("Word ADDED DOWN", current, "order: ", order);
        order++;

        let splWord = finalNewWord.word.split("");
        len = splWord.length;

        for (let q = 0; q < len; q++) {
          current.ref[q].contents = splWord[q].toUpperCase();
          current.ref[q].cell.children[1].textContent = `${splWord[
            q
          ].toUpperCase()}`;
        }
      }
    }
  };

  await fillRemainingDownWords();
  complete = true;
  console.log("build completed");

  populateCluesList();
};

const clearGrid = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let current = grid[`row${i}`][j];
      current.contents = "";
    }
  }

  let across = Object.keys(words.across);

  across.forEach((val) => {
    let current = words.across[val];
    current.word = "";
    current.clue = "";
  });

  let down = Object.keys(words.down);

  down.forEach((val) => {
    let current = words.down[val];
    current.word = "";
    current.clue = "";
  });
};

const populateCluesList = () => {
  let acrossCard = document.querySelector(".across-card");
  let downCard = document.querySelector(".down-card");

  let across = Object.keys(words.across);
  let down = Object.keys(words.down);

  let h = document.createElement("h3");
  h.textContent = "Across";
  acrossCard.append(h);

  across.forEach((val) => {
    let current = words.across[val];
    let p = document.createElement("p");
    p.textContent = `${val.replace("across", "")}: ${current.clue} (${
      current.ref.length
    })`;
    acrossCard.append(p);
  });

  let h3 = document.createElement("h3");
  h3.textContent = "Down";
  downCard.append(h3);

  down.forEach((val) => {
    let current = words.down[val];
    let p = document.createElement("p");
    p.textContent = `${val.replace("down", "")}: ${current.clue} (${
      current.ref.length
    })`;
    downCard.append(p);
  });
};

const checkComplete = () => {
  if (!complete) {
    window.location.reload();
  } else {
    clearInterval(interval);
    console.log("no need to run again");
  }
};

createWordsAndClues();

let interval = setInterval(checkComplete, 3500);
