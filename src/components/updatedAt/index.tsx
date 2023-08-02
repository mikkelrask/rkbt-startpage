import { useState, useEffect } from "react";

const infoUrl = "/api/info";
const baseUrl = `${import.meta.env.EXPRESS_API_BASE_URL as string}`;

interface InfoResponse {
  lastUpdated: string;
}

const LastUpdateInfo = () => {
  const [lastUpdateDate, setLastUpdateDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastUpdateDate = async () => {
      try {
        const response = await fetch(`${baseUrl}${infoUrl}`);
        if (!response.ok) {
          throw new Error("Failed to fetch last update date.");
        }
        const info = (await response.json()) as InfoResponse;
        setLastUpdateDate(info.lastUpdated);
      } catch (error) {
        console.error("Error fetching last update date:", error);
      }
    };

    void fetchLastUpdateDate();
  }, []);

  return (
    <div className="updated">
      {lastUpdateDate && <p>Opdateret d. {lastUpdateDate}</p>}
    </div>
  );
};

export default LastUpdateInfo;
