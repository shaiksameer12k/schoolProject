import React, { useEffect, useState } from "react";
import CustomCard from "../../../reusable/Card/CustomCard";
import { Col, Divider, Grid, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../reusable/Button/ButtonComponent";
import DynamicIcon from "../../../reusable/IconComponent/IconComponent";
import ModalComponent from "../../../reusable/ModelComponent/ModelComponent";
import InputField from "../../../reusable/InputField/InputField";
import FileUpload from "../../../reusable/FileUpload/FileUpload";
const { useBreakpoint } = Grid;

const OMRAnswerSheet = ({
  selectedData,
  openModelHandel,
  openEditQuestionModelHandel,
}) => {
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
  const screen = useBreakpoint();
  return (
    <div className="mt-1">
      <div className="flex justify-between items-center ">
        <Typography.Title level={screen.xs ? 5 : 4}>
          OMR Answer Sheet Of{" "}
          <span className="text-red-700 text-3xl xs:text-2xl"> {selectedData} </span>
        </Typography.Title>

        <ButtonComponent
          name="Upload"
          size="middle"
          btnStyle={{ width: "auto" }}
          icon="FaCloudUploadAlt"
          onClick={openModelHandel}
        />
      </div>
      <div className="flex flex-col space-y-5">
        {questions.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="font-semibold flex items-center gap-2">
              {`Q${index + 1}: ${item.question}`}{" "}
              <DynamicIcon
                iconName="FaEdit"
                color="#1ca0dc"
                size={18}
                className="cursor-pointer"
                iconTooltipTitle="Click To Edit"
                onClickHandel={() => openEditQuestionModelHandel(item)}
              />
            </p>
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
const Uploads = () => {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState("");
  const [cardsData, setCardsData] = useState([]);
  const [isUploadModel, setIsUploadModel] = useState(false);
  const [isEditUploadModel, setIsEditUploadModel] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    A: "",
    B: "",
    C: "",
    D: "",
  });

  const onClickHandel = (CardName) => {
    setSelectedData(CardName);
    let updateArr = cardsData.map((item) =>
      item?.cardName === CardName
        ? { ...item, cardColor: "#fb7f7f" }
        : { ...item, cardColor: "#ffffff" }
    );
    setCardsData(updateArr);
  };

  useEffect(() => {
    setCardsData([
      {
        cardId: 1,

        cardName: "SSLC",
        cardColor: "#fb7f7f",
      },

      {
        cardId: 2,
        cardName: "PUC",

        cardColor: "#ffffff",
        //   cardColor: "#709cff",
      },
      {
        cardId: 3,

        cardName: "Degree",
        cardColor: "#ffffff",
        //   cardColor: "#21DC71",
      },
    ]);
    setSelectedData("SSLC");
  }, []);

  const openModelHandel = () => {
    setIsUploadModel(true);
  };
  const closeModelHandel = () => {
    setIsUploadModel(false);
  };
  //   edit
  let alpha = ["A", "B", "C", "D"];

  const openEditQuestionModelHandel = (data) => {
    setIsEditUploadModel(true);
    let question = data?.question;
    const updatedQuestion = data?.options.reduce((acc, item, i) => {
      acc[alpha[i]] = item;
      return acc;
    }, {});

    setSelectedQuestion({
      question: question,
      A: updatedQuestion?.A,
      B: updatedQuestion?.B,
      C: updatedQuestion?.C,
      D: updatedQuestion?.D,
    });

    console.log("data", data);
  };

  const closeEditQuestionModelHandel = () => {
    setIsEditUploadModel(false);
  };

  const screens = useBreakpoint();
  console.log("screens", screens);

  const onChangeHandel = (e) => {
    let { name, value } = e.target;
    setSelectedQuestion({ ...selectedQuestion, [name]: value });
  };

  console.log("selectedQuestion", selectedQuestion);
  return (
    <div>
      <Row gutter={[8, 8]}>
        {cardsData?.map((card) => (
          <Col xs={8} sm={12} md={12} lg={4}>
            <CustomCard
              key={card?.cardId}
              cardName={card?.cardName}
              cardIcon={card?.cardIcon}
              cardColor={card?.cardColor}
              totalCount={card?.totalCount}
              complitedCount={card?.complitedCount}
              onClickHandel={onClickHandel}
              selectedData={selectedData}
            />
          </Col>
        ))}
      </Row>

      <Divider />

      <OMRAnswerSheet
        selectedData={selectedData}
        openModelHandel={openModelHandel}
        openEditQuestionModelHandel={openEditQuestionModelHandel}
      />

      <ModalComponent
        title="Bulk Upload"
        isModalOpen={isUploadModel}
        content={
          <div className="flex justify-center items-center">
            <FileUpload />
          </div>
        }
        okText="Submit"
        handleCancel={closeModelHandel}
        okButtonProps={{ style: { backgroundColor: "#FF8383" } }}
      />

      <ModalComponent
        title="Edit Question"
        isModalOpen={isEditUploadModel}
        content={
          <>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                <InputField
                  type="text"
                  isError=""
                  isFieldVisible={true}
                  placeholder="Enter Question"
                  value={selectedQuestion?.question}
                  name="question"
                  onChange={onChangeHandel}
                />
              </Col>
              <Col className="gutter-row" span={screens?.xs ? 24 : 6}>
                <InputField
                  type="text"
                  isError=""
                  isFieldVisible={true}
                  placeholder="Option A"
                  value={selectedQuestion?.A}
                  name="A"
                  onChange={onChangeHandel}
                />
              </Col>
              <Col className="gutter-row" span={screens?.xs ? 24 : 6}>
                <InputField
                  type="text"
                  isError=""
                  isFieldVisible={true}
                  placeholder="Option B"
                  value={selectedQuestion?.B}
                  name="B"
                  onChange={onChangeHandel}
                />
              </Col>
              <Col className="gutter-row" span={screens?.xs ? 24 : 6}>
                <InputField
                  type="text"
                  isError=""
                  isFieldVisible={true}
                  placeholder="Option C"
                  value={selectedQuestion?.C}
                  name="C"
                  onChange={onChangeHandel}
                />
              </Col>
              <Col className="gutter-row" span={screens?.xs ? 24 : 6}>
                <InputField
                  type="text"
                  isError=""
                  isFieldVisible={true}
                  placeholder="Option D"
                  value={selectedQuestion?.D}
                  name="D"
                  onChange={onChangeHandel}
                />
              </Col>
            </Row>
          </>
        }
        okText="Submit"
        handleCancel={closeEditQuestionModelHandel}
        okButtonProps={{ style: { backgroundColor: "#FF8383" } }}
      />
    </div>
  );
};

export default Uploads;
