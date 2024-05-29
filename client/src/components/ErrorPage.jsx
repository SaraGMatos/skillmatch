import Lottie from "lottie-react";
import errorAnimation from "../graphics/error_animation.json";

function ErrorPage() {
  <section className="error-page-section">
    <h2>Oops, nothing to see here!</h2>
    <div className="error-animation">
      <Lottie animationData={errorAnimation} loop={true} />
    </div>
  </section>;
}

export default ErrorPage;
