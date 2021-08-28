import { format } from "date-fns";

function checkBookingError(data) {
  return (
    data.userAnswers.city.correct &&
    data.userAnswers.days === data.days &&
    data.userAnswers.dates.going.month === data.month.toString() &&
    data.userAnswers.dates.return.month === data.month.toString() &&
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
  if (data.userAnswers.dates.going.month !== data.month.toString())
    errors.push({
      type: "mês de ida",
      userAnswer: data.userAnswers.dates.going.month,
      correctAnswer: data.month.toString(),
    });
  if (data.userAnswers.dates.return.month !== data.month.toString())
    errors.push({
      type: "mês de volta",
      userAnswer: data.userAnswers.dates.return.month,
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

  if (!data.userAnswers.reservation.hotel.correct)
    errors.push({
      type: "hotel errado",
      userAnswer: data.userAnswers.reservation.hotel.name,
      correctAnswer: data.locations.find((location) => location.correct).name,
    });

  if (data.userAnswers.days !== data.userAnswers.reservation.days)
    errors.push({
      type:
        "número de dias da viagem diferente do número de dias reservados no hotel",
      userAnswer: data.userAnswers.days.toString(),
      correctAnswer: data.userAnswers.reservation.days.toString(),
    });

  if (data.userAnswers.reservation.people !== data.userAnswers.tickets)
    errors.push({
      type: "número de passagens diferente da reserva do hotel",
      userAnswer: data.userAnswers.tickets.toString(),
      correctAnswer: data.peopleCount.toString(),
    });

  data.messages
    .filter((message) => message.responseEmail)
    .filter((message) => message.correctChoice || message.order)
    .forEach((message, index) => {
      let sentence = message.responseEmail.rightOrder
        .map(function (word) {
          return word.text;
        })
        .join(" ");

      console.log(data.userAnswers.sentences);

      if (
        !message.responseEmail.rightOrder.reduce((rightWord, word, i) => {
          return (
            rightWord && word.text === data.userAnswers.sentences[index][i]
          );
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
      "Parabéns! Você atendeu a tudo o que seu cliente precisava, e sem cometer um único erro. Aposto que sua foto estará no quadro de Funcionário do Mês…";
    feedbackMessage.textTranslate =
      "Congratulations! You have met all your clients' needs, and without making a single mistake. I bet your picture will be in the 'Employee of the Month' board...";
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
  } else if (errors.length === 13) {
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
