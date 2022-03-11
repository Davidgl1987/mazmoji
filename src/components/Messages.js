import { useGameContext } from "../context/GameContext";

export const Messages = () => {
  const { state } = useGameContext();
  const { message } = state;
  return (
    <div className="messages">
      <div className={"text " + message.class}>
        <h5>{message.text}</h5>
      </div>
    </div>
  );
};
