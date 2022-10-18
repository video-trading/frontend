import { useQuery } from "@tanstack/react-query";
import { Video } from "client";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  limit,
  query,
} from "firebase/firestore";

const firestore = getFirestore();

export default function useVideo(id: string) {
  /**
   * Get video by id
   */
  const video = useQuery([id], async () => {
    const docRef = doc(firestore, "Video", id);
    const document = await getDoc(docRef);
    if (document.exists()) {
      return { id: id, ...document.data() } as Video;
    } else {
      return undefined;
    }
  });

  return video;
}
