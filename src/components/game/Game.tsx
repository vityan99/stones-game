import { FC, useEffect, useState } from "react";
import style from "./game.module.css";
import cn from "classnames";
import Button from "../button/Button";

import { DataType, DataGameType, ClickedType } from "../../types/types";

const Game: FC<DataGameType> = ({ data }): React.ReactElement => {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [pairs, setPairs] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [clicked, setClicked] = useState<ClickedType[]>([]);
  const [shuffledData, setShuffledData] = useState<DataType[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const gameStartHandler = (): void => {
    if (!gameStart) {
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setShuffledData(shuffled);
      setClicked(data.map(({ color, id }: any) => ({ id, clicked: false, color })));
    }
    setGameStart((current) => !current);
    setPairs(0);
  };

  const checkClickedDiamonds = (id: number): void => {
    if (selectedIds.length >= 2) return;

    setClicked((prevClicked) => {
      const updatedClicked = prevClicked.map((item: ClickedType) => {
        if (item.id === id) {
          if (item.clicked || item.found) {
            return item;
          }
          return { ...item, clicked: true };
        }
        return item;
      });

      const newSelectedIds = [...selectedIds, id];
      setSelectedIds(newSelectedIds);

      if (newSelectedIds.length === 2) {
        const [firstId, secondId] = newSelectedIds;
        const firstItem = updatedClicked.find((item) => item.id === firstId);
        const secondItem = updatedClicked.find((item) => item.id === secondId);

        if (firstItem && secondItem && firstItem.color === secondItem.color) {
          const updatedWithFound = updatedClicked.map((item) => {
            if (item.id === firstId || item.id === secondId) {
              return { ...item, found: true };
            }
            return item;
          });
          setSelectedIds([]);
          return updatedWithFound;
        } else {
          setClicked((prevClicked) =>
            prevClicked.map((item) => {
              if (item.id === firstId || item.id === secondId) {
                return { ...item, clicked: false };
              }
              return item;
            })
          );
          setSelectedIds([]);
        }
      }

      return updatedClicked;
    });
  };

  useEffect(() => {
    if (clicked.filter((diamond) => diamond.clicked).length % 2 === 0) {
      setPairs(clicked.filter((diamond) => diamond.clicked).length / 2);
    }
  }, [clicked]);

  useEffect(() => {
    setTotal(data.length / 2);
  }, [data]);

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
          ? shuffledData.map(({ id, color, img }) => {
              const isClicked = clicked.find((item: any) => item.id === id && item.clicked);
              return (
                <Button use={isClicked ? "transparent" : "unavailable"} key={id} clickHandler={() => checkClickedDiamonds(id)}>
                  <img
                    className={cn(
                      style.game__area__diamond,
                      style["game__area__diamond--unavailable"],
                      isClicked && style["game__area__diamond--clicked"]
                    )}
                    src={img}
                    alt={color}
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