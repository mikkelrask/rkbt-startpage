// LastUpdateInfo.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const LastUpdateInfo = () => {
  const [lastUpdateDate, setLastUpdateDate] = useState(null);

  useEffect(() => {
    const fetchLastUpdateDate = async () => {
      try {
        const response = await axios.get("/api/info"); // Replace with your server endpoint
        const lastModified = new Date(
          response.data.lastUpdate
        ).toLocaleString();
        setLastUpdateDate(lastModified);
      } catch (error) {
        console.error("Kunne ikke hente seneste opdatering:", error.message);
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
