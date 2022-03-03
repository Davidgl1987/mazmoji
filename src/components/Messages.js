import { useGameContext } from "../context/GameContext";

export const Messages = () => {
  const { state } = useGameContext();
  const { message, turns } = state;
  return (
    <div className="messages">
      <div className={"text " + message.class}>
        <h5>{message.text}</h5>
      </div>
      <div className="turns">
        <h5>{turns} ⏳</h5>
      </div>
    </div>
  );
};
