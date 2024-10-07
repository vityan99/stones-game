import { FC } from "react";
import style from "./app.module.css";
import cn from "classnames";

import Game from "../game/Game";

import { data } from "../../assets/data/data";

const App: FC = (): React.ReactElement => {
  return (
    <div className={cn(style.container)}>
      <Game data={data} />
    </div>
  );
};

export default App;
