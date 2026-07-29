"use client";

import React from "react";
import { RecirvedSucsses_section } from "./sections/RecirvedSucsses_section";
import { OrderDetails_section } from "./sections/OrderDetails_section";

import style from "./styles/sucssesfulOrder.module.scss";

export const SucssesfulPaymentComponent = () => {
  return (
    <main className={style.sucssesfulOrder}>
      <div className="mx-auto max-w-[600px] py-20">
        <RecirvedSucsses_section />
        <OrderDetails_section />
      </div>
    </main>
  );
};
