# Event manager

## Data structure

* Organisation - the organisation owning multiple events, example: `Facebook Inc.`
  * Event - an event occurring for an organisation, example: `Workplaces launch event`
    * Itinerary - a specific set of items occurring, example: `Plenary Room`, `Breakout Room 1`, `Networking Room`
      * Itinerary item - a specific, timed activity, happening in an itinerary, example: `RTMP live stream`
        * Itinerary sub item - a detailed breakdown of an activity within an item, example: `Bob Bobson, 15 minute introduction`

## Supported Itinerary item types

1. RTMP Live stream (streamed into our RTMP servers with a unique access token retrieved from the gateway - supports live, record and rehearsal modes)
1. Zoom video call (with participant criteria)
1. WebRTC video call (with participant criteria)
1. Video playback (video upload and URL delivered via the Content API to the CDN via encoding)
1. Forum (moderators and participants)
1. Chat room (moderators and participants)
1. HTML (direct upload of third-party content such as Cisco Webex)

## Itinerary Sub Items for RTMP and Video playback itinerary items

Itinerary sub items are supported to allow scheduled details. Video on demand and rtmp item types support sub items. These are like `chapters` of a movie.

All sub-items must be specified individually, in the following format:

Meta formatting for the file:

``` markdown
title: String
speakers:
  - A list of strings
publishedTime: YYYY-MM-DD hh:mm:ss ISO 8601 UTC date (to be seen by the audience)
publishedDuration: MM:SS (to be seen by the audience)
liveTime: YYYY-MM-DD hh:mm:ss ISO 8601 UTC date (to be used by the code for when to display)
liveDuration: MM:SS (to be used by the code)
thumbnail: Absolute URL String, or relative filename if assets provided
```

An example file for this could be `session-1.md` with the following contents:

``` markdown
---
title: Introduction from CEO
speakers:
  - Bob Bobson, CEO at Lorem Ipsum Inc.
  - James Jameson, Head of Marketing
publishedTime: 2020-09-10 15:00:00
publishedDuration: 15:00
liveTime: 2020-09-10 14:59:14
liveDuration: 15:13
thumbnail: https://placekitten.com/408/287
---

Description of the event, to be HTML formatted and include markup, this can be a short sentence, or an unlimited section of content. The only requirement is that it must fit within the constraints of the designed template.
```

This can be uploaded as part of our CRUD as JSON format data, or can be uploaded as a bulk import of markdown files.
