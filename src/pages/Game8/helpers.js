import {
  mapFeedbackIcon,
  planeFeedbackIcon,
  emailFeedbackIcon,
  calendarFeedbackIcon,
} from "../../img";

function checkBookingError(data) {
  return (
    data.userAnswers.city.correct &&
    data.userAnswers.days === data.days &&
    data.userAnswers.dates.going.month === data.month &&
    data.userAnswers.dates.return.month === data.month &&
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
  if (data.userAnswers.dates.going.month !== data.month)
    errors.push({
      type: "mês de ida",
      userAnswer: data.userAnswers.dates.going.month.toString(),
      correctAnswer: data.month.toString(),
    });
  if (data.userAnswers.dates.return.month !== data.month)
    errors.push({
      type: "mês de volta",
      userAnswer: data.userAnswers.dates.return.month.toString(),
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
  let feedbackMessage;

  if (errors.length === 0) {
    // ACERTOU TUDO
    feedbackMessage = {
      text:
        "Parabéns! Você atendeu a tudo o que seu cliente precisava, e sem cometer um único erro. Aposto que sua foto estará no quadro de Funcionário do Mês…",
      textTranslate:
        "Congratulations! You have met all your clients' needs, and without making a single mistake. I bet your picture will be in the 'Employee of the Month' board...",
      image: mapFeedbackIcon,
    };
  } else if (errors.length === 13) {
    // ERROU TUDO
    feedbackMessage = [
      {
        text:
          "Acho que o trabalho de agente de viagens não é para você. Que confusão você fez na viagem de " +
          senderName +
          "!",
        textTranslate:
          "I think the travel agent's work is not for you. What a mess you've made on " +
          senderName +
          "'s trip!",
        image: mapFeedbackIcon,
      },
      {
        text:
          "Você acabou confundindo o destino da viagem de " +
          senderName +
          " ele acabou passando as férias em um lugar diferente do que tinha imaginado. Ainda bem que ele tem um espírito aventureiro…",
        textTranslate:
          "You ended up confusing " +
          senderName +
          "'s trip destination and he spent his vacations in a place different than he imagined. Gladly, he has an adventurous soul...",
        image: planeFeedbackIcon,
      },
      {
        text:
          "Além disso, você acabou errando o dia, horário e n. de passagens para a viagem. Ele não ficou feliz, mas deu um jeito…",
        textTranslate:
          "Besides, you ended up confusing the day, time and n. of tickets for his trip. He was not happy about it, but managed to pull it off...",
        image: calendarFeedbackIcon,
      },
      {
        text:
          senderName +
          " teve certa dificuldade para encontrar os locais que procurava. As orientações que você passou para ele estavam completamente erradas… Mais cuidado da próxima vez, ok?",
        textTranslate:
          senderName +
          " had some hard time trying to din the locations he was looking for. All directions you gave him were completely wrong... Be more careful next time, ok?",
        image: emailFeedbackIcon,
      },
    ];
  } else {
    // DERROTA
    feedbackMessage = [
      {
        text:
          "Parabéns! Você se confundiu em algumas coisas mas, no final, fez com que o cliente fizesse a sua viagem.",
        textTranslate:
          "Congratulations! You've confused some information but, in the end, made your client's trip possible.",
        image: mapFeedbackIcon,
      },
    ];

    if (errors.find((error) => error.type === "cidade")) {
      feedbackMessage.push({
        text:
          "Você acabou confundindo o destino da viagem de " +
          senderName +
          " ele acabou passando as férias em um lugar diferente do que tinha imaginado. Ainda bem que ele tem um espírito aventureiro… ",
        textTranslate:
          "You ended up confusing " +
          senderName +
          "'s trip destination and he spent his vacations in a place different than he imagined. Gladly, he has an adventurous soul...",
        image: planeFeedbackIcon,
      });
    }

    if (
      errors.filter(
        (error) => error.type !== "cidade" && error.type !== "frase"
      ).length !== 0
    ) {
      feedbackMessage.push({
        text:
          "Além disso, você acabou errando algumas informações necessárias para a viagem. Ele não ficou feliz, mas deu um jeito…",
        textTranslate:
          "Besides, you ended up confusing some information necessary for the trip. He was not happy about it, but managed to pull it off...",
        image: calendarFeedbackIcon,
      });
    }

    if (errors.filter((error) => error.type === "frase").length !== 0) {
      feedbackMessage.push({
        text:
          senderName +
          " teve certa dificuldade para encontrar os locais que procurava, das orientações que você passou para ele, algumas estavam erradas… Mais cuidado da próxima vez, ok?",
        textTranslate:
          senderName +
          " had some hard time trying to din the locations he was looking for. Some directions you gave him were wrong... Be more careful next time, ok?",
        image: emailFeedbackIcon,
      });
    }
  }

  return feedbackMessage;
}

export { checkErros, genFeedbackMessages, checkBookingError };
