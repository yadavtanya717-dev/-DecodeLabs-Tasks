import { HiOutlineSparkles } from "react-icons/hi2";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__icon">
            <HiOutlineSparkles />
          </span>
          <span>Tonecraft AI</span>
        </div>

        <p className="footer__tagline">
          Made with Gemini AI &middot; React &middot; FastAPI
        </p>

        <p className="footer__copyright">
          &copy; {year} Tonecraft AI. Built for the AI Copywriting &amp; Tone
          Transformer project.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
