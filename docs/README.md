# Event manager

## Itinerary Sub Items

Itinerary sub items are supported to allow scheduled playback, such as video on demand and rtmp feeds to have breakdowns of activities like chapters.

An example file for this could be `session-1.md` with the following contents:

``` markdown
---
title: Title of the sub session
speakers:
  - Bob Bobson, Head of Bobbins
  - James Jameson, Security expert
time: 2020-09-10 15:00:00
thumbnail: https://placekitten.com/408/287
---

Description of the event, to be HTML formatted and include markup
```

This can be uploaded as part of our CRUD as JSON format data, or can be uploaded as a bulk import.
