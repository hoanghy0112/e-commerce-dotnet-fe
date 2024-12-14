import { API_URLS } from "@/config/api-urls";

export async function increaseViewCount(siteName: string) {
  const response = await fetch(
    API_URLS.stats.increaseCount.replace("{siteName}", siteName),
    {
      method: "POST",
    }
  );
  console.log(
    "called api url: ",
    API_URLS.stats.increaseCount.replace("{siteName}", siteName)
  );
  return response.json();
}
