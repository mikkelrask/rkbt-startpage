// LastUpdateInfo.js
import { useState, useEffect } from "react";
import axios from "axios";

const LastUpdateInfo = () => {
  const [lastUpdateDate, setLastUpdateDate] = useState(null);

  useEffect(() => {
    const fetchLastUpdateDate = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/info"); // Replace with your server endpoint
        setLastUpdateDate(response.data.lastUpdated);
      } catch (error) {
        console.error("Error fetching last update date:", error); // Use error as it's of type unknown
      }
    };

    fetchLastUpdateDate();
  }, []);

  return (
    <div className="updated">
      {lastUpdateDate && <p>Last Updated: {lastUpdateDate}</p>}
    </div>
  );
};

export default LastUpdateInfo;
