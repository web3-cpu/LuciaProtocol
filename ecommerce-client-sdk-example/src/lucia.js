import LuciaSDK from "luciasdk-t3";

const lucia = {
  init: () => {
    LuciaSDK.init({ 
      baseURL: process.env.REACT_APP_BASE_URL,
      api_key: process.env.REACT_APP_API_KEY,
    });
  },

  pageView: (page) => {
    LuciaSDK.pageView(page);
  },
  trackConversion: async (eventTag, amount, eventDetails) => {
    try {
      await LuciaSDK.trackConversion(eventTag, amount, eventDetails);
      console.log("Conversion tracked:", eventTag);
    } catch (error) {
      console.error("Tracking conversion failed:", error);
    }
  },
};

// Initialize the SDK
lucia.init();

export default lucia;
