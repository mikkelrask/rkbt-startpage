export function truncateUrl(url: string, maxSlashes: number) {
  const parts = url.split("/");
  return parts.length > maxSlashes + 1
    ? parts.slice(0, maxSlashes + 1).join("/") + "/..."
    : url;
}
