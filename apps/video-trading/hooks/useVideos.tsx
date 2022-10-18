import React from "react";

import { Video } from "client";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
} from "firebase/firestore";

const firestore = getFirestore();

export default function useVideos() {
  const [videos, setVideos] = React.useState<Video[]>([]);

  React.useEffect(() => {
    const getVideos = async () => {
      const q = query(collection(firestore, "Video"), limit(10));
      const querySnapshot = await getDocs(q);
      const videos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videos as Video[]);
    };
    getVideos();
  }, []);

  return videos;
}
