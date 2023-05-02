export const metadata = {
  title: "Privacy",
};

import React from "react";
import fs from "fs";
import ReactMarkDown from "react-markdown";

function getPrivacy() {
  const privacy = fs.readFileSync("docs/privacy.md", "utf-8");
  return { privacy };
}

export default function Page() {
  const { privacy } = getPrivacy();
  return (
    <div className="mt-20 mx-20 p-10 border rounded-3xl">
      <ReactMarkDown>{privacy}</ReactMarkDown>
    </div>
  );
}
