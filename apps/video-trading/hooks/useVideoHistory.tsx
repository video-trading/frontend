import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";

import { getFirestore } from "firebase/firestore";
import { Transaction } from "client";

const firestore = getFirestore();

export default function useVideoHistory(video: any) {
  const histories = useQuery(["histories", video], async () => {
    const historyRef = query(
      collection(firestore, "Transaction"),
      where("video", "==", video)
    );

    const querySnapshot = await getDocs(historyRef);
    const histories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return histories as Transaction[];
  });

  return histories;
}
