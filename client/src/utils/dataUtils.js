export const fetchAndNormalizeData = async (url) => {
    const isValidDateString = (dateString) => !isNaN(Date.parse(dateString));
  
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
  
    const result = await response.json();
    console.log(result);
    
    return result
      .map((item) => ({
        ...item,
        Day: isValidDateString(item.Day) ? new Date(item.Day).toISOString().split("T")[0] : null, // Normalize dates
      }))
      .filter((item) => item.Day); // Filter out invalid dates
  };
  