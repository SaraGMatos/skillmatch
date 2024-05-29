import loading from "../graphics/loading.json";
import { useLottie } from "lottie-react";
import "../styles/Loading.css"

function Loading() {
  const options = { animationData: loading, loop: true };
  const { View } = useLottie(options);

  return <div className="loading-screen">{View}</div>;
}

export default Loading;
