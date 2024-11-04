"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProject() {
  const [form, setForm] = useState({
    title: "",
    category: "Front End",
    description: "",
    client: "",
    technologies: "",
    images: ["", "", ""],
    href: "",
  });
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        router.push("/work");
      } else {
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    setForm((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = value;
      return { ...prev, images: updatedImages };
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-gray-800 rounded">
      <h2 className="text-3xl font-bold text-white mb-4">Create New Project</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
        >
          <option value="Front End">Front End</option>
          <option value="Full Stack">Full Stack</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
          required
        />
        <input
          type="text"
          name="client"
          placeholder="Client"
          value={form.client}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
          required
        />
        <input
          type="text"
          name="technologies"
          placeholder="Technologies"
          value={form.technologies}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
          required
        />
        {form.images.map((image, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Image URL ${index + 1}`}
            value={image}
            onChange={(e) => handleImageChange(index, e.target.value)}
            className="mb-4 p-2 w-full"
            required
          />
        ))}
        <input
          type="text"
          name="href"
          placeholder="Project Link (optional)"
          value={form.href}
          onChange={handleChange}
          className="mb-4 p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 p-2 w-full text-white">
          Add Project
        </button>
      </form>
    </div>
  );
}
