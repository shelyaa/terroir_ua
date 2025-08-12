import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { addComment } from "../api/contact";
import { Textarea } from "../components/ui/textarea";

export const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await addComment({ email, message });
      setSuccess(true);
      setEmail("");
      setMessage("");
    } catch (error) {
      setError("Виникла помилка при надсиланні. Спробуйте ще раз.");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-5xl md:mx-auto flex md:flex-row flex-col my-10 justify-between mx-4">
      <div className="flex flex-col items-center mb-8 mx-4">
        <h2 className="text-3xl font-semibold mb-2">Напиши нам тут</h2>
        <p className="font-manrope text-base font-medium text-light-gray mb-7">
          Ми з радістю вислухаємо ваші ідеї і прочитаємо коментарі
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 font-manrope md:w-[400px] w-80"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-[#5A5A5A]">
              Введіть свою електронну адресу
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium text-[#5A5A5A]">
              Напишіть повідомлення
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Введіть текст тут"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="placeholder:text-sm rounded-none border-0 border-b-1 border-gray-400"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-800 text-white"
          >
            Надіслати
          </Button>
          {success && (
            <div className="text-sm text-gray">Коментар успішно надіслано!</div>
          )}
          {error && <div className="text-sm text-red-600">{error}</div>}
        </form>
      </div>
      <div className="flex flex-col text-center text-[#5A5A5A] gap-1 font-manrope justify-center items-end">
        <div className="grid grid-cols-1 gap-y-3 text text-right font-[400] ">
          <a
            href="mailto:info@terroir.ua"
            className="whitespace-nowrap text-red-900  font-cormorant text-2xl"
          >
            info@terroir.ua
          </a>
          <Link to="/">GitHub</Link>
          <Link to="/help">FAQ / Допомога</Link>
          <Link to="/polityka-konfidentsiynosti">
            Політика конфіденційності
          </Link>
        </div>
      </div>
    </div>
  );
};
