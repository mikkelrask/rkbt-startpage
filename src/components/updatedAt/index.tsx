import { useState, useEffect } from "react";

const LastUpdateInfo = () => {
  const [lastUpdateDate, setLastUpdateDate] = useState(null);

  useEffect(() => {
    const fetchLastUpdateDate = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/info"); // Replace with your server endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch last update date.");
        }
        const data = await response.json();
        setLastUpdateDate(data.lastUpdated);
      } catch (error) {
        console.error("Error fetching last update date:", error);
      }
    };

    fetchLastUpdateDate();
  }, []);

  return (
    <div className="updated">
      {lastUpdateDate && <p>Opdateret d. {lastUpdateDate}</p>}
    </div>
  );
};

export default LastUpdateInfo;
