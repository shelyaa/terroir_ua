import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  return (
    <div className="max-w-5xl md:mx-auto flex md:flex-row flex-col my-10 justify-between mx-4">
      <div className="flex flex-col items-center mb-8 mx-4">
        <h2 className="text-3xl font-semibold mb-2">Напиши нам тут</h2>
        <p className="font-manrope text-base font-medium text-light-gray mb-7">
          Ми з радістю вислухаємо ваші ідеї і прочитаємо коментарі
        </p>
        <form action="" className="space-y-8 font-manrope md:w-[400px] w-80">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-[#5A5A5A]">
              Введіть свою електронну адресу
            </Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium text-[#5A5A5A]">
              Напишіть повідомлення
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Введіть текст тут"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800 text-white"
          >
            Надіслати
          </Button>
        </form>
      </div>
      <div className="flex flex-col text-center text-[#5A5A5A] gap-1 font-manrope justify-center items-end">
        <div className="grid grid-cols-1 gap-y-3 text text-right font-[400] ">
          <a href="malito:info@terroir.ua" className="whitespace-nowrap text-red-900  font-cormorant text-2xl">info@terroir.ua</a>
          <Link to="/">GitHub</Link>
          <Link to="/help">FAQ / Допомога</Link>
          <Link to="/polityka-konfidentsiynosti">Політика конфіденційності</Link>
          </div>
      </div>
    </div>
  );
};
