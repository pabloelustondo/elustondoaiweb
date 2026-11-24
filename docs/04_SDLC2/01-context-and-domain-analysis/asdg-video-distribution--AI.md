# ASDG video distribution

**Status:** Draft for review

The [YouTube introduction](https://www.youtube.com/watch?v=yb4ggoYQrtw) is the source video. It is 2:12 long and is the first entry in the [Elustondo.ai ASDG playlist](https://www.youtube.com/playlist?list=PLQ5UBReAns0Q). The [ASDG repository](https://github.com/Elustondo-ai/asdg) is the source for the methodology and tooling.

## Placement

| Destination | Presentation |
|---|---|
| Website Methods page | A short introduction, a video player that loads on request, and links to the video, playlist, and repository. The text and links remain available if the embedded player cannot load. |
| Elustondo.ai LinkedIn Page | A company-authored post introducing the method and linking to the YouTube video. Feature the post if it should stay visible on the company Page. |
| Pablo’s LinkedIn profile | A Featured link to the introduction. A personal post can add context about why Pablo started ASDG. |
| YouTube channel | A short channel description, profile links to Elustondo.ai and LinkedIn, and the ASDG playlist as a starting point. |
| Website repository | README links to the site, the canonical video, the playlist, the methodology repository, and these notes. |

## Repeatable publishing workflow

1. Verify the source upload, title, visibility, playlist membership, and destination URLs. Reuse the video ID across placements.
2. Prepare copy in the voice of each destination. Record the proposed website placement and any profile changes for review.
3. Review the website diff and verify its video poster or player, direct watch link, responsive behavior, and keyboard controls before release.
4. After Pablo authorizes publication, apply the approved external changes. Verify each public view and record the resulting URLs.

## Methods player review before publishing

- Keep `yb4ggoYQrtw` as the source upload. Use the direct watch URL above and the `youtube-nocookie.com` embed; do not upload a duplicate for the website.
- Render no player, thumbnail, or YouTube script before the visitor activates **Load video player**. Explain that activation connects to YouTube; this is on-demand loading, not a claim that YouTube makes no network requests or processes no data after activation.
- Keep **Watch on YouTube** before the frame in visual and keyboard order, available both before and after loading. A blocked embed must not prevent direct viewing. Do not treat an iframe load event as proof that playback succeeded.
- Loading exposes YouTube's own play control without autoplay. Enter and Space operate the shell's load/hide button. Tab reaches the direct link and then the player. Hiding unmounts the frame so playback stops.
- Preserve the player's 200-pixel minimum height on narrow screens; the 320-pixel layout has a 256 × 200 frame, while desktop uses 760 × 427.5. Letterboxing on narrow screens is expected.
- Run the four frontend checks and test the production preview on desktop and mobile. Automated shell checks cannot prove live YouTube playback, captions, fullscreen, or physical-device behavior.

The [2026-11-24 local review](../09-build-and-test/asdg-methods-video-review--AI.md) records browser observations, automated results, and remaining limits. These changes remain local on `asdg-introduction` for Pablo's review; publication and deployment are separate decisions.
