"use client";
import { useState } from "react";

function CheckList() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <input
        type="checkbox"
        checked={`${checked ? "checked" : ""}`}
        onClick={() => setChecked(!checked)}
        className="checkbox checkbox-primary"
      />
      
    </>
  );
}

export default CheckList;
