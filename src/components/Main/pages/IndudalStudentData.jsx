import React from "react";
import { Card, Button, Row, Col, Typography } from "antd";
import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import Title from "antd/es/skeleton/Title";
import { useNavigate } from "react-router-dom";

// OMR Answer Sheet Component
const OMRAnswerSheet = () => {
  // Dummy questions with options A, B, C, D
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["A. Paris", "B. Berlin", "C. Madrid", "D. Rome"],
    },
    {
      question: "Which programming language is used for web development?",
      options: ["A. Python", "B. JavaScript", "C. Java", "D. C++"],
    },
    {
      question: "Who discovered gravity?",
      options: [
        "A. Albert Einstein",
        "B. Isaac Newton",
        "C. Galileo",
        "D. Nikola Tesla",
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["A. Venus", "B. Mars", "C. Earth", "D. Jupiter"],
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "A. Atlantic Ocean",
        "B. Indian Ocean",
        "C. Southern Ocean",
        "D. Pacific Ocean",
      ],
    },
    {
      question: "What is the square root of 64?",
      options: ["A. 6", "B. 8", "C. 10", "D. 12"],
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["A. Oxygen", "B. Osmium", "C. Ozone", "D. Oganesson"],
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["A. China", "B. Japan", "C. South Korea", "D. Thailand"],
    },
    {
      question: "Who is known as the father of modern physics?",
      options: [
        "A. Albert Einstein",
        "B. Isaac Newton",
        "C. Niels Bohr",
        "D. Richard Feynman",
      ],
    },
    {
      question: "Which is the tallest mountain in the world?",
      options: [
        "A. Mount Kilimanjaro",
        "B. Mount Everest",
        "C. K2",
        "D. Mount Fuji",
      ],
    },
  ];

  return (
    <div className="mt-10">
      <Typography.Title level={3}>OMR Answer Sheet</Typography.Title>
      <div className="flex flex-col space-y-5">
        {questions.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="font-semibold">{`Q${index + 1}: ${item.question}`}</p>
            <div className="flex space-x-4">
              {item.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`question${index + 1}-option${optionIndex}`}
                    name={`question${index + 1}`}
                    value={option}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`question${index + 1}-option${optionIndex}`}
                    className="text-lg"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IndudalStudentData = () => {
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    studentId: "12345",
    age: 20,
    grade: "A",
  });
  let navegate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8">
        {/* Profile Card */}
        <Card
          className="w-full max-w-4xl flex flex-row items-center rounded-lg"
          cover={
            <img
              alt="student-avatar"
              src="https://via.placeholder.com/150" // Your image URL here
              className="w-48 h-48 object-cover"
              style={{ borderRadius: "0.5rem" }}
            />
          }
        >
          {/* Right side content (student data) */}
          <div className="ml-5">
            <Title level={3}>John Doe</Title>
            {/* <Text className="text-gray-600">Student ID: 12345</Text> */}

            {/* Basic Information */}
            <div className="mt-4 space-y-2">
              <div>
                <strong>Email:</strong> johndoe@example.com
              </div>
              <div>
                <strong>Age:</strong> 22
              </div>
              <div>
                <strong>Course:</strong> Computer Science
              </div>
              <div>
                <strong>Year:</strong> 3rd Year
              </div>
            </div>
          </div>
        </Card>

        {/* OMR Answer Sheet Section */}
        <OMRAnswerSheet />

        {/* Action Buttons */}
        <div className="mt-10 flex justify-between space-x-4">
          <Button
            type="default"
            size="large"
            onClick={() => navegate(`/layout/studentsList`)}
          >
            Back
          </Button>
          <Button type="primary" size="large">
            Submit Answers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndudalStudentData;
