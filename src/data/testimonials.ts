/**
 * TESTIMONIALS DATA
 * ==================
 * Client testimonials and recommendations.
 * 
 * HOW TO EDIT:
 * - Add new testimonials by copying the structure below
 * - Remove testimonials by deleting objects from the array
 * - Reorder by dragging entries up/down (first = shown first)
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company?: string;
  avatarUrl?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "jane-doe",
    quote:
      "Working with Mohamed was an absolute pleasure. His technical expertise and commitment to quality are second to none. He delivered a product that exceeded all our expectations on time and on budget.",
    author: "Jane Dole",
    title: "Project Manager",
    company: "TechCorp",
    featured: true,
  },
  {
    id: "john-smith",
    quote:
      "Mujahith has a unique ability to understand complex requirements and translate them into clean, efficient, and scalable code. His problem-solving skills are exceptional.",
    author: "John Smith",
    title: "Lead Engineer",
    company: "Innovate LLC",
    featured: true,
  },
  {
    id: "emily-white",
    quote:
      "The strategic insights Mohamed brought to the table, thanks to his business background, were invaluable. He doesn't just build features; he builds products that are set up for success.",
    author: "Emily White",
    title: "Product Owner",
    company: "Solutions Inc.",
    featured: true,
  },
  {
    id: "emi-white",
    quote:
      "Suber bro! He is a great team player and always willing to go the extra mile to ensure project success. His positive attitude and dedication make him a joy to work with.",
    author: "Emi White",
    title: "Product Owner",
    company: "Solutions Inc.",
    featured: true,
  },
];