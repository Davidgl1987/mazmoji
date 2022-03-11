import { useGameContext } from "../context/GameContext";
import { getShareBoard, MAX_TURNS } from "../gameHelper";
import { en } from "../langs/en";
import Board from "./Board";
import { Messages } from "./Messages";
import { Modal } from "./Modal";
import RandomElements from "./RandomElements";
import { ShareMethods } from "./ShareMethods";

const Game = () => {
  const { state } = useGameContext();
  const { turns, board } = state;
  const shareBoard = getShareBoard(board);
  return (
    <>
      <Messages />
      <div className="ui">
        <RandomElements />
        <Board />
        <div className="turns">
          <h5>{MAX_TURNS - turns} ⏳</h5>
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
      </Modal>
    </>
  );
};

export default Game;
