// Content generation utilities for Digital Nomad Daily

// Sample database of content
const contentDatabase = {
  quotes: [
    {
      text: "The world is a book and those who do not travel read only one page.",
      author: "St. Augustine"
    },
    {
      text: "Work is no longer a place you go, it's something you do.",
      author: "Digital Nomad Proverb"
    },
    {
      text: "The best time to start working remotely was 10 years ago. The second best time is now.",
      author: "Remote Work Wisdom"
    }
  ],
  
  books: [
    {
      title: "Remote: Office Not Required",
      authors: "Jason Fried & DHH",
      coverImage: "/images/remote-book.jpg",
      amazonLink: "https://amazon.com/...", // Your affiliate link
      summary: "The ultimate guide to running a remote team from the founders of Basecamp."
    },
    {
      title: "Digital Nomad Handbook",
      authors: "Dave Cook",
      coverImage: "/images/nomad-handbook.jpg",
      amazonLink: "https://amazon.com/...", // Your affiliate link
      summary: "Everything you need to know about living and working as a digital nomad."
    }
  ],

  podcasts: [
    {
      title: "Digital Nomad Stories - Episode 127",
      showName: "The Built Different Podcast",
      description: "How this developer built a 6-figure freelance business while traveling through Southeast Asia.",
      duration: "45 minutes",
      link: "https://podcast-url..."
    },
    {
      title: "Remote Work Revolution - Episode 89",
      showName: "Future of Work",
      description: "Top companies share their remote-first culture strategies.",
      duration: "38 minutes",
      link: "https://podcast-url..."
    }
  ],

  remoteJobs: [
    {
      title: "Senior Frontend Developer",
      company: "Automattic",
      salary: "$120k-150k",
      description: "Join our distributed team building the future of the web.",
      link: "https://job-board-url..."
    },
    {
      title: "Digital Marketing Manager",
      company: "Buffer",
      salary: "$85k-110k",
      description: "Lead our marketing initiatives from anywhere in the world.",
      link: "https://job-board-url..."
    }
  ],

  marketingTips: [
    {
      title: "LinkedIn Content Strategy",
      description: "Boost your personal brand with carousel posts - they're getting 3x more engagement than regular posts.",
      link: "https://tip-url..."
    },
    {
      title: "Email Marketing for Freelancers",
      description: "How to build and nurture your client newsletter for consistent income.",
      link: "https://tip-url..."
    }
  ],

  videos: [
    {
      title: "Digital Nomad Morning Routine in Bali",
      description: "A day in the life of a successful remote developer balancing work and island life.",
      duration: "12:34",
      link: "https://video-url..."
    },
    {
      title: "Setup Your Remote Office Anywhere",
      description: "Essential gear and tips for staying productive while working from anywhere.",
      duration: "15:45",
      link: "https://video-url..."
    }
  ]
};

/**
 * Generate pseudo-random but consistent content for a specific date
 * @param {Date} date - The date to generate content for
 * @returns {Object} Generated content for the day
 */
export const generateDailyContent = (date) => {
  // Use the date to create a consistent seed for content selection
  const seed = date.getDate() + (date.getMonth() * 31) + (date.getFullYear() * 372);
  
  // Helper function to get a consistent random item from an array
  const getSeededItem = (array) => {
    const index = seed % array.length;
    return array[index];
  };

  return {
    date: date.toISOString(),
    wanderlustQuote: getSeededItem(contentDatabase.quotes),
    bookOfDay: getSeededItem(contentDatabase.books),
    podcastEpisode: getSeededItem(contentDatabase.podcasts),
    remoteJob: getSeededItem(contentDatabase.remoteJobs),
    marketingTip: getSeededItem(contentDatabase.marketingTips),
    videoOfDay: getSeededItem(contentDatabase.videos)
  };
};

/**
 * Get content for a specific category
 * @param {string} category - Content category (quotes, books, podcasts, etc.)
 * @returns {Array} All content for the category
 */
export const getCategoryContent = (category) => {
  return contentDatabase[category] || [];
};

/**
 * Search content across all categories
 * @param {string} query - Search query
 * @returns {Object} Matching content grouped by category
 */
export const searchContent = (query) => {
  const searchTerms = query.toLowerCase().split(' ');
  
  return Object.entries(contentDatabase).reduce((results, [category, items]) => {
    const matches = items.filter(item => 
      searchTerms.some(term =>
        JSON.stringify(item).toLowerCase().includes(term)
      )
    );
    
    if (matches.length > 0) {
      results[category] = matches;
    }
    
    return results;
  }, {});
};

/**
 * Generate content for a week
 * @param {Date} startDate - Start date of the week
 * @returns {Array} Array of daily content for the week
 */
export const generateWeeklyContent = (startDate) => {
  const weekContent = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    weekContent.push(generateDailyContent(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekContent;
};

export default {
  generateDailyContent,
  getCategoryContent,
  searchContent,
  generateWeeklyContent
};
