"use client";

import { useMemo, useState } from "react";
import { BeforeAfterSlider, ProjectCard } from "@/components";
import { Button } from "@/components/ui/button";

const categories = ["All", "Duct Cleaning", "Hood & Filter", "Ventilation", "Water Tank", "AMC Projects"];

type Project = {
  title: string;
  location: string;
  duration: string;
  kitchenType: string;
  greaseLevel: "Light" | "Medium" | "Heavy";
  category: string;
  services: string[];
  image: string;
};

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All");
  const filteredProjects = useMemo(
    () => (category === "All" ? projects : projects.filter((project) => project.category === category)),
    [category, projects],
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
            aria-pressed={category === item}
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
      {projects[0] ? (
        <BeforeAfterSlider
          before={{ src: projects[0].image, alt: `${projects[0].title} project image` }}
          after={{ src: projects[0].image, alt: `${projects[0].title} documented handover` }}
        />
      ) : null}
    </div>
  );
}
