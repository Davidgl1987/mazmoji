import { getSharedLink } from "../gameHelper";
import { en } from "../langs/en";

export const ShareMethods = ({ shareBoard }) => {
  const shareText = en.SHARE_TEXT + "\n" + shareBoard;

  const twitter = () => {
    window.open(
      "http://twitter.com/share?text=" +
        encodeURIComponent(shareText) +
        "&url=" +
        encodeURIComponent(getSharedLink(shareBoard))
    );
  };
  const whatsapp = () => {
    window.open(
      "whatsapp://send?text=" +
        encodeURIComponent(shareText + "\n" + getSharedLink(shareBoard))
    );
  };
  const clipboard = () => {
    navigator.clipboard
      .writeText(shareText + "\n" + getSharedLink(shareBoard))
      .then(
        () => {
          alert("Mazmorra copiada en el portapapeles");
        },
        (err) => {
          alert("No se ha podido copiar la mazmorra: " + err);
        }
      );
  };
  return (
    <div>
      <p>{en.SHARE_ON}</p>
      <div>
        <button onClick={twitter}>Twitter</button>
        <button onClick={whatsapp}>Whatsapp</button>
        <button onClick={clipboard}>Clipboard</button>
      </div>
    </div>
  );
};
