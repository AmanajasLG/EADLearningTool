function numberToMoney(n) {
  var string = n.toString(),
    units,
    tens,
    hundreds,
    chunks,
    chunk,
    ints,
    i,
    word,
    words;

  /* Is number zero? */
  if (parseInt(string) === 0) {
    return "zero";
  }

  /* Array of units as words */
  units = [
    "",
    "um",
    "dois",
    "três",
    "quatro",
    "cinco",
    "seis",
    "sete",
    "oito",
    "nove",
    "dez",
    "onze",
    "doze",
    "treze",
    "quatorze",
    "quize",
    "dezesseis",
    "dezessete",
    "dezoito",
    "dezenove",
  ];

  /* Array of tens as words */
  tens = [
    "",
    "",
    "vinte",
    "trinta",
    "quarenta",
    "cinquenta",
    "sessenta",
    "setenta",
    "oitenta",
    "noventa",
  ];

  /* Array of scales as words */
  hundreds = [
    "",
    "cento",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seissentos",
    "setecentos",
    "oitocentos",
    "novecentos",
  ];

  chunks = string.split(".");

  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunks.length; i++) {
    chunk = parseInt(chunks[i]);

    if (chunk) {
      if (i === 1) words.push("e");

      if (chunk === 100) {
        words.push("cem reais");
        continue;
      }

      /* Split chunk into array of individual integers */
      ints = chunks[i].split("").reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      if ((word = hundreds[ints[2]])) {
        words.push(word + " e");
      }

      /* Add tens word if array item exists */
      if ((word = tens[ints[1]])) {
        words.push(word + " e");
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word);
      } else {
        words[words.length - 1] = words[words.length - 1].replace(" e", "");
      }

      if (i === 0) {
        if (chunk > 1) words.push("reais");
        else words.push("real");
      } else {
        if (chunk > 1) words.push("centavos");
        else words.push("centavo");
      }
    }
  }

  return words.join(" ");
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function goRound(value, max) {
  return value >= 0 ? value % max : max - (Math.abs(value) % max);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex,
    shuffledArray = [...array];

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}

function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

function zeroFill(s, size) {
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

function preventSingleWordBreak(sentence) {
  let words = sentence.split(" ");

  return (
    words.slice(0, words.length - 3).join(" ") +
    " " +
    words.slice(words.length - 3).join("\u00a0")
  );
}

// function setElementPositonX(rect, element) {
//   return rect.left - element.offsetWidth < 0
//     ? rect.left + element.offsetWidth
//     : rect.left - element.offsetWidth;
// }

// function setElementPositonY(rect, element) {
//   return rect.top - element.offsetHeight < 0
//     ? rect.top + element.offsetHeight
//     : rect.top - element.offsetHeight;
// }

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const numberList = (max) => Array.from({ length: max }, (_, i) => i + 1);

export {
  months,
  numberToMoney,
  zeroFill,
  splitArrayIntoChunksOfLen,
  shuffle,
  goRound,
  preventSingleWordBreak,
  capitalizeFirstLetter,
  numberList,
};
