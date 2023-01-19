export function Footer() {
  return (
    <div className="flex p-4 justify-between items-center border-t border-t-black">
      <div className="flex">
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
    </div>
  );
}
