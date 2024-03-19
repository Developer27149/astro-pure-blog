import { calcRelativeDate } from "@utils/formatDate";
import { useEffect, useState } from "react";

const TimeAgo: React.FC<{ date: Date | string }> = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState<string>("");
  useEffect(() => {
    const result = calcRelativeDate(date);
    setTimeAgo(result);
    setInterval(() => {
      const result = calcRelativeDate(date);
      setTimeAgo(result);
    }, 1000);
  }, []);
  return <span>{timeAgo}</span>;
};

export default TimeAgo;
