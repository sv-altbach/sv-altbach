# SV Altbach

## Blog section

The website homepage includes a Tumblr-powered blog section that fetches and displays the latest 5 posts from `https://svaltbach-blog.tumblr.com/`.

- Blog data is cached with Next.js cache components and revalidated weekly.
- The cache tag used for the blog is refreshed through `POST /api/revalidate/blog`.

### Environment variables

- `BLOG_REVALIDATE_API_KEY` (required for manual revalidation)
- `TUMBLR_BLOG_API_URL` (optional override for local testing; defaults to the public Tumblr read API)

### Manual revalidation

Send a `POST` request to `/api/revalidate/blog` with the API key in the `x-api-key` header:

```bash
curl -X POST \
  -H "x-api-key: $BLOG_REVALIDATE_API_KEY" \
  https://your-domain.example/api/revalidate/blog
```

If the key is missing or invalid, the endpoint returns `401 Unauthorized`.
