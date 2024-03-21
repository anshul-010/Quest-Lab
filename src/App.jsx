import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { TodoBox } from "./Components/TodoBox";
import { Progress } from "./Components/Progress";
import { Review } from "./Components/Review";
import { DoneBox } from "./Components/DoneBox";
import { DragDropContext } from "react-beautiful-dnd";
import { DoneData, ProgressData, ReviewData, TodoData } from "./db";

const App = () => {
  const [todoData, setTodoData] = useState(TodoData);
  const [progressData, setProgressData] = useState(ProgressData);
  const [reviewData, setReviewData] = useState(ReviewData);
  const [doneData, setDoneData] = useState(DoneData);

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
        <TodoBox todoData={todoData} setTodoData={setTodoData} />
        <Progress
          progressData={progressData}
          setProgressData={setProgressData}
        />
        <Review reviewData={reviewData} setReviewData={setReviewData} />
        <DoneBox doneData={doneData} setDoneData={setDoneData} />
      </Box>
    </DragDropContext>
  );
};

export default App;
