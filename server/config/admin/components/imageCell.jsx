import React from "react";
import { Box } from "@adminjs/design-system";
import { AvatarCell } from "./avatar";

const ImageCellComponent = ({ record, property }) => {
  console.log(1, property, record);
  return <AvatarCell data={record.params} />;
};

export default ImageCellComponent;
