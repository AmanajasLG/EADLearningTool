import "./index.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { gameActions } from "../../_actions";

const UserSpace = () => {
  const user = useSelector((state) => state.authentication.user.user);
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(gameActions.getAll("missions"));
  }, [dispatch]);

  // React.useEffect(()=>{
  //   dispatch(game_1_missionsActions.getAll())
  // }, [dispatch, game_1_missionsActions])

  // React.useEffect(()=>{
  //   dispatch(game_3_missionsActions.getAll())
  // }, [dispatch, game_3_missionsActions])

  return (
    <div id="userspace">
      {!user.id ? (
        <div>Loading...</div>
      ) : (
        <div>
          {user.role.type === "aluno" && (
            <div
              style={{
                position: "relative",
                border: "dashed 2px black",
                borderRadius: "2em",
                padding: "1em",
                fontSize: "1.3em",
                textAlign: "center",
                marginBottom: "1.5em",
                marginTop: "-3em",
              }}
            >
              <p
                style={{
                  fontFamily: "abril fatfac",
                  fontWeight: 800,
                  color: "#59316d",
                }}
              >
                Hello, we would like to thank you, student, for taking the time
                to help us test these games that aim to help you retain the
                content learned in the Portuguese course at CCBF! We hope you
                enjoy them {":)"} Have fun and good studies!
              </p>
            </div>
          )}
          <p>Oi {user.username}!</p>

          {/* user.role.type === "professor"  && <div id="area-criacao">
            Área de criação
            <div>
              <Link to='/missions'>Ver Missões</Link>
            </div>

            <div>
              <Link to='/characters'>Personagens</Link>
            </div>

            <div>
              <Link to='/questions'>Perguntas</Link>
            </div>
          </div>
        */}

          <div className="jogos">
            <p>Jogos:</p>
            <div id="missoes">
              {game.loading ? (
                <div>Loading...</div>
              )
              : game.error?
              (<div>Ocorreu um erro: {game.error}</div>)
              :(
                game.items.missions &&
                game.items.missions
                  .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                  .map((mission, index) => (
                    <div key={index} className="missao">
                      <Link to={`/game${mission.gameType.game}/${mission.id}`}>
                        <div id="imagem"></div>
                        <div id="card-text-wrapper">
                          <div id="descricao">JOGO {mission.gameType.game}</div>
                          <div id="nome-missao">{mission.name}</div>

                          {/* <div id="recompensas">Recompensas</div> */}
                        </div>
                      </Link>
                    </div>
                  ))
              )}
            </div>
          </div>
          {process.env.NODE_ENV === "development" && (
            <div>
              Development
              <div>
                <Link to="/game4/0">Game4 Stub</Link>
                <br />
                <Link to="/game5/0">Game5 Stub</Link>
                <br />
                <Link to="/game6/0">Game6 Stub</Link>
                <br />
                <Link to="/game7/0">Game7 Stub</Link>
                <br />
                <Link to="/game8/0">Game8 Stub</Link>
                <br />
                <Link to="/game9/0">Game9 Stub</Link>
                <br />
                <Link to="/game10/0">Game10 Stub</Link>
                <br />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSpace;
