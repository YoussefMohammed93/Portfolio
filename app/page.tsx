"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function MainPage() {
  const tasks = useQuery(api.tasks.get);

  if (!tasks) {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <h1 className="text-5xl">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <ul className="flex flex-col items-center gap-5">
        {tasks?.map((task) => (
          <li
            key={task._id}
            className={`text-5xl ${task.isCompleted && "line-through"}`}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
