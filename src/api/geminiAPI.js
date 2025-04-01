import axios from "axios";

const API_KEY = import.meta.VITE_GOOGLE_GEMINI_API_KEY; // Replace with your API key
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText";

export const generateRoadmap = async (userInput) => {
  const prompt = `
  Act as an expert learning path generator and career mentor. Based on the user's submitted details, generate a structured and AI-powered **learning roadmap** that helps the user achieve their goal efficiently.

  ### **User Details:**
  - **Goal:** ${userInput.goal}
  - **Skills to Learn:** ${userInput.skills.join(", ")}
  - **Learning Milestones:** ${userInput.milestones.join(", ")}
  - **Experience Level:** ${userInput.experience}

  ### **Roadmap Requirements:**
  1. **Step-by-step learning path** breaking down each skill into smaller, actionable steps.
  2. **Estimated time durations** for each step.
  3. **Resources & recommendations** (courses, books, documentation, projects, and practical exercises).
  4. **Project-based approach** to ensure hands-on experience.
  5. **Difficulty progression** from beginner-friendly to advanced topics.
  6. **Assessment checkpoints** to track progress.

  ### **Output Format Example:**
  - **Phase 1:** React Basics - Overview, Learning Sources, Duration, Practice Project  
  - **Phase 2:** Node.js & Express.js - Overview, Learning Sources, Duration, Mini-Project  
  - **Phase 3:** MongoDB - Deep Dive, Real-World Project  
  - **Final Phase:** Capstone Project & Career Guidance  

  Generate the roadmap in a structured **markdown format** so it is easy to read and follow.
  `;

  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    return response.data.candidates[0].output;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return "Failed to generate roadmap. Please try again.";
  }
};
