import type { Metadata } from "next";
import contact from "@/data/contact";
import meta from "@/data/meta";
import ContactClient from "./client";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Connect with the studio to talk more about your project or a potential collaboration.",
};

export default function ContactPage() {
    return <ContactClient {...contact} {...meta} />;
}
