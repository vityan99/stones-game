import { FC, useState } from "react";

import style from "./game.module.css";
import cn from "classnames";

import Button from "../button/Button";

import stone_1 from "../../assets/images/t1.png";
import stone_2 from "../../assets/images/t2.png";
import stone_3 from "../../assets/images/t3.png";
import stone_4 from "../../assets/images/t4.png";

const Game: FC = (): React.ReactElement => {
  const [gameStart, setGameStart] = useState(false);

  const [total, setTotal] = useState(0);
  const [found, setFound] = useState(0);

  const gameStartHandler = () => setGameStart((current) => !current);

  return (
    <div className={cn(style.game)}>
      <div className={cn(style.game__controllers)}>
        <Button title="Начать игру" use="primary" size="large" clickHandler={gameStartHandler} />
      </div>

      <div className={cn(style.game__info)}>
        <span className={cn(style["game__info-note"])}>Найдено: {found}</span>
        <span className={cn(style["game__info-note"])}>Всего: {total}</span>
      </div>

      <div className={cn(style.game__area)}>
        <Button  use="transparent" size="large" clickHandler={gameStartHandler}>
            <img src={stone_1} alt="asdasdas" />
        </Button>
      </div>
    </div>
  );
};

export default Game;
