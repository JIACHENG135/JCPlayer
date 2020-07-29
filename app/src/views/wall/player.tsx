import * as React from 'react'
import videojs from 'video.js'

// Styles
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  options: videojs.PlayerOptions
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
}

const VideoPlayer: React.FC<VideoPlayerProps> = (options: any) => {
  const videoNode = React.useRef<HTMLVideoElement>(null)
  const player = React.useRef<videojs.Player>()

  React.useEffect(() => {
    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options,
    }).ready(function() {
      console.log('onPlayerReady', this)
    })
    return () => {
      if (player.current) {
        player.current.dispose()
      }
    }
  }, [options])

  return <video ref={videoNode} className="video-js" />
}

export default VideoPlayer
