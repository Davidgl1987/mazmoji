import { en } from "../langs/en";

export const ShareMethods = ({ shareBoard }) => {
  return (
    <div>
      <p>{en.SHARE_ON}</p>
      <div>
        <button>Twitter</button>
        <button>Whatsapp</button>
        <button>Clipboard</button>
      </div>
    </div>
  );
};
