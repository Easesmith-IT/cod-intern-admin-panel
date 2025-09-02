"use client";

import { TextField } from "./text-field";

export const ButtonField = ({ name }) => {
  return (
    <div className="space-y-3 border rounded-lg p-3">
      <TextField name={`${name}.text`} label="Button Text" />
      <TextField
        name={`${name}.link`}
        label="Button Link (e.g. /button-link)"
        placeholder="/button-link"
      />
    </div>
  );
};
