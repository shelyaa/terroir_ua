export const Footer = () => {
    return (
      <footer className="bg-white text-[#521b1a]">
        <div>
          <img
            src="/src/assets/vineyard.png"
            alt="Vineyard illustration"
            className="w-full object-cover"
          />
        </div>
  
        <div className="max-w-6xl mx-auto py-5 flex flex-col md:flex-row items-center justify-between text-[#590004]">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="/logo/logo.png"
              alt="Logo"
              className="w-50 h-50"
            />
          </div>
  
          <div className=''>
            <p className="text-[#521b1a] text-2xl font-medium leading-relaxed text-center md:text-left">
            Приєднуйся до винної<br />культури України
            </p>
          </div>
  
          <div className="flex flex-col md:items-end items-center text-center text-[#5A5A5A] gap-1 font-manrope">
            <div className="grid grid-cols-2 gap-y-3 text text-center font-[400]">
              <span className="whitespace-nowrap">Проєкт "Terroir UA"</span>
              <span className="whitespace-nowrap">Instagram</span>
              <span className="whitespace-nowrap">Політика конфіденційності</span>
              <span className="whitespace-nowrap">Facebook</span>
              <span className="whitespace-nowrap">FAQ / Допомога</span>
              <span className="whitespace-nowrap">Telegram</span>
              <span className="whitespace-nowrap">Контакти</span>
              <span className="whitespace-nowrap">YouTube</span>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  