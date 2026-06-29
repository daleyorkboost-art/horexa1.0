"use client";

import { useMemo, useState } from "react";
import { BeforeAfterSlider, ProjectCard } from "@/components";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/site-data";

const categories = ["All", "Duct Cleaning", "Hood & Filter", "Ventilation", "Water Tank", "AMC Projects"];

export function ProjectsFilter() {
  const [category, setCategory] = useState("All");
  const filteredProjects = useMemo(
    () => (category === "All" ? projects : projects.filter((project) => project.category === category)),
    [category],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((item) => (
          <Button
            key={item}
            type="button"
            variant={category === item ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            location={project.location}
            duration={project.duration}
            kitchenType={project.kitchenType}
            greaseLevel={project.greaseLevel}
            services={project.services}
            image={{ src: project.image, alt: project.title }}
            href="/projects"
          />
        ))}
      </div>
      <BeforeAfterSlider
        before={{ src: "/images/horexa-blog.webp", alt: "Greasy duct before cleaning" }}
        after={{ src: "/images/horexa-projects.webp", alt: "Clean exhaust hood after cleaning" }}
      />
    </div>
  );
}
