import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useGetPlayerData } from "../hooks/useGetPlayerData";
import { useParams } from "react-router-dom";

export const LastOnlineCounter = () => {
  const { username } = useParams<{ username: string }>();

  const { data } = useGetPlayerData(username);

  const lastOnlineTimestamp = data?.profile.last_online ?? 0;

  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = Date.now();
      const lastOnline = lastOnlineTimestamp * 1000; // Convert to milliseconds
      const diffInSeconds = Math.floor((now - lastOnline) / 1000); // Convert to seconds

      const hours = Math.floor(diffInSeconds / 3600); // Get hours
      const minutes = Math.floor((diffInSeconds % 3600) / 60); // Get minutes
      const seconds = diffInSeconds % 60; // Get seconds

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // Format time

      if (diffInSeconds < 300) {
        // Less than 5 minutes
        setTimeAgo(`${formattedTime} (Recently Active)`);
      } else {
        setTimeAgo(formattedTime);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(interval);
  }, [lastOnlineTimestamp]);

  return (
    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
      <Clock className="mr-2 w-4 h-4" />
      <span>Last online: {timeAgo} ago</span>
    </div>
  );
};
