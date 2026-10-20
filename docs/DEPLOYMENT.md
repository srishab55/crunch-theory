# Deploying Crunch Theory to Vercel

These steps take the site from your laptop to a live URL in about 15 minutes. Every push to
`main` then redeploys the site automatically.

## 0. Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com/signup) account (choose **Continue with GitHub**)
- A [Google Analytics](https://analytics.google.com) account, for visit tracking
- Node.js 20.9 or newer, if you want to run the site locally (`node -v`)

Optional: a domain name (for example `crunchtheory.in`) and a [Resend](https://resend.com) account,
which emails you each form submission.

---

## 1. Check that it builds locally

```bash
npm install
npm run check     # typecheck + lint + formatting
npm run build     # must end without errors
```

## 2. Push the code to GitHub

The git repository and first commit already exist. Create an **empty** repository on GitHub. Go to
**New repository**, name it `crunch-theory`, and don't add a README, .gitignore or licence. Then run:

```bash
git remote add origin https://github.com/<your-username>/crunch-theory.git
git push -u origin main
```

> GitHub asks for a password: use a **Personal Access Token**
> (GitHub → Settings → Developer settings → Tokens), not your account password.
> Alternatively, use GitHub Desktop: File → Add local repository → Publish.

## 3. Create the GA4 property (visit tracking)

1. Open [analytics.google.com](https://analytics.google.com) and go to **Admin → Create → Property**.
   Name it _Crunch Theory_, set the time zone to _India_ and the currency to _INR_.
2. Go to **Data streams → Add stream → Web** and enter your site URL. You can change the URL later.
3. Leave **Enhanced measurement** ON, then click its ⚙️ → **Page views → Show advanced settings**
   and turn **off** "Page changes based on browser history events". The site sends its own page
   views for every navigation; this setting would only risk double-counting.
4. Copy the **Measurement ID**, which looks like `G-ABC123XYZ`.

## 4. Import the project into Vercel

1. In [vercel.com/new](https://vercel.com/new), find your `crunch-theory` repo and click **Import**.
2. Vercel detects **Next.js**. Leave the Build Command, Output Directory and Install Command at their defaults.
3. Open **Environment Variables** and add:

   | Name                                   | Value                                                              | Required |
   | -------------------------------------- | ------------------------------------------------------------------ | -------- |
   | `NEXT_PUBLIC_SITE_URL`                 | `https://<your-project>.vercel.app`, or your custom domain later   | Yes      |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID`        | Already built in (`G-T0HTG7NX71`); set only to override            | No       |
   | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Token from step 7                                                  | Optional |
   | `RESEND_API_KEY`                       | Your Resend API key                                                | Optional |
   | `CONTACT_TO_EMAIL`                     | The inbox that receives form messages                              | Optional |
   | `CONTACT_FROM_EMAIL`                   | `Crunch Theory <noreply@yourdomain>` (a domain verified in Resend) | Optional |

4. Click **Deploy**. After about a minute you get a live `https://<project>.vercel.app` URL.

> If you leave `NEXT_PUBLIC_SITE_URL` empty, the site falls back to Vercel's production domain
> automatically. Set it explicitly once you have a custom domain, so canonical URLs and the
> sitemap use that domain.

## 5. Check the live site

Open each of these and confirm it loads:

- `/` — the home page with the hero video
- `/flavours/himalayan-pink-salt-pepper`
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`
- `/opengraph-image` — the share-preview image

**Check tracking:** open the site, click **Sounds good** on the cookie banner, then in GA4 go to
**Reports → Realtime**. Your visit should appear within about 30 seconds. Click a marketplace
button and look for the `buy_click` event.

In GA4, go to **Admin → Events** and mark `generate_lead` and `buy_click` as **Key events**, so
they count as conversions.

## 6. Add a custom domain (optional)

1. In Vercel, go to **Project → Settings → Domains → Add** and enter `crunchtheory.in`. Add
   `www.crunchtheory.in` too, and redirect one to the other.
2. At your domain registrar (GoDaddy, Namecheap, Hostinger…), add the DNS records Vercel shows.
   These are usually an `A` record for the root domain pointing to `76.76.21.21`, and a `CNAME`
   for `www` pointing to `cname.vercel-dns.com`.
3. Wait for Vercel to show **Valid Configuration**. HTTPS is set up automatically.
4. Update `NEXT_PUBLIC_SITE_URL` to `https://www.crunchtheory.in`, then go to
   **Deployments → ⋯ → Redeploy**.
5. Update the GA4 data stream URL to the new domain.

## 7. Get indexed by search and AI engines

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)):
   - Add a property → URL prefix → choose **HTML tag** → copy the `content="…"` token.
   - Set it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel, redeploy, then click **Verify**.
   - Go to **Sitemaps** and submit `sitemap.xml`.
   - Run **URL Inspection → Request indexing** on the home page and each flavour page.
2. **Bing Webmaster Tools** ([bing.com/webmasters](https://www.bing.com/webmasters)): import from
   Search Console in one click. This matters for AI search, because ChatGPT search and Copilot use
   Bing's index.
3. **Check structured data:** paste a flavour URL into the
   [Rich Results Test](https://search.google.com/test/rich-results). You should see Product,
   Breadcrumb and (on `/faq`) FAQ results.
4. **Check share previews:** paste your URL into the [opengraph.xyz](https://www.opengraph.xyz) preview tool.
5. **Check performance:** run [PageSpeed Insights](https://pagespeed.web.dev) on the home page.

## 8. Day-to-day updates

```bash
# edit copy in src/data/*, add images to public/images, etc.
npm run check && npm run build
git add -A
git commit -m "Update flavour prices"
git push            # Vercel redeploys automatically
```

- **Preview deployments:** push to any branch other than `main` (`git checkout -b new-flavour`)
  and Vercel gives you a private preview URL to review before merging.
- **Rollback:** in Vercel, go to **Deployments**, pick a previous deployment and choose
  **⋯ → Promote to Production**.
- **Form submissions without Resend:** they appear in Vercel → Project → **Logs**. Search for `[form]`.

## Troubleshooting

| Problem                                              | Fix                                                                                                                                                                                                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The build fails on Vercel but works locally          | Run `npm run build` locally and fix any error it reports. Check that the Node version is 20.9 or newer (Vercel → Settings → General).                                                                                                         |
| No data in GA4                                       | Only **production** deploys track by default (not previews). If you set `NEXT_PUBLIC_GA_MEASUREMENT_ID`, make sure it isn't empty, then redeploy (it is read at build time). Accept the cookie banner. Turn off any ad-blocker while testing. |
| Canonical links or the sitemap show the wrong domain | Update `NEXT_PUBLIC_SITE_URL` and redeploy.                                                                                                                                                                                                   |
| The hero video doesn't play on a phone               | iOS Low Power Mode blocks autoplay. The poster image is shown instead, which is expected.                                                                                                                                                     |
| Contact emails don't arrive                          | Check the Resend dashboard, and make sure `CONTACT_FROM_EMAIL` uses a domain verified in Resend.                                                                                                                                              |
