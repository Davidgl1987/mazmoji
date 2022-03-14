import { Link } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { encryptBoard, getShareBoard, MAX_TURNS } from "../gameHelper";
import { en } from "../langs/en";
import Board from "../components/Board";
import { Messages } from "../components/Messages";
import { Modal } from "../components/Modal";
import RandomElements from "../components/RandomElements";
import { ShareMethods } from "../components/ShareMethods";

const Game = () => {
  const { state, dispatch } = useGameContext();
  const { turns, board, checkBoard } = state;
  const shareBoard = getShareBoard(board);
  return (
    <>
      <Messages />
      <div className="ui">
        <RandomElements />
        <Board board={board} checkBoard={checkBoard} dispatch={dispatch} />
        <div className="turns">
          <h5>
            {MAX_TURNS - turns} <span className="emoji">⏳</span>
          </h5>
        </div>
      </div>
      <Modal
        show={turns >= MAX_TURNS}
        // onClose={() => setShowModal(false)}
        header={en.DUNGEON_CREATED}
        footer={<ShareMethods shareBoard={shareBoard} />}
      >
        <p>{en.SHARE_YOUR_DUNGEON}</p>
        <p className="share-board">{shareBoard}</p>
        <div style={{ textAlign: "center" }}>
          <p>{en.OR_PLAY_YOUR_DUNGEON}</p>
          <Link to={encryptBoard(shareBoard)}>
            <button className="emoji">▶️</button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default Game;
