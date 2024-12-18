import React, { useState } from "react";

import fields from "./data/formData";
import InputField from "./reusable/InputField/InputField";
import ButtonComponent from "./reusable/Button/ButtonComponent";
import { CloudUploadOutlined } from "@ant-design/icons";
import ModalComponent from "./reusable/ModelComponent/ModelComponent";
import { showNotification } from "./reusable/Notification/NotificationComponent";
import { Button, message, Tooltip } from "antd";
import PopconfirmComponent from "./reusable/PopconfirmComponent/PopconfirmComponent";
import BasicSkeleton from "./reusable/Skeleton/BasicSkeleton";
import LoaderComponent from "./reusable/Loading/LoadingComponent";
import { CustomTooltip } from "./reusable/CustomToolTip/CustomToolTip";
import DraggableTable from "./dnd/DraggableTable";
import DynamicDataTable from "./reusable/DynamicDataTable/DynamicDataTable";

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { Draggable } from "./dnd/Draggable"; // Custom Draggable component
import { Droppable } from "./dnd/Droppable"; // Custom Droppable component
import { Col, Row } from "antd";
import { HolderOutlined, StepForwardOutlined } from "@ant-design/icons";
const App = () => {
  const handleFinish = (values) => {
    console.log("Form Submitted: ", values);
  };

  const handleFinishFailed = (errorInfo) => {
    console.log("Form Submission Failed: ", errorInfo);
  };

  const handleValuesChange = (e) => {
    console.log("Changed Values: ", e.target.value);
  };
  console.log("formData", fields);

  const [fieldData, setFieldData] = useState(fields);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const containers = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
    "Section 6",
    "Section 7",
    "Section 8",
  ];
  const [cards, setCards] = useState([
    { id: "card1", title: "Card 1", section: "Section 1" },
    { id: "card2", title: "Card 2", section: "Section 2" },
    { id: "card3", title: "Card 3", section: "Section 3" },
  ]);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    let draggItem = cards.find((card) => card.id === active?.id);

    if (!over) {
      message.error("Card was not dropped in a valid area");
      return;
    }

    if (over) {
      let updateCardData = cards
        .map((card) =>
          card.section === over.id
            ? { ...card, section: draggItem?.section }
            : card
        )
        .map((card) =>
          card.id === active.id ? { ...card, section: over.id } : card
        );
      console.log("updateCardData", updateCardData);
      // Update the section of the dragged card
      setCards(updateCardData);
    }
  };

  console.log("handleDragEnd cards**", cards);
  const pointerSensor = useSensor(PointerSensor);
  const sensors = useSensors(pointerSensor);

  return (
    <>
      {/* {fieldData?.map((field) => (
        <InputField
          formItemProps={field}
          onChange={handleValuesChange}
          onSearch={handleValuesChange}
        />
      ))} */}
      {/* <ButtonComponent
        name="Sumbit"
        type="primary"
        size="small"
        disabled={false}
        loading={false}
        icon={<CloudUploadOutlined />}
        iconPosition="end"
      /> */}

      {/* <ButtonComponent
        name="Open Model"
        type="primary"
        size="small"
        disabled={false}
        loading={false}
        icon={<CloudUploadOutlined />}
        iconPosition="end"
        onClick={showModal}
      /> */}

      {/* <ModalComponent
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title="Basic Modal"
        content={
          <>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </>
        }
        footer={false}

        // Add any additional props here
      /> */}

      {/* <Button
        onClick={() =>
          showNotification({
            type: "error",
            message: "Success!",
            description: "This is a success notification.",
          })
        }
      >
        Success
      </Button> */}

      {/* <PopconfirmComponent
        title="Delete Task"
        description="Are you sure you want to delete this task?"
        onConfirm={() => message.success("Task deleted")}
        onCancel={() => message.error("Delete action canceled")}
        okText="Yes"
        cancelText="No"
        content={<>hello</>}
      /> */}

      {/* <BasicSkeleton loading={true} /> */}
      {/* <LoaderComponent loading={true} showPercent={false} fullscreen={true}/> */}
      {/* <LoaderComponent loading={true} showPercent={false} /> */}

      {/* <CustomTooltip
        title="This is a custom tooltip"
        placement="topRight"
        trigger="hover"
      >
        <Button>Hover over me</Button>
      </CustomTooltip> */}

      <DraggableTable />
      <DynamicDataTable />

      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <HolderOutlined />
        {/* Ant Design Grid System */}
        <Row gutter={[16, 16]}>
          {containers.map((containerId) => (
            <Col
              key={containerId}
              xs={24} // Full width on extra small screens
              sm={12} // Half width on small screens
              md={8} // 1/3 width on medium screens
              lg={6} // 1/4 width on large screens
              xl={4} // 1/6 width on extra large screens
              className="gutter-row"
            >
              <Droppable id={containerId}>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{containerId}</h3>
                  {cards
                    .filter((card) => card.section === containerId)
                    .map((card) => (
                      <div className="flex gap-2">
                        <Draggable key={card.id} id={card.id}>
                          <div>
                            <HolderOutlined />
                          </div>
                        </Draggable>
                        <div className="bg-blue-500 text-white p-4 rounded shadow">
                          {card.title}
                        </div>
                      </div>
                    ))}
                </div>
              </Droppable>
            </Col>
          ))}
        </Row>
      </DndContext>
    </>
  );
};

