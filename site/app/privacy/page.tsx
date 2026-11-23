import type { Metadata } from "next";

import { PrivacyPage } from "@/components/PrivacyPage";
import { en } from "@/content/copy";

export const metadata: Metadata = {
  title: en.privacy.metaTitle,
  description: en.privacy.metaDescription,
  alternates: { canonical: "/privacy", languages: { hi: "/hi/privacy" } },
};

export default function Page() {
  return <PrivacyPage lang="en" />;
}
