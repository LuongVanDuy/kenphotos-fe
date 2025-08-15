import ContactSection from "@/components/Client/Contact/ContactSection";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "Contact Us",
    description: "Get in touch with KenPhotos for inquiries and support.",
  });
}

const ContactPage = () => {
  return <ContactSection />;
};

export default ContactPage;
