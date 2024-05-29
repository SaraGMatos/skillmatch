import Lottie from "lottie-react";
import errorAnimation from "../graphics/error_animation.json";
import "../styles/App.css";

function ErrorPage() {
  return (
    <section className="error-page-section">
      <div className="error-animation">
        <Lottie animationData={errorAnimation} loop={true} />
        <h2>Oops, nothing to see here!</h2>
      </div>
    </section>
  );
}

export default ErrorPage;
