// import react from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Your <span className="textBlue hero-title">Dream</span> Job
        </h1>
        <h4 className="hero-subtitle">
          Find top employers, explore exciting job listings, and take the next
          step in your career journey.
        </h4>
        <div className="hero-box">
          <p className="hero-description">
            Welcome to <span className="textBlue">Jobify</span> , your premier
            destination for career advancement. Whether you are starting out,
            changing <span className="textBlue">careers</span> , or aiming for
            the top, we offer extensive job listings, valuable insights, and
            connections with leading employers. Start your path to success with{" "}
            <span className="textBlue">Jobify</span> today!
          </p>
          <div className="hero-button-container">
            <Link to={"/jobs"} className="hero-button">
              Explore JOBS
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <img src="/hero.jpg" alt="Background" className="hero-image " />
      </div>
    </section>
  );
};

export default Hero;
