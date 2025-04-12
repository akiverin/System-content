import React, { useState, useEffect } from "react";
import {
  Label,
  FormGroup,
  DropZone,
  Button,
  Icon,
} from "@adminjs/design-system";
import axios from "axios";

const ImageUpload = (props) => {
  const { onChange, property, record } = props;
  const folder = property?.custom?.folder || "others";

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(
    record.params[property.name] || ""
  );

  const handleFileChange = async (files) => {
    const file = files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `/api/upload-image?folder=${folder}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const { secure_url } = response.data;
      onChange(property.name, secure_url);
      setPreviewUrl(secure_url);
    } catch (err) {
      setError("Ошибка загрузки файла");
      console.error("Ошибка загрузки изображения:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormGroup>
      <Label>{property.label + (property.isRequired ? " *" : "")}</Label>
      {previewUrl && (
        <div style={{ marginBottom: "1rem" }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "400px", maxHeight: "400px" }}
          />
        </div>
      )}

      <DropZone
        multiple={false}
        onChange={handleFileChange}
        disabled={uploading}
        mimeTypes={["png", "jpg", "jpeg", "gif"]}
        maxSize="800000"
      />

      {uploading && (
        <Button variant="primary" size="sm" disabled>
          <Icon icon="Loading" /> Загрузка...
        </Button>
      )}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </FormGroup>
  );
};

export default ImageUpload;
