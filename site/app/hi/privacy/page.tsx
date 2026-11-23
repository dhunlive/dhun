import type { Metadata } from "next";

import { PrivacyPage } from "@/components/PrivacyPage";
import { hi } from "@/content/copy";

export const metadata: Metadata = {
  title: hi.privacy.metaTitle,
  description: hi.privacy.metaDescription,
  alternates: { canonical: "/hi/privacy", languages: { en: "/privacy" } },
};

export default function Page() {
  return <PrivacyPage lang="hi" />;
}
