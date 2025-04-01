import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const AiModal = ({ data, onClose }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goal = data?.goal || "Not specified";
  const experience = data?.experience || "Not specified";
  const skills = data?.skills || [];
  const milestones = data?.milestones || [];

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = `
          Act as an expert learning path generator and career mentor. 
          Based on the user's submitted details, generate a structured AI-powered learning roadmap 
          that helps the user achieve their goal efficiently.
    
          ### User Details:
          - Goal: ${goal}
          - Skills to Learn: ${skills.join(", ")}
          - Learning Milestones: ${milestones.join(", ")}
          - Experience Level: ${experience}
    
          ### Roadmap Requirements:
          1. Step-by-step learning path breaking down each skill into smaller steps.
          2. Estimated time durations for each step.
          3. Resources & recommendations (courses, books, documentation).
          4. Project-based approach with practical exercises.
          5. Difficulty progression from beginner to advanced.
          6. Assessment checkpoints to track progress.
    
          ### Response Format:
          - **Return ONLY a valid JSON object** with NO extra text, headers, or explanations.
          - **Do not add any Markdown code blocks or "json" annotations.**
          - Ensure the JSON follows this structure:
    
          {
            "nodes": [
              { "id": "1", "position": { "x": 0, "y": 0 }, "data": { "label": "Start" } },
              { "id": "2", "position": { "x": 200, "y": 100 }, "data": { "label": "Skill 1" } },
              { "id": "3", "position": { "x": 400, "y": 200 }, "data": { "label": "Skill 2" } }
            ],
            "edges": [
              { "id": "e1-2", "source": "1", "target": "2", "animated": true },
              { "id": "e2-3", "source": "2", "target": "3", "animated": true }
            ]
          }
        `;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
    
        // Extract JSON using regex
        const jsonMatch = text.match(/\{[\s\S]*\}/); // Finds the first JSON object
    
        if (!jsonMatch) {
          throw new Error("Failed to extract JSON from response");
        }
    
        const jsonData = JSON.parse(jsonMatch[0]); // Parse only the JSON part
    
        setNodes(jsonData.nodes);
        setEdges(jsonData.edges);
      } catch (err) {
        console.error("Error generating roadmap:", err);
        setError("Failed to generate roadmap. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    

    generateRoadmap();
  }, [data]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">AI Learning Path</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Generating your personalized roadmap...</p>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="mb-6">
              <p><strong>Goal:</strong> {goal}</p>
              <p><strong>Experience Level:</strong> {experience}</p>

              <h3 className="font-semibold mt-2">Skills to Learn:</h3>
              <ul className="list-disc ml-6">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <h3 className="font-semibold mt-2">Milestones:</h3>
              <ul className="list-disc ml-6">
                {milestones.map((milestone, index) => (
                  <li key={index}>{milestone}</li>
                ))}
              </ul>
            </div>

            {/* React Flow Component */}
            <div className="border-t pt-4 h-[400px]">
              <h3 className="text-lg font-semibold mb-2">Generated Roadmap:</h3>
              <div className="w-full h-full border rounded-lg">
                <ReactFlow nodes={nodes} edges={edges} fitView>
                  <Background />
                  <Controls />
                </ReactFlow>
              </div>
            </div>
          </>
        )}

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AiModal;
