import { Link } from "react-router-dom";

export default function Card({ title, image, onClick, label, isProfilePage, className, type = "" }) {
  return (
    <div onClick={onClick} className={className}>
      <Link
        className="flex flex-col items-center justify-center w-full h-full bg-orange-200 rounded-lg p-4 transition-transform transform hover:bg-orange-300 cursor-pointer"
        to={type==="balance" ? `/${label}` : `/tab/${label}`}
      >
        <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center shadow-inner">
          {type === "balance" ? <p className="text-3xl font-bold text-white">$</p>
            : <img src={image} alt={title} className="w-10 h-10" />}
        </div>
        <h3 className="mt-2 font-semibold text-black text-sm text-center">{title}</h3>
      </Link>
    </div>
  );
}