// import React, { useState } from "react";
// import {
//   DndContext,
//   useSensor,
//   useSensors,
//   PointerSensor,
// } from "@dnd-kit/core";
// import { Draggable } from "./dnd/Draggable"; // Custom Draggable component
// import { Droppable } from "./dnd/Droppable"; // Custom Droppable component
// import { Col, message, Row } from "antd";
// import { HolderOutlined, StepForwardOutlined } from "@ant-design/icons";

// function App() {
  // const containers = [
  //   "Section 1",
  //   "Section 2",
  //   "Section 3",
  //   "Section 4",
  //   "Section 5",
  //   "Section 6",
  //   "Section 7",
  //   "Section 8",
  // ];
  // const [cards, setCards] = useState([
  //   { id: "card1", title: "Card 1", section: "Section 1" },
  //   { id: "card2", title: "Card 2", section: "Section 2" },
  //   { id: "card3", title: "Card 3", section: "Section 3" },
  // ]);

  // const handleDragEnd = (event) => {
  //   const { over, active } = event;
  //   let draggItem = cards.find((card) => card.id === active?.id);

  //   if (!over) {
  //     message.error("Card was not dropped in a valid area");
  //     return;
  //   }

  //   if (over) {
  //     let updateCardData = cards
  //       .map((card) =>
  //         card.section === over.id
  //           ? { ...card, section: draggItem?.section }
  //           : card
  //       )
  //       .map((card) =>
  //         card.id === active.id ? { ...card, section: over.id } : card
  //       );
  //     console.log("updateCardData", updateCardData);
  //     // Update the section of the dragged card
  //     setCards(updateCardData);
  //   }
  // };

  // console.log("handleDragEnd cards**", cards);
  // const pointerSensor = useSensor(PointerSensor);
  // const sensors = useSensors(pointerSensor);

//   return (
//     <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
//       <HolderOutlined />
//       {/* Ant Design Grid System */}
//       <Row gutter={[16, 16]}>
//         {containers.map((containerId) => (
//           <Col
//             key={containerId}
//             xs={24} // Full width on extra small screens
//             sm={12} // Half width on small screens
//             md={8} // 1/3 width on medium screens
//             lg={6} // 1/4 width on large screens
//             xl={4} // 1/6 width on extra large screens
//             className="gutter-row"
//           >
//             <Droppable id={containerId}>
//               <div className="space-y-2">
//                 <h3 className="text-xl font-semibold">{containerId}</h3>
//                 {cards
//                   .filter((card) => card.section === containerId)
//                   .map((card) => (
//                     <div className="flex gap-2">
//                       <Draggable key={card.id} id={card.id}>
//                         <div>
//                           <HolderOutlined />
//                         </div>
//                       </Draggable>
//                       <div className="bg-blue-500 text-white p-4 rounded shadow">
//                         {card.title}
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </Droppable>
//           </Col>
//         ))}
//       </Row>
//     </DndContext>
//   );
// }

export default App;
