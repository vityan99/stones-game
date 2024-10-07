import { FC, useEffect, useState } from "react";
import style from "./game.module.css";
import cn from "classnames";
import Button from "../button/Button";
import type { DataType } from "../../assets/data/data";

type DataGameType = {
  data: DataType[];
};

const Game: FC<DataGameType> = ({ data }): React.ReactElement => {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [pairs, setPairs] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const findPairs = (data: DataType[]): number => {
      const countMap: Record<string, number> = {};

      data.forEach(({ color }) => {
        countMap[color] = (countMap[color] || 0) + 1;
      });

      return Object.values(countMap).reduce((acc, count) => {
        return acc + Math.floor(count / 2);
      }, 0);
    };

    const calculatedPairs = findPairs(data);
    setPairs(calculatedPairs);
    setTotal(data.length);
  }, [data]);

  const gameStartHandler = () => setGameStart((current) => !current);

  return (
    <div className={cn(style.game)}>
      <div className={cn(style.game__controllers)}>
        <Button title="Начать игру" use="primary" size="large" clickHandler={gameStartHandler} />
      </div>

      <div className={cn(style.game__info)}>
        <span className={cn(style["game__info-note"])}>Найдено пар: {pairs}</span>
        <span className={cn(style["game__info-note"])}>Всего: {total}</span>
      </div>

      <div className={cn(style.game__area)}>
        {gameStart
          ? data
              .sort(() => Math.random() - 0.5)
              .map(({ id, color, img }) => (
                <Button use="transparent" size="large" key={id}>
                  <img src={img} alt={color} />
                </Button>
              ))
          : data.map(({ id, color, img }) => (
              <Button use="transparent" size="large" key={id}>
                <img src={img} alt={color} />
              </Button>
            ))}
      </div>
    </div>
  );
};

export default Game;
