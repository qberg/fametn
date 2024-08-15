import fetch from 'node-fetch';
import { LRUCache } from 'lru-cache';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize the LRU cache with a maximum of 1000 items and a max age of 1 year
const cache = new LRUCache<string, { body: ArrayBuffer; contenttype: string; contentlength: string }>({
    max: 1000,
    // maxAge: 1000 * 60 * 60 * 24 * 365,
});

/**
 * API route handler for fetching and caching images.
 * 
 * @param req - The incoming request object
 * @param res - The outgoing response object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { path } = req.query;
    // Validate that the path is an array
    if (!Array.isArray(path)) {
        res.status(400).json({ error: 'Invalid path' });
        return;
    }

    // Construct the image URL from the environment variable and the path
    const imageUrl = process.env.IMAGE_API_ENDPOINT + path.join('/');
    let response = cache.get(imageUrl);

    // If the response is not in the cache, fetch it from the external API
    if (!response) {
        const httpres = await fetch(imageUrl);
        if (!httpres.ok) {
            res.status(httpres.status).json({ error: 'Failed to fetch the image' });
            return;
        }
        response = {
            body: await httpres.arrayBuffer(),
            contenttype: httpres.headers.get('content-type') || 'application/octet-stream',
            contentlength: httpres.headers.get('content-length') || '0',
        };
        // Store the fetched response in the cache
        cache.set(imageUrl, response);
    }

    // Set the response headers
    res.setHeader('Content-Type', response.contenttype);
    res.setHeader('Content-Security-Policy', "default-src 'self';");
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Content-Length', response.contentlength);
    
    // Send the cached or fetched image as the response
    res.end(Buffer.from(response.body));
}
