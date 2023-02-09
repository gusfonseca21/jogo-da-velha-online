import React, { useState } from "react";

import "../styles/LoginModal.css";

export default function LoginModal() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  setTimeout(() => {
    setOpenLoginModal(true);
  }, 200);

  return (
    <>
      <div className={`login-form ${openLoginModal && "show"}`}>
        <h2 className='heading'>Faça seu login e comece a jogar!</h2>
        <div className='card'></div>
      </div>
      <div className={`modal ${openLoginModal && "show"}`}></div>
    </>
  );
}
