import { FC } from "react";

import style from "./game.module.css";
import cn from "classnames";

import Button from "../button/Button";

const Game: FC = (): React.ReactElement => {
  return (
    <div className={cn(style.game)}>
      <div className={cn(style.game__controllers)}>
        <Button title="Начать игру" use="primary" size="large" />
      </div>

      <div className={cn(style.game__info)}></div>

      <div className={cn(style.game__area)}></div>
    </div>
  );
};

export default Game;
