---
layout: homepage
title: "Publications"
permalink: /publications/
description: "Peer-reviewed publications and accepted papers by Korede R. Bishi."
---

<main class="homepage-content">
  <header class="page-header">
    <h1>Publications</h1>
    <p><strong>Korede R. Bishi</strong> · University of Georgia</p>
    <p><a href="https://scholar.google.com/citations?user=qY9Vpm4AAAAJ&amp;hl=en">Google Scholar</a></p>
  </header>

  <section class="about-section">
    <h2>Peer-Reviewed and Accepted Papers</h2>
    <ol class="bibliography">
    {% for paper in site.data.publications.main %}
      <li id="{{ paper.anchor }}" style="margin-bottom:1.5rem;">
        <strong>{% if paper.page %}<a href="{{ paper.page | relative_url }}">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}</strong><br>
        {{ paper.authors }}<br>
        <em>{{ paper.conference }}</em>
        {% if paper.notes %}<br><strong>{{ paper.notes }}</strong>{% endif %}
        {% if paper.pdf %}<br><a href="{{ paper.pdf }}">PDF</a>{% endif %}
        {% if paper.page %} · <a href="{{ paper.page }}">Publication record</a>{% endif %}
        {% if paper.arxiv %} · <a href="{{ paper.arxiv }}">arXiv preprint</a>{% endif %}
        {% if paper.bibtex %} · <a href="{{ paper.bibtex | relative_url }}">BibTeX</a>{% endif %}
        {% if paper.code %} · <a href="{{ paper.code }}">Code and results</a>{% endif %}
      </li>
    {% endfor %}
    </ol>
  </section>
  <div class="page-footer"><p><a href="/">← Back to Homepage</a></p></div>
</main>
