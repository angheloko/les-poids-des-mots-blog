---
title: Why Solarized Light?
slug: solarized-theme-explained
date: 2024-03-10
excerpt: A deep dive into the color theory behind the Solarized palette and why it is perfect for long-form reading.
tags:
  - Color Theory
  - Design
readTime: 4 min read
---

# Why Solarized Light?

Solarized is a sixteen-color palette designed by Ethan Schoonover for use with terminal and gui applications. It has distinct advantages for readability.

## Precision Contrast

Solarized reduces brightness contrast but retains hue contrast. This means it's easier on the eyes than high-contrast black-on-white, while still being legible.

The background color, Base3 (`#fdf6e3`), is a creamy white that mimics the look of paper under warm light. The primary text color, Base00 (`#657b83`), provides enough contrast to be readable without the harshness of pure black.

```css
body {
  background-color: #fdf6e3;
  color: #657b83;
}
```

## Versatility

One of the best features of Solarized is that it works well in both light and dark modes. The colors are symmetric in LAB space, meaning the relationship between colors remains consistent regardless of the background.

## Conclusion

For a text-heavy blog, Solarized Light offers a superior reading experience that respects the user's eyes.
