"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to the next functionality page
    router.push("/more-functionality");
  };

  return (
    <div className="min-h-screen">
      {/* Nav Bar */}
      {/* <nav className="bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-bold text-xl">Student Buddy</div>
          <div>
            <ul className="flex space-x-4">
              <li className="cursor-pointer">Dashboard</li>
              <li className="cursor-pointer">Profile</li>
              <li className="cursor-pointer">Settings</li>
            </ul>
          </div>
        </div>
      </nav> */}
      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-black-3xl font-bold mb-4">Welcome to Your Student Buddy</h1>
        <p className="mb-6 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          tincidunt vestibulum ligula, eu varius nunc cursus a. Nulla facilisi.
          Pellentesque tempor ipsum quis vulputate pretium. Sed porta, nisl at
          volutpat gravida, velit sapien euismod ligula, ut gravida purus nisi eu
          risus.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Connect Now
        </button>
      </main>
    </div>
  );
}