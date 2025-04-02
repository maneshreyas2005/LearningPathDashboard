import React from 'react';
import { Lock, CheckCircle } from 'lucide-react';

export default function TopicCard({ topic, onSelectSubtopic }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{topic.title}</h2>
        <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {topic.progress}% Complete
        </div>
      </div>
      <p className="text-gray-600 mb-4">{topic.description}</p>
      
      <div className="space-y-3">
        {topic.subtopics.map((subtopic) => (
          <div
            key={subtopic.id}
            onClick={() => !subtopic.locked && onSelectSubtopic(topic.id, subtopic)}
            className={`flex items-center justify-between p-3 rounded-lg border 
              ${subtopic.locked 
                ? 'bg-gray-50 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-50 cursor-pointer'}`}
          >
            <div className="flex items-center space-x-3">
              {subtopic.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : subtopic.locked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
              )}
              <div>
                <h3 className="font-medium text-gray-800">{subtopic.title}</h3>
                <p className="text-sm text-gray-500">{subtopic.description}</p>
              </div>
            </div>
            {subtopic.quizScore !== null && (
              <div className="text-sm font-medium">
                Score: {subtopic.quizScore}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}