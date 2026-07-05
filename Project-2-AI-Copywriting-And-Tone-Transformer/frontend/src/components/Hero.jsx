import { HiOutlineSparkles } from "react-icons/hi2";
import { RiMegaphoneLine } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__badge">
        <HiOutlineSparkles />
        <span>Powered by Gemini 2.5 Flash</span>
      </div>

      <h1 className="hero__heading">
        Turn plain product details into
        <span className="hero__heading-gradient"> copy that converts.</span>
      </h1>

      <p className="hero__subtitle">
        Tonecraft AI crafts platform-ready marketing copy in the exact tone
        your brand needs, from luxury and persuasive to warm and friendly.
        Built for teams who care about every word.
      </p>

      <div className="hero__actions">
        <a href="#generator" className="hero__cta-primary">
          <RiMegaphoneLine />
          Start Generating
        </a>

        <a href="#generator" className="hero__cta-secondary">
          See how it works
        </a>
      </div>

      <div className="hero__stats">
        <div className="hero__stat">
          <span className="hero__stat-value">4</span>
          <span className="hero__stat-label">Platforms</span>
        </div>

        <div className="hero__stat-divider" />

        <div className="hero__stat">
          <span className="hero__stat-value">5</span>
          <span className="hero__stat-label">Tone Presets</span>
        </div>

        <div className="hero__stat-divider" />

        <div className="hero__stat">
          <span className="hero__stat-value">&lt;5s</span>
          <span className="hero__stat-label">Avg. Generation</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;