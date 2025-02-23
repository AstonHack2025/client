"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TOPICS = [
  "Operating Systems",
  "Databases",
  "Logic",
  "Algorithms",
  "Data Structures",
];
const PURPOSES = [
  "Exam Prep",
  "Revision",
  "Learning New Material",
  "Mentoring",
  "Advice",
];
const DURATIONS = ["30 min", "1 hour", "2 hours"];

export default function Dashboard() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleToggle = (
    option: string,
    list: string[],
    setter: (value: string[]) => void
  ) => {
    if (list.includes(option)) {
      setter(list.filter((item) => item !== option));
    } else {
      setter([...list, option]);
    }
  };

  const handlePurposeToggle = (purpose: string) => {
    setSelectedPurpose((prev) => (prev === purpose ? null : purpose));
  };

  const handleDurationToggle = (duration: string) => {
    setSelectedDuration((prev) => (prev === duration ? null : duration));
  };

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handleSubmitOptions = () => {
    console.log("Selected Topics:", selectedTopics);
    console.log("Selected Purpose:", selectedPurpose);
    console.log("Selected Duration:", selectedDuration);
    setShowModal(false);

    router.push("/chat");
  };

  return (

    // Apply theme class to the root container
    <div className={`${theme === "dark" ? "dark" : ""} `}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">

        {/* Main Content */}
        <main className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Your Study Buddy</h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Get connected with a study buddy to help you with your studies. Select
            your topics, purpose of study.
            Find the perfect student study partner to help you with your studies.
            Either with exam prep, revision, learning new material, mentoring, or advice.
            Want to learn by Teaching others or learn from others much more experienced? Just Connect.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Connect Now
          </button>
        </main>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-lg p-6">
              <h2 className="text-xl font-bold mb-4">Customize Your Study Session</h2>

              {/* Topics Selection */}
              <div className="mb-4">
                <p className="mb-2 font-semibold">Select Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((topic) => (
                    <button
                      key={topic}
                      onClick={() =>
                        handleToggle(topic, selectedTopics, setSelectedTopics)
                      }
                      className={`px-3 py-1 rounded border ${
                        selectedTopics.includes(topic)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-700 border-gray-300"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purpose Selection */}
              <div className="mb-4">
                <p className="mb-2 font-semibold">Purpose of Study:</p>
                <div className="flex flex-wrap gap-2">
                  {PURPOSES.map((purpose) => (
                    <button
                      key={purpose}
                      onClick={() => handlePurposeToggle(purpose)}
                      className={`px-3 py-1 rounded border ${
                        selectedPurpose === purpose
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-700 border-gray-300"
                      }`}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="mb-6">
                <p className="mb-2 font-semibold">Select Duration:</p>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => handleDurationToggle(duration)}
                      className={`px-3 py-1 rounded border ${
                        selectedDuration === duration
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-700 border-gray-300"
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitOptions}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}