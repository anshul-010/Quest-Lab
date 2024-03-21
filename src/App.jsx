import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { TodoBox } from "./Components/TodoBox";
import { Progress } from "./Components/Progress";
import { Review } from "./Components/Review";
import { DoneBox } from "./Components/DoneBox";
import { DragDropContext } from "react-beautiful-dnd";

const App = () => {
  // Data for TodoBox
  const [todoData, setTodoData] = useState([
    {
      title: "Project A",
      color: "pink",
      id: "11"
    },
    {
      title: "Project B",
      color: "blue",
      id: "101"
    }
  ]);

  // Data for Progress
  const [progressData, setProgressData] = useState([
    {
      title: "Project C",
      color: "green",
      id: "201"
    },
    {
      title: "Project D",
      color: "yellow",
      id: "301"
    }
  ]);

  // Data for Review
  const [reviewData, setReviewData] = useState([
    {
      title: "Project E",
      color: "purple",
      id: "401"
    },
    {
      title: "Project F",
      color: "orange",
      id: "501"
    }
  ]);

  // Data for DoneBox
  const [doneData, setDoneData] = useState([
    {
      title: "Project G",
      color: "red",
      id: "601"
    },
    {
      title: "Project H",
      color: "teal",
      id: "701"
    }
  ]);

  function handleDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let sourceData;
    let setData;

    // Determine source and destination data based on droppableId
    switch (source.droppableId) {
      case "todo-box":
        sourceData = todoData;
        setData = setTodoData;
        break;
      case "progress":
        sourceData = progressData;
        setData = setProgressData;
        break;
      case "review":
        sourceData = reviewData;
        setData = setReviewData;
        break;
      case "done-box":
        sourceData = doneData;
        setData = setDoneData;
        break;
      default:
        break;
    }

    // Remove item from source data
    add = sourceData[source.index];
    sourceData.splice(source.index, 1);

    // Insert item into destination data
    switch (destination.droppableId) {
      case "todo-box":
        todoData.splice(destination.index, 0, add);
        break;
      case "progress":
        progressData.splice(destination.index, 0, add);
        break;
      case "review":
        reviewData.splice(destination.index, 0, add);
        break;
      case "done-box":
        doneData.splice(destination.index, 0, add);
        break;
      default:
        break;
    }

    // Update state
    setData([...sourceData]);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        w="100vw"
        h="100vh"
        backgroundColor="#3179BA"
        p="30px"
        display="flex"
      >
        <TodoBox todoData={todoData} />
        <Progress progressData={progressData} />
        <Review reviewData={reviewData} />
        <DoneBox doneData={doneData} />
      </Box>
    </DragDropContext>
  );
};

export default App;
