import { FC, useEffect, useState } from "react";
import style from "./game.module.css";
import cn from "classnames";
import Button from "../button/Button";

import { DiamondType, DataGameType } from "../../types/types";

const Game: FC<DataGameType> = ({ data }): React.ReactElement => {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [shuffledData, setShuffledData] = useState<DiamondType[]>([]);
  const [pairs, setPairs] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [compareArray, setCompareArray] = useState<DiamondType[]>([]);

  const gameStartHandler = (): void => {
    if (!gameStart) {
      const shuffledDataArray = [...data].sort(() => Math.random() - 0.5).map((diamond) => ({ ...diamond, hidden: true, disabled: false }));
      setShuffledData(shuffledDataArray);
    }

    setGameStart((current) => !current);
    setPairs(0);
  };

  const compareDataHandler = (diamond: DiamondType): void => {
    if (!compareArray.includes(diamond)) {
      setCompareArray((current) => [...current, diamond]);
    }
  };

  const compareDiamonds = (): void => {
    if (compareArray.every((diamond) => diamond.color === compareArray[0].color)) {
      changeDataStatus();
    }
  };

  const changeDataStatus = (): void => {
    const updatedShuffledData = shuffledData.map((targetDiamond: DiamondType): DiamondType => {
      const isMatch = compareArray.some((diamond: DiamondType): boolean => diamond.id === targetDiamond.id);

      if (isMatch) {
        return {
          ...targetDiamond,
          hidden: false,
          disabled: true,
        };
      }

      return targetDiamond;
    });

    setShuffledData(updatedShuffledData);
    setPairs((current) => current + 1);
  };

  useEffect(() => {
    const totalPairs = data.reduce<Record<string, number>>((acc, { color }) => {
      if (acc[color]) {
        acc[color] += 1;
      } else {
        acc[color] = 1;
      }
      return acc;
    }, {});

    const countPairs = Object.values(totalPairs).reduce<number>((acc, count) => acc + Math.floor(count / 2), 0);

    setTotal(countPairs);
  }, []);

  useEffect(() => {
    if (compareArray.length === 2) {
      compareDiamonds();
      setCompareArray([]);
    }
  }, [compareArray]);

  return (
    <div className={cn(style.game)}>
      <div className={cn(style.game__controllers)}>
        <Button title={gameStart ? "Сбросить" : "Начать игру"} use="primary" size="large" clickHandler={gameStartHandler} />
      </div>
      <div className={cn(style.game__info)}>
        <span className={cn(style["game__info-note"])}>Найдено пар: {pairs}</span>
        <span className={cn(style["game__info-note"])}>Всего: {total}</span>
      </div>
      <div className={cn(style.game__area)}>
        {gameStart
          ? shuffledData.map((diamond) => {
              return (
                <Button
                  use={!diamond.hidden ? "transparent" : "unavailable"}
                  key={diamond.id}
                  clickHandler={() => compareDataHandler(diamond)}
                >
                  <img
                    className={cn(
                      style.game__area__diamond,
                      style["game__area__diamond--unavailable"],
                      !diamond.hidden && style["game__area__diamond--clicked"]
                    )}
                    src={diamond.img}
                    alt={diamond.color}
                  />
                </Button>
              );
            })
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
