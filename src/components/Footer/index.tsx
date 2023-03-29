import { RiShieldKeyholeLine } from 'react-icons/ri';

export function Footer() {
  return (
    <div className="flex p-4 justify-between items-center border-t border-t-black">
      <div>
        <span>Made by</span>
        <a
          href="https://github.com/guillermoriv"
          target="_blank"
          className="text-lg italic mx-1 hover:underline"
          rel="noreferrer"
        >
          @guillermoriv
        </a>
      </div>
      <div className="text-3xl bold flex items-center">
        Blockchain Tools <RiShieldKeyholeLine className="ml-3" size={40} />
      </div>
    </div>
  );
}
