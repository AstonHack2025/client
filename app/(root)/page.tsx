"use client"; // Add this line at the top
// All imports for components and libraries
import Magic from "@/components/shared/magic";
import { Navbar } from "@/components/shared/navbar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
type Checked = DropdownMenuCheckboxItemProps["checked"];
import courseCategories from "@/constants/courses";
import { useCurrentUser } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import updateCoursesStatus from "@/lib/actions/courses/updateCoursesStatus";
import { ICourse } from "@/lib/models/types";


export default function Home() {
    const user = useCurrentUser(); // Get the current user (if signed in)
    const router = useRouter();

    // state variables for search, completed courses and dropdown menu state
    const [search, setSearch] = useState<string>("");
    const [completedCourses, setCompletedCourses] = useState<string[]>(user?.coursesStatus?.map((course: ICourse) => course.id) || []);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0); // get the score of the user

    useEffect(() => {
        if (user) updateCoursesStatus(completedCourses); // update the course completion status and we dont need to wait for the response since we're using a local state to store the data, but we need it if the user does a hard refresh so it loads data from the db
    }, [completedCourses]); // useEffect to update the completed courses

    // function to handle the click event on completed courses
    const handleClick = (category: string, index: number) => {
        const key = `${category}-${courseCategories[category][index].name}`; // gives each course a unique key
        if (!user) return router.push("/signin"); // if user is not signed in, redirect to sign in page
        setCompletedCourses((prev) => {
            setScore(prev.includes(key) ? score - 1 : score + 1); // update the score based on the course completion status
            return prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key];
        });
    };
    // variables to show/hide courses based on difficulty
    const [showBeginnerCourses, setshowBeginnerCourses] = React.useState<Checked>(true);
    const [showIntermediateCourses, setshowIntermediateCourses] = React.useState<Checked>(true);
    const [showAdvancedCourses, setshowAdvancedCourses] = React.useState<Checked>(true);

    // function to calculate the levenshtein distance between two strings
    const levenshteinDistance = (a: string, b: string) => {
        //Create a matrix of size a.length + 1 and b.length + 1
        //Initialize the first row and column with the index values
        const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
            Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
        );

        //Iterate through the matrix and calculate the minimum distance
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                if (a[i - 1] === b[j - 1]) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j - 1] + 1
                    );
                }
            }
        }
        
        //Return the value at the last index of the matrix
        return matrix[a.length][b.length];
    };

    // function to check if the search query matches the course
    const matchesSearch = (courseName: string, searchQuery: string) => {
        const courseWords = courseName.toLowerCase().split(" ");
        const searchWords = searchQuery.toLowerCase().split(" ");
        return searchWords.every(searchWord =>
            courseWords.some(courseWord => levenshteinDistance(courseWord, searchWord) <=3));
    };

    return (
        <>
            <Navbar score={score} /> {/* calls Navbar component */}
            <div className="min-h-screen p-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">IBM Skills Build Dashboard</h1> {/* Heading for the Page*/}
                <div className="flex flex-row">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // update search state
                        className="w-full max-w-md p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 mr-4 dark:bg-gray-800 dark:text-white"
                        style={{ width: "500px" }}
                    />

                    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                        {" "}
                        {/* Dropdown menu for course difficulty */}
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border border-gray-300 dark:border-gray-700 ml-4" style={{ width: "140px", height: "50px" }}>
                                Course Difficulty
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuCheckboxItem
                                checked={showBeginnerCourses}
                                onCheckedChange={setshowBeginnerCourses} // Toggle showing the beginner courses
                                className="text-green-500 font-bold"
                                onSelect={(e) => e.preventDefault()}
                            >
                                Beginner
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showIntermediateCourses}
                                onCheckedChange={setshowIntermediateCourses} // Toggle showing the intermediate courses
                                className="text-amber-500 font-bold"
                                onSelect={(e) => e.preventDefault()}
                            >
                                Intermediate
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showAdvancedCourses}
                                onCheckedChange={setshowAdvancedCourses} // Toggle showing the advanced courses
                                className="text-red-500 font-bold"
                                onSelect={(e) => e.preventDefault()}
                            >
                                Advanced
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {Object.entries(courseCategories).map(([category, courses]) => {
                    // filter courses based on search query and difficulty
                    const filteredCourses = courses.filter((course) => {
                        return (
                            (search === "" || matchesSearch(course.name, search) || matchesSearch(category, search)) &&
                            ((course.difficulty === "Beginner" && showBeginnerCourses) || (course.difficulty === "Intermediate" && showIntermediateCourses) || (course.difficulty === "Advanced" && showAdvancedCourses))
                        );
                    });
                    // sort courses based on difficulty

                    const sortedCourses = filteredCourses.sort((a, b) => {
                        const difficultyOrder = ["Beginner", "Intermediate", "Advanced"];
                        return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
                    });

                    if (sortedCourses.length === 0) return null; // if no courses match the search query, return null

                    return (
                        <motion.div
                            key={category}
                            className="w-full max-w-6x2 mb-8" // Animation for the course cards
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">{category}</h2> {/* Heading for the category of the courses*/}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {sortedCourses.map((course, index) => (
                                    <>
                                        <motion.div
                                            key={index} // Animation for the course cards
                                            className={`p-6 border-2 border-whitegrey shadow-lg rounded-lg transition flex flex-col justify-between h-full 
                                            ${course.difficulty === "Beginner" ? "hover:shadow-green-500" : ""} 
                                            ${course.difficulty === "Intermediate" ? "hover:shadow-amber-500" : ""} 
                                            ${course.difficulty === "Advanced" ? "hover:shadow-red-500" : ""}`}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
                                            viewport={{ once: true }}
                                        >
                                            {/* Display Badge for course difficulty */}
                                            {course.difficulty === "Beginner" && (
                                                <span>
                                                    <p className="absolute text-black px-2 p-[5px] rounded-xl font-bold bg-emerald-500 mt-[-35px] ml-[-40px] dark:text-white">Beginner</p>
                                                </span>
                                            )}
                                            {course.difficulty === "Intermediate" && (
                                                <span>
                                                    <p className="absolute text-black px-2 p-[5px] rounded-xl font-bold bg-amber-500 mt-[-35px] ml-[-40px] dark:text-white">Intermediate</p>
                                                </span>
                                            )}
                                            {course.difficulty === "Advanced" && (
                                                <span>
                                                    <p className="absolute text-black px-2 p-[5px] rounded-xl font-bold bg-red-500 mt-[-35px] ml-[-40px] dark:text-white">Advanced</p>
                                                </span>
                                            )}
                                            <h3 className="text-lg font-semibold mt-3">{course.name}</h3> {/* Course name */}
                                            <div className="flex justify-between items-center mt-4">
                                                <a // Link to access the course
                                                    href={course.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                                >
                                                    Access Course
                                                </a>
                                                <Magic
                                                    complete={completedCourses.includes(`${category}-${courseCategories[category][index].name}`)} // Check if the course is completed
                                                    onToggle={() => handleClick(category, index)} // Toggle the course completion status
                                                />
                                            </div>
                                        </motion.div>
                                    </>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </>
    );
}
