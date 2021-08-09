import { format } from "date-fns";

function checkBookingError(data) {
  return (
    data.userAnswers.city.correct &&
    data.userAnswers.days === data.days &&
    format(data.userAnswers.dates.going, "M") === data.month.toString() &&
    format(data.userAnswers.dates.return, "M") === data.month.toString() &&
    data.peopleCount === data.userAnswers.tickets &&
    data.userAnswers.flights.going.correct &&
    data.userAnswers.flights.return.correct
  );
}

function checkErros(data) {
  let errors = [];

  if (!data.userAnswers.city.correct)
    errors.push({
      type: "cidade",
      userAnswer: data.userAnswers.city.name,
      correctAnswer: data.cities.find((city) => city.correct).name,
    });
  if (data.userAnswers.days !== data.days)
    errors.push({
      type: "número de dias",
      userAnswer: data.userAnswers.days.toString(),
      correctAnswer: data.days.toString(),
    });
  if (format(data.userAnswers.dates.going, "M") !== data.month.toString())
    errors.push({
      type: "mês de ida",
      userAnswer: format(data.userAnswers.dates.going, "M"),
      correctAnswer: data.month.toString(),
    });
  if (format(data.userAnswers.dates.return, "M") !== data.month.toString())
    errors.push({
      type: "mês de volta",
      userAnswer: format(data.userAnswers.dates.return, "M"),
      correctAnswer: data.month.toString(),
    });
  if (data.peopleCount !== data.userAnswers.tickets)
    errors.push({
      type: "número de passagens",
      userAnswer: data.userAnswers.tickets.toString(),
      correctAnswer: data.peopleCount.toString(),
    });
  if (!data.userAnswers.flights.going.correct)
    errors.push({
      type: "voo de ida",
      userAnswer: data.userAnswers.flights.going.period,
      correctAnswer: data.flights.going.find((flight) => flight.correct).period,
    });
  if (!data.userAnswers.flights.return.correct)
    errors.push({
      type: "voo de volta",
      userAnswer: data.userAnswers.flights.return.period,
      correctAnswer: data.flights.return.find((flight) => flight.correct)
        .period,
    });

  data.phrases.forEach((phrase, index) => {
    let sentence = phrase.rightOrder
      .map(function (word) {
        return word.text;
      })
      .join(" ");

    if (
      !phrase.rightOrder.reduce((rightWord, word, i) => {
        console.log(word.text);
        console.log(data.userAnswers.sentences[index][i]);
        return rightWord && word.text === data.userAnswers.sentences[index][i];
      }, true)
    ) {
      errors.push({
        type: "frase",
        userAnswer: data.userAnswers.sentences[index].join(" "),
        correctAnswer: sentence,
      });
    }
  });

  return errors;
}

function genFeedbackMessages(errors, city, senderName) {
  let feedbackMessage = {
    text: "",
    textTranslate: "",
  };

  if (errors.length === 0) {
    // ACERTOU TUDO
    feedbackMessage.text =
      "Parabéns! Você atendeu a todos os pedidos da sua cliente. Aposto que ela irá adorar sua visita à " +
      city +
      ". Suas orientações no e-mail foram claras e precisas. " +
      senderName +
      " não teve problemas e pegou seu vôo no dia e horário corretos e para a cidade que queria. Não há cliente mais satisfeita que ela!";
    feedbackMessage.textTranslate =
      "Congratulations! You fulfilled all of your client's requests. I bet she will love her visit to " +
      city +
      ". Your e-mail orientations were clear and precise. " +
      senderName +
      " had no problems and took her flight right on time and to the city she wanted to visit. There is no client more satisfied than her!";
  } else if (
    errors.filter((error) => error.type === "frase").length === errors.length
  ) {
    // ERROU SÓ AS FRASES
    feedbackMessage.text =
      "Parabéns! Você atendeu a todos os pedidos da sua cliente. Ela certamente teria ficado muito satisfeita se tivesse conseguido pegar o vôo. Você escreveu o e-mail de forma tão rápida que acabou confundindo as informações. Apesar de ter feito as reservas corretamente, acabou errando as informações e " +
      senderName +
      " perdeu sua viagem. Que bagunça…";
    feedbackMessage.textTranslate =
      "Congratulations! You fulfilled all of your client's requests. She would certainly have been delighted if she had managed to catch the flight. You have written your e-mail so quickly you got some informations wrong.  Despite having made the reservations correctly, you ended up mistyping the information and " +
      senderName +
      " missed the trip. What a mess...";
  } else if (errors.filter((error) => error.type === "frase").length === 0) {
    // ERROU O QUE TINHA QUE SELECIONAR
    feedbackMessage.text =
      "Você estava tão distraído no trabalho que acabou confundindo os detalhes da reserva. Na tentativa de ser rápido, acabou errando: " +
      errors
        .filter((error) => error.type !== "frase")
        .map(function (error) {
          return error.type;
        })
        .join(", ") +
      ". Você escreveu o e-mail cuidadosamente, tentando não deixar nenhuma informação errada. Sua mensagem ficou perfeita. Minutos após enviar o e-mail, você recebe uma ligação furiosa de " +
      senderName +
      ", perguntando por que você decidiu alterar a viagem dos sonhos dela… Será que ainda é possível desfazer a confusão?";
    feedbackMessage.textTranslate =
      "You were so distracted at work that you confused your booking details. In an attempt to be quick, you ended up missing: " +
      errors
        .filter((error) => error.type !== "frase")
        .map(function (error) {
          return error.type;
        })
        .join(", ") +
      ". You wrote your email carefully, trying not to leave any wrong information. Your text was perfect. Minutes after sending the email, you receive a furious call from " +
      senderName +
      ", asking why you decided to change her dream trip… Is it still possible to undo all the mess?";
  } else {
    // DERROTA
    feedbackMessage.text =
      "Você estava tão distraído no trabalho que acabou confundindo os detalhes da reserva. Na tentativa de ser rápido, acabou errando: " +
      errors
        .filter((error) => error.type !== "frase")
        .map(function (error) {
          return error.type;
        })
        .join(", ") +
      ". Ainda por cima, você escreveu o e-mail de forma tão apressada que errou as informações da viagem. Seu chefe até agora está tentando entender o que aconteceu para causar tanta confusão. E " +
      senderName +
      ", obviamente, não está nem um pouco feliz…";
    feedbackMessage.textTranslate =
      "You were so distracted at work that you confused your booking details. In an attempt to be quick, you ended up missing: " +
      errors
        .filter((error) => error.type !== "frase")
        .map(function (error) {
          return error.type;
        })
        .join(", ") +
      ". On top of that, you wrote the email so hastily that you ended up mistyping the informations. Your boss is still trying to figure out what happened to cause so much trouble. And, obviously, " +
      senderName +
      " is not happy at all…";
  }

  return feedbackMessage;
}

export { checkErros, genFeedbackMessages, checkBookingError };
