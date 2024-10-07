import { FC } from "react";
import style from "./app.module.css";
import cn from "classnames";

import Game from "../game/Game";

const App: FC = (): React.ReactElement => {
  return (
    <div className={cn(style.container)}>
      <Game />
    </div>
  );
};

export default App;
