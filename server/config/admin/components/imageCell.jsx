import React from "react";
import { AvatarCell } from "./avatar";

const ImageCellComponent = ({ record, property }) => {
  return <AvatarCell data={record.params} />;
};

export default ImageCellComponent;
