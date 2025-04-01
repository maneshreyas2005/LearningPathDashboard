import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AIModal from "@/services/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function UserInput() {
  const [formData, setFormData] = useState({
    goal: "",
    skills: [""],
    milestones: [""],
    experience: "",
  });

  const [user, setUser] = useState(null);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showRoadmapDialog, setShowRoadmapDialog] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false); // New state for AIModal

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Google Login function
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        setUser(userInfo.data);
        localStorage.setItem("user", JSON.stringify(userInfo.data));
        setShowSignInDialog(false);
        setShowRoadmapDialog(true);
      } catch (error) {
        console.error("Google login error:", error);
      }
    },
    onError: () => alert("Google login failed"),
  });

  // Handle input changes
  const handleChange = (index, type, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      updated[type][index] = value;
      return updated;
    });
  };

  // Handle adding new fields
  const addField = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ""],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowSignInDialog(true);
      return;
    }

    console.log("User Input Data:", formData);
    setShowRoadmapDialog(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setShowRoadmapDialog(false);
    setShowAIModal(true); // Show AIModal after dialog is closed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Your Personalized Learning Path
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Learning Goal Input */}
        <label className="block text-gray-700 font-medium">Your Learning Goal:</label>
        <input
          type="text"
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="w-full px-4 py-2 mt-1 border rounded-lg"
          placeholder="e.g., Become a Full Stack Developer"
        />

        {/* Skills Input */}
        <label className="block text-gray-700 font-medium mt-4">Skills to Learn:</label>
        {formData.skills.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => handleChange(index, "skills", e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg"
            placeholder="e.g., React, Node.js"
          />
        ))}
        <Button
          type="button"
          onClick={() => addField("skills")}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg w-full"
        >
          + Add Skill
        </Button>

        {/* Milestones Input */}
        <label className="block text-gray-700 font-medium mt-4">Learning Milestones:</label>
        {formData.milestones.map((milestone, index) => (
          <input
            key={index}
            type="text"
            value={milestone}
            onChange={(e) => handleChange(index, "milestones", e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg"
            placeholder="e.g., Complete React Basics"
          />
        ))}
        <Button
          type="button"
          onClick={() => addField("milestones")}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg w-full"
        >
          + Add Milestone
        </Button>

        {/* Experience Level Dropdown */}
        <label className="block text-gray-700 font-medium mt-4">Experience Level:</label>
        <select
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          className="w-full px-4 py-2 mt-1 border rounded-lg"
        >
          <option value="">Select Experience</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Generate Roadmap
        </Button>
      </form>

      {/* Sign-in Required Dialog */}
      <Dialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              You need to sign in with Google before generating a roadmap.
            </DialogDescription>
            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              onClick={googleLogin}
            >
              Sign in with Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Roadmap Generated Dialog */}
      <Dialog open={showRoadmapDialog} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Roadmap Generated</DialogTitle>
            <DialogDescription>
              Your personalized roadmap has been successfully created!
            </DialogDescription>
            <Button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              onClick={handleDialogClose}
            >
              View Roadmap
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* AI Modal */}
      {showAIModal && <AIModal data={formData} onClose={() => setShowAIModal(false)} />}
    </div>
  );
}

export default UserInput;