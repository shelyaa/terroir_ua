import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      className="  bg-[#F3F3F3]
 text-[#521b1a]"
    >
      <div>
        <img
          src="/src/assets/vineyard.png"
          alt="Vineyard illustration"
          className="w-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto py-3 flex flex-col md:flex-row items-center justify-between text-[#590004]">
        <div className="flex items-center gap-5">
          <img src="/logo/logo.png" alt="Logo" className="w-40 h-40" />
          <div className="ml-6">
            <p className="text-[#521b1a] text-3xl font-medium">
              Приєднуйся до винної
              <br />
              культури України
            </p>
          </div>
        </div>

        <div className="flex flex-col md:items-end items-center text-center text-[#5A5A5A] gap-1 font-manrope">
          <div className="grid grid-cols-1 gap-y-3 text text-right font-[400] *:cursor-pointer">
            <Link to="/">GitHub</Link>
            <Link to="/contacts">Контакти</Link>
            <Link to="/help">FAQ / Допомога</Link>
            <Link to="/">Політика конфіденційності</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
