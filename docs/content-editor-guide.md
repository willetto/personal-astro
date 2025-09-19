# Content Editor Guide: Contact Form & Lucide Icons

This guide explains how to manage the Contact Form section and use Lucide icons within the Sanity Studio.

## 1. Managing the Contact Form Section

The Contact Form is now a reusable section that can be added to any page in your Sanity Studio.

### Adding a Contact Form Section to a Page

1.  **Log in to Sanity Studio:** Access your Sanity Studio at `[Your Sanity Studio URL]`.
2.  **Navigate to Pages:** In the left-hand navigation, find and click on "Pages".
3.  **Create or Edit a Page:**
    *   To create a new page, click the "Create new document" button and select "Page".
    *   To edit an existing page, select the page from the list.
4.  **Add the Contact Form Section:**
    *   Scroll down to the "Sections" field (an array of content blocks).
    *   Click "Add item" and select "Contact Form" from the list of available sections.
5.  **Populate Contact Form Fields:**
    *   **Headline:** Enter the main heading for your contact form (e.g., "Contact Us").
    *   **Description:** Provide a detailed description or introductory text for the form.
    *   **Tagline:** A short, catchy phrase displayed above the headline (e.g., "Get in Touch").
    *   **Tagline Icon (Lucide name):** Enter the **kebab-case name** of a Lucide icon to display next to your tagline (e.g., `mail`, `phone`, `message-square`).
    *   **Support Links:** This is an array where you can add multiple support links.
        *   Click "Add item" to add a new link.
        *   **Label:** The display text for the link (e.g., "Knowledge Base", "Live chat 24/7").
        *   **Icon (Lucide name):** Enter the **kebab-case name** of a Lucide icon to display next to this link (e.g., `brain`, `clock`, `info`).
        *   **URL:** (Optional) If this is a clickable link, provide the full URL (e.g., `/helpcenter/knowledge-base`).
        *   **Action:** (Optional) For special functionalities like a live chat toggle, you can enter a specific action string (e.g., `chat-toggle`).

### Using Lucide Icon Names

When entering icon names in the "Tagline Icon" or "Icon" fields, you must use the **kebab-case name** directly from the Lucide Icons website.

**Examples:**
*   For the "Mail" icon, enter `mail`.
*   For "Brain", enter `brain`.
*   For "Info Circle", enter `info`. (Note: `info-circle` is not a valid Lucide icon name; use `info` or `info-square` if available).
*   For "Clock", enter `clock`.
*   For "Git Branch", enter `git-branch`.
*   For "LinkedIn", enter `linkedin`.

You can find a full list of available icons and their names on the official Lucide Icons website: [https://lucide.dev/](https://lucide.dev/)

## 2. Netlify Forms Integration

The contact form is configured to work seamlessly with Netlify's built-in form handling. You do not need to do anything special in the Sanity Studio for this. When the site is deployed to Netlify, form submissions will automatically appear in your Netlify dashboard.

---

If you have any questions or need further assistance, please contact the development team.