import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { AlignLeft, MessageSquare } from "lucide-react";
import { Draggable } from "react-beautiful-dnd";

export const TodoCard = ({ data, index }) => {

  

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <Box
          boxShadow="base"
          p="8px"
          borderRadius="10px"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box
            h="8px"
            w="40px"
            borderRadius="20px"
            backgroundColor={`${data.color}.400`}
          ></Box>
          <Text fontWeight="500" color="#3b3b3b">
            {data.title}
          </Text>
          <Box display="flex" alignItems="center">
            <AlignLeft size={15} color="#737272" />
            <Box display="flex" gap="5px" ml="15px" alignItems="center">
              <MessageSquare size={15} color="#737272" />
              <Text
                fontSize={"sm"}
                mb="2px"
                color="#737272"
                fontWeight="400"
                alignSelf="center"
              >
                {2}
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
