import fetch from "node-fetch";

import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 1000,
  maxAge: 1000 * 60 * 60 * 24 * 365,
});

export default async function handler(req, res) {
  const { path } = req.query;
  const imageUrl = process.env.IMAGE_API_ENDPOINT + path.join("/");
  let response = cache.get(imageUrl);
  if (response == undefined) {
    const httpres = await fetch(imageUrl);
    if (!httpres.ok) {
      res.status(response.status).json({ error: "Failed to fetch the image" });
      return;
    }
    response = {
      body: await httpres.arrayBuffer(),
      contenttype: httpres.headers.get("content-type"),
      contentlength: httpres.headers.get("content-length"),
    };
    cache.set(imageUrl, response);
  }

  const range = req.headers.range;
  if (range) {
    const [start, end] = range
      .replace(/bytes=/, "")
      .split("-")
      .map(Number);
    const startPos = start || 0;
    const endPos = end || response.contentlength - 1;

    if (
      startPos >= response.contentlength ||
      endPos >= response.contentlength
    ) {
      res
        .status(416)
        .setHeader("Content-Range", `bytes */${response.contentlength}`);
      res.end();
      return;
    }

    const chunk = response.body.slice(startPos, endPos + 1);
    res.status(206); // Partial Content
    res.setHeader(
      "Content-Range",
      `bytes ${startPos}-${endPos}/${response.contentlength}`
    );
    res.setHeader("Content-Length", chunk.byteLength);
    res.setHeader("Content-Type", response.contenttype);
    res.end(Buffer.from(chunk));
  } else {
    res.setHeader("Content-Type", response.contenttype);
    res.setHeader("Content-Length", response.contentlength);
    res.setHeader("Content-Security-Policy", "default-src 'self';");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.end(Buffer.from(response.body));
  }
}

export const config = {
  api: {
    responseLimit: "300mb",
  },
};
