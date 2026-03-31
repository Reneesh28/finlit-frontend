import { PathNode } from "./PathNode";
import { PathConnector } from "./PathConnector";

export const LearningPath = ({ lessons = [], onNodeClick }) => {
  return (
    <div className="flex flex-col items-center py-12 space-y-0 relative max-w-md mx-auto">
      {lessons.map((lesson, index) => {
        // Calculate zig-zag offset: -40, 0, 40, 0, ...
        // Using a cosine-based offset for a smoother "S" curve effect
        const offset = Math.sin(index * 1.2) * 50; 
        const nextLesson = lessons[index + 1];

        return (
          <div key={lesson.id} className="flex flex-col items-center">
            {/* The Node */}
            <div 
               className="transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(${offset}px)` }}
            >
              <PathNode 
                {...lesson} 
                index={index + 1}
                onClick={() => onNodeClick(lesson)}
              />
            </div>

            {/* The Connector (if not the last node) */}
            {nextLesson && (
              <PathConnector 
                 status={lesson.status} 
                 offset={offset * 0.5} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
