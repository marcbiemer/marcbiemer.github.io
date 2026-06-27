import cv from "@/data/cv";
import CVClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Marc Biemer's curriculum vitae and biography.",
};

export default function CvPage() {
  return <CVClient cv={cv} />;
}
