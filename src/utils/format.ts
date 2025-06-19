export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString(); // *1000 to convert seconds to milliseconds
};

export const formatLastOnline = (timestamp: number) => {
  const now = Date.now();
  const lastOnline = timestamp * 1000;
  const diffInMinutes = Math.floor((now - lastOnline) / (1000 * 60));

  // If the difference is less than 60 minutes, return the difference in minutes
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  // If the difference is less than 1440 minutes (1 day), return the difference in hours
  if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  }

  // If the difference is more than 1 day, return the difference in days
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};
