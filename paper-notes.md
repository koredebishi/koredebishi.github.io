---
layout: homepage
title: "Paper Notes"
permalink: /paper-notes/
---

# Paper Notes

Short, structured notes for diffusion models, transformers, and other math-heavy papers. Each entry follows the same teaching-focused template you defined.

{% assign papers = site.categories.paper-notes | sort: "date" | reverse %}

<ul class="paper-notes-list">
  {% for post in papers %}
  <li class="paper-notes-list-item">
    <h2 class="paper-notes-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="paper-notes-meta">
      {% if post.date %}
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      {% endif %}
      {% if post.categories %}
        · {{ post.categories | join: ", " }}
      {% endif %}
    </p>
    {% if post.excerpt %}
    <p class="paper-notes-excerpt">
      {{ post.excerpt | strip_html | strip_newlines | truncate: 180 }}
    </p>
    {% endif %}
  </li>
  {% endfor %}
</ul>

