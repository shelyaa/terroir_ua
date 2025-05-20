import { removeUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { Button } from "./ui/button";

export const Account = ({ email }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto grid grid-cols-2 py-12 max-w-6xl items-start gap-5">
      <div className="font-manrope mb-4">
        <div> {name}</div>
        <div> {email}</div>
      </div>
      <ul className="text-xl font-medium w-75 [&_li]:mb-7 [&_li]:border-b [&_li]:border-[#5A5A5A] [&_li]:pl-3 [&_li]:pb-1">
        <li>Улюблене</li>
        <li>Налаштування</li>
        <li>Історія переглядів</li>
        <button onClick={() => dispatch(removeUser())}>
        log out
      </button>
      </ul>
     
    </div>
  );
};
