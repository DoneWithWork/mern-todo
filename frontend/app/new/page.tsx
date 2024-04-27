import React from "react";
import { ToDoForm } from "../components/Form";

export default function page() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <ToDoForm />
    </div>
  );
}
