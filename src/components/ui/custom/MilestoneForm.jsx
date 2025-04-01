import { useState } from "react";
import { Button } from "@/components/ui/button";

function MilestoneForm() {
  const [milestones, setMilestones] = useState([{ skill: "", milestone: "", progress: 0 }]);

  // Function to handle input changes
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMilestones = [...milestones];
    updatedMilestones[index][name] = value;
    setMilestones(updatedMilestones);
  };

  // Function to add a new milestone field
  const addMilestone = () => {
    setMilestones([...milestones, { skill: "", milestone: "", progress: 0 }]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Track Your Learning Progress</h2>

      <form className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        {milestones.map((entry, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-medium">Skill:</label>
            <input
              type="text"
              name="skill"
              value={entry.skill}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              placeholder="Enter a skill (e.g., JavaScript)"
            />

            <label className="block text-gray-700 font-medium mt-3">Milestone:</label>
            <input
              type="text"
              name="milestone"
              value={entry.milestone}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              placeholder="Enter a milestone (e.g., Complete JS Basics)"
            />

            <label className="block text-gray-700 font-medium mt-3">Progress:</label>
            <input
              type="number"
              name="progress"
              value={entry.progress}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-2 mt-1 border rounded-lg"
              placeholder="Progress in %"
            />
          </div>
        ))}

        <Button
          type="button"
          onClick={addMilestone}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          + Add Milestone
        </Button>

        <Button
          type="submit"
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Save Progress
        </Button>
      </form>
    </div>
  );
}

export default MilestoneForm;
