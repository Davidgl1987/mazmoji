import { useParams } from "react-router-dom";
import Board from "../components/Board";
import { decryptBoard } from "../gameHelper";

export const Play = () => {
  const { encDungeon } = useParams();
  return (
    <div className="emoji" style={{ fontSize: "x-large" }}>
      {/* <div>
        Vidas <br />
        ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
      </div>
      <div>
        Turnos <br /> ⌛⌛
      </div>
      <div>Monstruos</div>
      <div>Tesoros</div>
      <div>Puntos 🏆🏅🎖️</div> */}
      {/* <div className="share-board">{decryptBoard(encDungeon)}</div> */}
      {/* {JSON.stringify(decryptBoard(encDungeon), null, 2)} */}
      <Board onlyView={true} board={decryptBoard(encDungeon)} />
    </div>
  );
};

// http://localhost:3000/mazmoji/TlVXQU5VTlVOVU5VTlVOVQpTTldBRElXQVdBV0FXQU5VClRSV0FXQU5VTlVTUE5VTlUKU1BOVU5VTlVOVVdBV0FOVQpOVU5VTlVOVU5VV0FXQUNUCk5VTlVOVU5VTlVOVUNUTlUK
