import { test, expect, Page } from "@playwright/test";

const url = "https://vxvhk.com";

async function checkLinks(page: Page, link: string, visited: string[]) {
  // get all links
  // check if link is valid

  await page.goto(link);
  const links = await page.$$eval("a", (links) =>
    links.map((link) => link.getAttribute("href"))
  );
  //@ts-expect-error
  let filteredLinks: string[] = links.filter((l) => l !== null);
  filteredLinks = filteredLinks
    .filter((l) => !l.startsWith("https"))
    .filter((l) => !l.startsWith("#"))
    .filter((l) => !visited.includes(l))
    .filter((l) => l !== "/");

  for (const link of filteredLinks) {
    const url = new URL(link, page.url());
    visited.push(link);
    await checkLinks(page, url.href, visited);
  }
}

test("Check every link", async ({ page }) => {
  const visited: string[] = [];
  await checkLinks(page, url, visited);
});
