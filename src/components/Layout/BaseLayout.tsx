"use client";

import FloatingContacts from "./Contacts";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useScrollToForm } from "@/utils/scrollToForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPublicSetting } from "@/store/actions/settings";

export default function BaseLayout({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: any;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const scrollToForm = useScrollToForm();

  const settingData = useSelector((state: RootState) => state.settings.detail);

  useEffect(() => {
    dispatch(fetchPublicSetting(["contact", "general"]));
  }, []);

  return (
    <>
      <Navbar menu={settings.menuHeader.data} onSendFreeTest={scrollToForm} />
      {children}
      {settingData?.contact && (
        <FloatingContacts contactsData={settingData.contact} />
      )}
      <Footer menu={settings.menuFooter.data} />
    </>
  );
}
