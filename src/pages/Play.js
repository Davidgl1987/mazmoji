import { useParams } from "react-router-dom";
import { decryptBoard } from "../gameHelper";

export const Play = () => {
  const { encDungeon } = useParams();
  return <div className="share-board">{decryptBoard(encDungeon)}</div>;
};

// http://localhost:3000/mazmoji/TlVXQU5VTlVOVU5VTlVOVQpTTldBRElXQVdBV0FXQU5VClRSV0FXQU5VTlVTUE5VTlUKU1BOVU5VTlVOVVdBV0FOVQpOVU5VTlVOVU5VV0FXQUNUCk5VTlVOVU5VTlVOVUNUTlUK
