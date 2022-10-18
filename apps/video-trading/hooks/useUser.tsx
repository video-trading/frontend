import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getDoc, doc, getFirestore } from "firebase/firestore";

const firestore = getFirestore();

export default function useUser(userId: any) {
  const user = useQuery(["user", userId], async () => {
    const document = await getDoc(userId);
    if (document.exists()) {
      return document.data() as any;
    } else {
      return undefined;
    }
  });

  return user;
}
