# DEMO

## Params supports

| Param          | Required | Default value | Description                                                                                                                                |
| -------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `licenseKey`   | Yes      | `undefined`   | License key JW Player of user                                                                                                              |
| `videoUrl`     | Yes      | `undefined`   | Public URL to video, not YouTube, Vimeo link                                                                                               |
| `thumbnailUrl` | No       | `undefined`   | Public URL to image for using as thumbnail of video                                                                                        |
| `autostart`    | No       | `true`        | Determines whether the player attempts to begin playback automatically when a page is loaded. Possible Values: `false`, `true`, `viewable` |
| `mute`         | No       | `true`        | Defines if the player should be muted during playback                                                                                      |
| `repeat`       | No       | `true`        | Determines if the player loops content after a playlist completes                                                                          |
| `pipIcon`      | No       | `true`        | Controls the Picture in Picture icon                                                                                                       |
| `aspectratio`  | No       | `16:9`        | Maintains proportions when width is a percentage                                                                                           |
| `playsinline`  | No       | `true`        | Support WebView                                                                                                                            |

## Global functions

### getCurrentTime()

> Intended to return the viewer's current position in a media file. Values may vary depending on the type of media. See the table below for more information.

| Media Type | Description                                                                                                                                     | Type   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| VOD        | The current playback position for a VOD file, in seconds                                                                                        | Number |
| Live       | How long the current stream has been playing, in seconds, plus the amount of time seeked at start in order to achieve an initial target latency | Number |
| DVR        | A negative value, indicating how far behind the viewer is from the stream's live position.1                                                     | Number |

Example:

```javascript
window.getCurrentTime();
```

### seekTo()

> Jump to the specified position within the currently playing item.

| Attribute | Description                          | Type   | Required |
| --------- | ------------------------------------ | ------ | -------- |
| position  | The position (in seconds) to seek to | Number | Yes      |

Example:

```javascript
window.seekTo(10);
```
