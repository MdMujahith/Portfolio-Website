import ContactForm from "@/components/layout/Contactform";

export const metadata = {
  title: "Contact | My Portfolio",
  description: "Get in touch with me.",
};

export default function ContactPage() {
  return (
    <main 
      // Changed pt-24 (96px) to pt-8 (32px) just to clear any top navbars
      className="min-h-screen pt-8 pb-4 transition-colors duration-300"
      style={{ background: "var(--bg)" }}
    >
      <ContactForm /> 
    </main>
  );
}