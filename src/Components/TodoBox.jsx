import React, { useState } from "react";
import { Box, Button, Input, Select, Text } from "@chakra-ui/react";
import { Ellipsis, Plus } from "lucide-react";
import { TodoCard } from "./TodoCard";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";

let initialData = {
  title: "",
  color: "",
};

export const TodoBox = ({ todoData, setTodoData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(initialData);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  }

  function handleAddTodo() {
    const id = Math.floor(Math.random() * 1000) + 1;
    const idString = id.toString();
    const newTodo = { ...data, id: idString };
    setTodoData([...todoData, newTodo]);
    onClose();
  }

  return (
    <Droppable droppableId="todo-box">
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          w="300px"
          // h="550px"
          m="auto"
          backgroundColor="#F1F2F4"
          borderRadius={10}
        >
          <Box
            className="top"
            display="flex"
            // alignItems="center"
            justifyContent="space-between"
            padding="10px 20px"
          >
            <Text color="#3b3b3b" fontWeight="500">
              {"Todo"}
            </Text>

            <Ellipsis color="#3b3b3b" />
          </Box>
          <Box className="todo-lists" m="5px 10px 10px 10px">
            {todoData?.map((ele, i) => (
              <TodoCard key={ele.id} data={ele} index={i}  />
            ))}
          </Box>
          <Box
            className="add-todo"
            display="flex"
            alignItems="center"
            padding="5px 10px"
            gap="10px"
            margin="20px 0"
          >
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                <ModalHeader>Add New Todo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <Select name="color" onChange={handleChange}>
                    <option value="">Select the Color</option>
                    <option value="orange">Orange</option>
                    <option value="pink">Pink</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="yellow">Yellow</option>
                  </Select>
                  <br />
                  <Button
                    colorScheme="twitter"
                    variant="outline"
                    display="block"
                    m="auto"
                    onClick={handleAddTodo}
                  >
                    Add Todo
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Plus color="#737272" size={20} onClick={onOpen} cursor="pointer" />
            <Text
              color="#737272"
              fontWeight="500"
              onClick={onOpen}
              cursor="pointer"
            >
              Add a Card
            </Text>
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
