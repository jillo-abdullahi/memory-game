import { useState } from "react";
import { GameTypeSelector } from "@/components/GameTypeSelector";

export const GameBoard: React.FC = ({}) => {
  return (
    <div>
      <GameTypeSelector />
    </div>
  );
};
