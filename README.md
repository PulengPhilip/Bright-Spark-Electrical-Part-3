# Bright Spark Electrical Services – Website Project Part 3

- **Repository URL:** _to be added after pushing to GitHub_
- **Live site URL:** _to be added after publishing with GitHub Pages_

## Project Overview
Bright Spark Electrical Services is a fictional small electrical company that I created for this project. It was founded in 2018 as a solo operation and grew into a three-person team through word-of-mouth referrals. The business serves homes and small businesses in Polokwane, Limpopo.

In Part 2, I worked through the *Student SEO and Publishing Guide*. The guide uses a bakery website as its example, so I applied every step to my own site. I also fixed weak spots I found along the way and added more JavaScript functionality. This README explains what I did and why.

## Website Goals
1. Generate online service enquiries.
2. Build trust through experience, qualifications and completed work.
3. Improve local online visibility in Polokwane.
4. Provide an enquiry option outside business hours.
5. Make contact details easy to find.

## Sitemap
Home → About Us / Services / Get a Quote / Contact (plus a `404.html` page for broken links)

## File Structure
```text
Bright_Spark_Electrical_Part2/
├── index.html          about.html        services.html
├── enquiry.html        contact.html      404.html
├── robots.txt          sitemap.xml
├── css/style.css       js/script.js
├── images/             (descriptive .webp + .jpg files, favicon.svg)
├── docs/               (Part 1 checklist, off-page SEO plan)
├── research/           wireframes/
└── README.md
```

---

## What I did for Part 3

### 1. On-page SEO

**Search phrases.** I picked one honest search phrase for each page, the way a real customer in my area might search:

| Page | Search phrase | Title I gave the page |
|---|---|---|
| `index.html` | electrician in Polokwane | Electrician in Polokwane \| Bright Spark Electrical Services |
| `services.html` | electrical services in Polokwane | Electrical Services in Polokwane \| Bright Spark Electrical |
| `about.html` | Polokwane electricians since 2018 | About Bright Spark Electrical \| Polokwane Electricians Since 2018 |
| `enquiry.html` | electrical quote Polokwane | Request an Electrical Quote \| Bright Spark Electrical, Polokwane |
| `contact.html` | Bright Spark Electrical contact details | Contact Bright Spark Electrical \| Electrician in Polokwane |

I used each phrase naturally in the title, meta description, `<h1>` and body text. I didn't repeat it over and over.

**Unique titles and descriptions.** Every page now has its own title and its own `<meta name="description">` that summarises that page's content. I also added Open Graph tags (`og:title`, `og:description`) so links shared on WhatsApp or Facebook show a proper preview. I changed the language tag to `en-ZA`.

**Heading structure.** Every page has exactly one `<h1>`, `<h2>` tags for major sections and `<h3>` tags for subsections. Here is what I fixed:
- The About page used `<h2>` for Mission, Vision and Audience directly inside a section with no section heading. I added an "Our mission, vision and customers" `<h2>` and changed the three cards to `<h3>`.
- The footers used `<h3>`/`<h4>` before the page's own headings, which broke the outline. I changed them to `<h2 class="footer-heading">` so the order is logical but they still look the same.

**Images.** I renamed every image so the filename describes the photo. For example, `service-faults.jpg` became `digital-multimeter-fault-finding.jpg` and `hero.jpg` became `electrician-repairing-switchboard.jpg`. I also rewrote the alt text so it describes each photo specifically. Two pairs of images were exact duplicates under different names, so I merged each pair into one file. The browser now downloads and caches it once.

**Descriptive links.** I replaced vague link text like "Get a Quote", "About" and "Contact Us" with text that says where the link goes: "Request a free electrical quote", "Request a quote for lighting work", "Read our story and qualifications", "Open Polokwane in Google Maps (opens in a new tab)". Related pages now link to one another. Each Home service card links to its section on the Services page, each service links to the quote form, the FAQ links to Contact and the Quote form, and every footer has the same four quick links. Phone numbers and emails are now clickable `tel:` and `mailto:` links.

**Mobile layout.** I kept the viewport tag and tested every page at 375px. Nothing scrolls sideways. On small screens, buttons stretch to full width so they're easy to tap. The menu button is now 44×44px, which meets the minimum touch-target size.

**Structured data.** I added a small `Electrician` JSON-LD block to the Home and Contact pages. It lists the business name, phone, email, service area and opening hours, so search engines can read the local details reliably.

### 2. Off-page SEO
Off-page SEO happens outside the website, so I wrote a plan in [`docs/OFF_PAGE_SEO_PLAN.md`](docs/OFF_PAGE_SEO_PLAN.md). It covers the guide's student activity: three plausible local organisations that could genuinely link to the site, a polite outreach message and an example social media post. It also covers how I kept the business name, area, phone and hours consistent across the site, and my approach to honest reviews.

