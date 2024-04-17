import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <Link href={"/"}>Ir para home</Link>
      <br />
      <Link href={"page2"}>Ir para Pagina 2</Link>
    </header>
  );
};

export default Header;
