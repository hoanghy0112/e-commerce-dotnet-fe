import { API_URLS } from "@/config/api-urls";

export default async function getViewCount(siteName: string) {
  const response = await fetch(
    API_URLS.stats.getViewCount.replace("{siteName}", siteName)
  );
  return response.json();
}
