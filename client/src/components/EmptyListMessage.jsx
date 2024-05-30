import emptyList from "../graphics/EmptyList.json";
import { useLottie } from "lottie-react";
import "../styles/Loading.css";

function EmptyListMessage() {
  const options = { animationData: emptyList, loop: true };
  const style = { width: "80%" };
  const { View } = useLottie(options);
  return (
    <div className="loading-screen">
      {View}
      <p id="message">No matches found!</p>
    </div>
  );
}

export default EmptyListMessage;
