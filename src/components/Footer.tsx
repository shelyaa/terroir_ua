import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer
      className="bg-[#F3F3F3] text-[#521b1a]  py-6" 
    >
      <div>
        <img
          src="/backgrounds/vineyard.png"
          alt="Vineyard illustration"
          className="w-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto py-3 flex flex-col md:flex-row items- justify-between text-[#590004] px-4">
        <div className="flex items-center gap-5">
          <img src="/logo/logo.png" alt="Logo" className="md:w-40 md:h-40 w-30 h-30" />
          <div className="ml-6">
            <p className="text-[#521b1a] md:text-3xl font-medium md:max-w-70 text-xl max-w-40">
              Приєднуйся до винної культури України
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end text-center text-[#5A5A5A] gap-1 font-manrope">
          <div className="grid grid-cols-1 gap-y-3 text-right font-[400] *:cursor-pointer">
            <Link to="/">GitHub</Link>
            <Link to="/contacts">Контакти</Link>
            <Link to="/help">FAQ / Допомога</Link>
            <Link to="/polityka-konfidentsiynosti">
              Політика конфіденційності
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
