import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialImgs.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="icon transition-all hover:scale-110 hover:opacity-80"
              aria-label={`Visit ${social.name}`}
            >
              <img 
                src={social.imgPath} 
                alt={social.name} 
                className={`${
                  social.name === "github" 
                    ? "w-[35px] h-[35px]" 
                    : "w-6 h-6"
                } object-contain`}
              />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Sahil Golder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;