I deliberately did **not** add customer testimonials. I don't have real ones, and the guide (and Google's policies) say never to write fake reviews. Instead, the About page invites past customers to share honest feedback. I also didn't create a Google Business Profile, because Bright Spark is fictional.

### 3. robots.txt, sitemap.xml, speed and security

**robots.txt.** I created this file beside `index.html`. It allows all crawlers and points them to the sitemap.

**sitemap.xml.** It lists the five public pages, each with a `lastmod` date. I left `404.html` out on purpose, and I added `<meta name="robots" content="noindex">` to that page so it never shows up in search results.

> ⚠️ Both files currently use my proposed domain, `https://brightsparkelectrical.co.za/`. Once the site is published, I need to replace it with the real live address (for example `https://USERNAME.github.io/REPOSITORY-NAME/`).

**Speed.** The original photos were 1600px wide and up to 824 KB each, which is far bigger than the 230–350px boxes they display in.
- I resized them to sensible sizes (1600px for the hero, 1200px for the project photo, 800px for cards) and compressed them.
- I saved every image as **WebP**, with an optimised **JPG fallback**, using `<picture>` so each browser picks the best format it supports.
- The hero background uses CSS `image-set()` for the same WebP/JPG choice. I preload the hero image so the top of the Home page appears quickly.
- Images further down each page use `loading="lazy"`. The main image at the top of a page does not, as the guide recommends.
- Every `<img>` has `width` and `height`, so the layout doesn't jump while images load.
- The script loads with `defer`, so it never blocks the page from rendering.

| Image | Before | After (WebP) |
|---|---|---|
| Team portrait | 824 KB | 117 KB |
| Home page hero | 196 KB | 87 KB |
| Domestic service card | 355 KB | 36 KB |
| Fault-finding photo | 239 KB | 29 KB |

**Security and privacy.**
- Every external link that opens in a new tab (WhatsApp, Google Maps) has `rel="noopener noreferrer"`.
- There are no passwords, API keys or real customer details anywhere in the project. All contact details are placeholders.
- The forms say clearly that they are a demonstration and do not send or store anything. Client-side validation is not secure delivery, so a real site would need a trusted form service or server-side code.
- When I publish, I'll make sure HTTPS is switched on (GitHub Pages provides it).

### 4. Other improvements I made
- **Accessibility:**
  - I added a "Skip to main content" link.
  - The current page in the menu is marked with `aria-current="page"`.
  - Keyboard users get a clear yellow focus outline.
  - Form errors are linked to their fields with `aria-describedby`.
  - Hover animations switch off for people who prefer reduced motion.
- **Content:**
  - I added a Services FAQ using `<details>` (service area, how to get a quote, what to do in an emergency, landlords).
  - Each service now has its own anchor (e.g. `services.html#fault-finding`).
  - I added a closing call-to-action band on the Home, About and Services pages.
  - I replaced the About page's raw "replace these placeholders" note with a real qualifications checklist, plus a short note that it's placeholder content.
