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
      options: ["Paris", "Berlin", "Madrid", "Rome"],
    },
    {
      question: "Which programming language is used for web development?",
      options: ["Python", "JavaScript", "Java", "C++"],
    },
    {
      question: "Who discovered gravity?",
      options: ["Albert Einstein", "Isaac Newton", "Galileo", "Nikola Tesla"],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Earth", "Jupiter"],
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Southern Ocean",
        "Pacific Ocean",
      ],
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "8", "10", "12"],
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Thailand"],
    },
    {
      question: "Who is known as the father of modern physics?",
      options: [
        "Albert Einstein",
        "Isaac Newton",
        "Niels Bohr",
        "Richard Feynman",
      ],
    },
    {
      question: "Which is the tallest mountain in the world?",
      options: ["Mount Kilimanjaro", "Mount Everest", "K2", "Mount Fuji"],
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
                    className="text-lg xs:text-sm my-1"
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
      <div className="w-full max-w-4xl p-8 xs:p-0">
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
            {/* Basic Information */}
            <div className="mt-4 space-y-2">
              <div>
                <strong>Name:</strong> Test
              </div>
              <div>
                <strong>Email:</strong> test@example.com
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
