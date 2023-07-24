/* eslint-disable react/jsx-no-target-blank */
import "./footer.css";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="links">
        <a
          href="https://twitter.com/DManjarwar"
          className="twitter"
          target="_blank"
        >
          <FaTwitter />
        </a>
        <a
          href="https://github.com/divyank13/"
          className="github"
          target="_blank"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/divyank-manjarwar-12b267237/"
          className="linkedin"
          target="_blank"
        >
          <FaLinkedin />
        </a>
      </div>
      <p className="copyright">
        © No Copyright, Developed by{" "}
        <a
          href="https://github.com/divyank13/"
          className="shobhit"
          target="_blank"
        >
          Divyank Manjarwar
        </a>
      </p>
    </div>
  );
};