- **Polish:** I added a lightning-bolt SVG favicon (it also stops the browser's missing-favicon 404), a branded `404.html` page and a `theme-color` for mobile browsers. I also gave buttons a subtle hover lift.

---

## JavaScript functionality (`js/script.js`)

| Feature | Where | What it does |
|---|---|---|
| **Accessible mobile menu** | All pages | Opens and closes the menu, swaps ☰/✕, keeps `aria-expanded` in sync, and closes the menu when a link is tapped, when Escape is pressed or when the screen is resized to desktop width. |
| **Open / closed indicator** | Home hero, Contact page | Checks the current time **in South African time** (`Africa/Johannesburg`, via `Intl.DateTimeFormat`) against the office hours of Monday–Friday, 07:00–17:00. It shows a green "Open now" or amber "Closed now" badge and refreshes every minute. This supports goal 4: after hours, it tells visitors to use the online quote form instead. |
| **Inline form validation** | Quote and Contact forms | Replaces the browser's pop-ups with clear messages under each field. It checks required fields, the email format, **South African phone numbers** (`071 000 0000` or `+27…`), a minimum message length and that the date isn't in the past. It checks each field when the visitor leaves it and re-checks as they fix it, then focuses the first error on submit. The HTML `required` attributes still work if JavaScript is off. |
| **Character counter** | Message boxes | Shows "0 / 600 characters" as the visitor types. |
| **No past dates** | Quote form | Sets the date picker's minimum to today. |
| **Service pre-selection** | Services → Quote form | Links such as `enquiry.html?service=lighting` fill in the "Service required" dropdown automatically, so the visitor doesn't have to pick it again. |
| **Emergency warning** | Quote form | If "Emergency Call-Out" is chosen, a red notice appears asking the visitor to phone instead, because a form is too slow for an emergency. |
| **Personalised confirmation** | Both forms | After a valid submission, it thanks the visitor by first name, resets the form and scrolls to the confirmation message. |
| **Back-to-top button** | All pages | Appears after scrolling 500px and scrolls smoothly back up (or jumps instantly if the visitor prefers reduced motion). |
| **Automatic footer year** | All pages | Keeps the © year up to date. |

## How I tested
- I checked every page for exactly one `<h1>`, a unique title, alt text on every image, no broken local links and no unsafe `target="_blank"` links, using a small script.
- I checked `js/script.js` with `node --check` and confirmed `sitemap.xml` is valid XML.
- I rendered the pages in headless Chrome at desktop width and at 375px (mobile). I confirmed there's no sideways scrolling, the form validation and counters are created, the date minimum is set, the open/closed badge shows correctly, and `?service=emergency` pre-selects the service and shows the emergency notice.

## Part 2 SEO checklist
- [x] Every page has a unique, accurate title and description.
- [x] Pages have a clear main heading and organised section headings.
- [x] Images have useful alt text and sensible file sizes.
- [x] Links explain their destinations; related pages link to one another.
- [x] The mobile layout fits without sideways scrolling.
- [x] `robots.txt` is beside `index.html`. *(Update the sitemap address after publishing.)*
- [x] `sitemap.xml` lists the public pages. *(Update the URLs after publishing.)*
- [x] No passwords, keys, private information or customer data are published.
- [ ] The live site works and its pages, images, links and interactions were checked. *(After publishing.)*
- [ ] README includes the repository URL and live URL. *(After publishing.)*

## Technical Requirements
HTML5, CSS3 and vanilla JavaScript (no frameworks), with a responsive design. Proposed domain: brightsparkelectrical.co.za. Hosting: GitHub Pages (free) or affordable shared hosting.

## Budget
Estimated annual budget from the proposal: R1,050 (R150 domain + R900 hosting). Development is treated as part of the student project.

## Timeline
Proposal → Approval → Research → Sitemap/Wireframes → HTML → CSS/JS → SEO → Testing → GitHub → Publishing → Submission.

## Changelog
### Version 2.0 – Part 3(SEO, performance and publishing preparation)
- Rewrote the titles, meta descriptions and `<h1>`s around local search phrases; added Open Graph tags and `lang="en-ZA"`.
- Fixed the heading hierarchy on the About page and in the footers.
- Renamed images descriptively, resized and compressed them, added WebP with JPG fallbacks, lazy loading, width/height attributes and a hero preload; merged duplicate images.
- Rewrote vague link text, added cross-links between related pages and made phone/email links clickable.
- Added `robots.txt`, `sitemap.xml`, `404.html`, a favicon and `Electrician` structured data.
- Added `rel="noopener noreferrer"` to external new-tab links.
- Added a Services FAQ, service anchors, call-to-action bands, a qualifications list and an honest-review invitation.
- Rewrote `script.js`: accessible menu, open/closed indicator, inline form validation, character counter, date minimum, service pre-selection, emergency warning, back-to-top button and footer year.
- Added accessibility improvements: skip link, focus styles, `aria-current`, reduced-motion support.
- Added `docs/OFF_PAGE_SEO_PLAN.md`.

### Version 1.1
Reformatted the code for readability, corrected the heading hierarchy and filled all image placeholders with free-licensed Pexels stock photos (see `images/IMAGE_CREDITS.md`), pending replacement with real business photos.

### Version 1.0 – Part 1
Initial project structure, five HTML pages, CSS, JavaScript, research notes, wireframe guide, README and submission checklist.

## References
Google. (n.d.). *Google Maps Platform Documentation*. Available at: https://developers.google.com/maps/documentation (Accessed: 14 August 2026).

Google Search Central. (n.d.). *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 31 October 2026).

Google Search Central. (n.d.). *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 31 October 2026).

Google Search Central. (n.d.). *Google Search Essentials* and *Spam policies*. Available at: https://developers.google.com/search/docs/essentials (Accessed: 31 October 2026).

Sitemaps.org. (n.d.). *Sitemaps XML format*. Available at: https://www.sitemaps.org/protocol.html (Accessed: 31 October 2026).

Schema.org. (n.d.). *Electrician*. Available at: https://schema.org/Electrician (Accessed: 31 October 2026).

GitHub. (n.d.). *Creating a GitHub Pages site*. Available at: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site (Accessed: 31 October 2026).

Pexels. (n.d.). *Pexels License*. Available at: https://www.pexels.com/license/ (Accessed: 14 August 2026).

South African Government. (n.d.). *Government information and legislation*. Available at: https://www.gov.za/ (Accessed: 14 August 2026).

Department of Employment and Labour. (n.d.). *Occupational Health and Safety*. Available at: https://www.labour.gov.za/ (Accessed: 14 August 2026).

South African Revenue Service. (n.d.). *Small business information*. Available at: https://www.sars.gov.za/ (Accessed: 14 August 2026).

## Important Note
Bright Spark Electrical Services is a fictional academic project. Contact details, addresses, qualifications, photos and map information are placeholders and must be replaced with verified information before real-world use.
