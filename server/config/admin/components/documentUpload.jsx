// admin/components/VideoUpload.jsx
import React, { useState } from "react";
import {
  Label,
  FormGroup,
  Button,
  Icon,
  DropZone,
} from "@adminjs/design-system";
import axios from "axios";

const DocumentUpload = (props) => {
  const { onChange, property, record } = props;

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  // ✅ Новый обработчик DropZone — принимает массив файлов, а не event
  const handleDropZoneChange = async (files) => {
    const file = files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await axios.post(
        "/api/documents/upload-document",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { secure_url } = response.data;
      onChange(property.name, secure_url);
    } catch (err) {
      setError("Ошибка загрузки файла");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormGroup>
      <Label>
        {`File document (${property.label})` +
          (property.isRequired ? " *" : "")}
      </Label>

      <DropZone
        multiple={false}
        onChange={handleDropZoneChange}
        disabled={uploading}
        mimeTypes={["doc", "docx", "pdf", "txt", "odt", "rtf"]}
        maxSize="8000000"
      />

      {uploading && (
        <Button variant="primary" size="sm" disabled>
          <Icon icon="Loading" /> Загрузка...
        </Button>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </FormGroup>
  );
};

export default DocumentUpload;
