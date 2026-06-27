import meta from "@/data/meta";
import contact from "@/data/contact";
import ContactClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with the studio to talk more about your project or a potential collaboration.",
};

export default function ContactPage() {
  return <ContactClient {...contact} {...meta} />;
}
