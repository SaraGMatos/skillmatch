import loading from "../loading.json";
import { useLottie } from "lottie-react";

function Loading() {
  const options = { animationData: loading, loop: true };
  const { View } = useLottie(options);

  return <>{View}</>;
}

export default Loading;
