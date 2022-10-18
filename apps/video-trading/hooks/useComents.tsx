import { useQuery } from "@tanstack/react-query";
import { Comment } from "client";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React from "react";

const firestore = getFirestore();

export default function useComents(video: any) {
  const comments = useQuery(["comments", video], async () => {
    const commentRef = query(
      collection(firestore, "Comment"),
      where("video", "==", video)
    );

    const querySnapshot = await getDocs(commentRef);
    const comments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return comments as Comment[];
  });

  return comments;
}
