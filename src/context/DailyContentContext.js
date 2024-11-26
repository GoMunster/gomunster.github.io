import React, { createContext, useState, useContext, useEffect } from 'react';

// Sample data structure for daily content
const sampleContent = {
  wanderlustQuote: {
    text: "The world is a book and those who do not travel read only one page.",
    author: "St. Augustine"
  },
  bookOfDay: {
    title: "Remote",
    authors: "Jason Fried & DHH",
    coverImage: "/book-covers/remote.jpg",
    amazonLink: "https://amazon.com/...", // Your affiliate link here
    summary: "The ultimate guide to running a remote team from the founders of Basecamp..."
  },
  podcastEpisode: {
    title: "Digital Nomad Stories - Episode 127",
    description: "How this developer built a 6-figure freelance business...",
    duration: "45 minutes",
    link: "https://podcast-url..."
  },
  remoteJob: {
    title: "Senior Frontend Developer",
    company: "Remote Company",
    description: "Looking for a React expert...",
    salary: "$120k-150k",
    link: "https://job-url..."
  },
  videoOfDay: {
    title: "Digital Nomad Morning Routine in Bali",
    description: "A day in the life of a successful remote developer...",
    duration: "12:34",
    link: "https://video-url..."
  },
  marketingTip: {
    title: "LinkedIn Content Strategy",
    description: "Boost your personal brand with carousel posts...",
    link: "https://tip-url..."
  }
};

// Helper function to get a random date between two dates
const getRandomDate = (start, end) => {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const randomTime = startDate + Math.random() * (endDate - startDate);
  return new Date(randomTime);
};

// Create the context
const DailyContentContext = createContext();

// Create the provider component
export const DailyContentProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyContent, setDailyContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load content for a specific date
  const loadContent = async (date) => {
    setIsLoading(true);
    try {
      // In a real application, this would be an API call
      // For now, we'll use sample data with a simulated delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setDailyContent({
        ...sampleContent,
        date: date.toISOString()
      });
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load content when date changes
  useEffect(() => {
    loadContent(currentDate);
  }, [currentDate]);

  // Function to go to a random day
  const goToRandomDay = () => {
    // Generate random date between Jan 1, 2023 and today
    const randomDate = getRandomDate('2023-01-01', new Date());
    setCurrentDate(randomDate);
  };

  // Function to go to a specific date
  const goToDate = (date) => {
    setCurrentDate(new Date(date));
  };

  // Function to go to the next day
  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    if (nextDay <= new Date()) {
      setCurrentDate(nextDay);
    }
  };

  // Function to go to the previous day
  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    const startDate = new Date('2023-01-01');
    if (previousDay >= startDate) {
      setCurrentDate(previousDay);
    }
  };

  // Create the context value object
  const contextValue = {
    currentDate,
    dailyContent,
    isLoading,
    goToRandomDay,
    goToDate,
    goToNextDay,
    goToPreviousDay
  };

  return (
    <DailyContentContext.Provider value={contextValue}>
      {children}
    </DailyContentContext.Provider>
  );
};

// Create a custom hook to use the daily content context
export const useDailyContent = () => {
  const context = useContext(DailyContentContext);
  if (!context) {
    throw new Error('useDailyContent must be used within a DailyContentProvider');
  }
  return context;
};

export default DailyContentContext;
