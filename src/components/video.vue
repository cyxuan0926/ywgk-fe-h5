<template>
  <div
    class="video-container"
    :style="canshow ? 'padding-bottom: 3.33rem;' : ''">
    <video
      ref="video"
      playsinline
      webkit-playsinline
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onUpdate"
      @loadedmetadata="onLoad">
      <source
        :src="value"
        type='video/mp4'>
      <source
        :src="value"
        type='video/webm'>
      <source
        :src="value"
        type='video/ogg'>您的浏览器不支持Video标签。
    </video>
    <img
      v-if="begining && loaded"
      :src="backgroundImg"
      class="poster">
    <div
      v-if="loaded"
      class="player"
      @click="onVideoClick">
      <img
        v-if="showPlay"
        :src="playImg"
        @click="handlePlay">
      <img
        v-if="showPause"
        :src="pauseImg"
        @click="handlePause">
    </div>
    <div
      v-show="canshow"
      class="control-container">
      <img
        v-if="canPlay"
        :src="iconPlay"
        class="control-btn"
        @click="handlePlay">
      <img
        v-else
        :src="iconPause"
        class="control-btn"
        @click="handlePause">
      <span class="time-container">{{ currentTime }} / {{ totalTime }}</span>
      <div
        class="progress"
        @click="handleTapProgress">
        <div
          class="bar"
          :style="'left: ' + percentage + '%;'"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import helper from '@/utils/helper'
import backgroundImg from '@/assets/images/video-background.png'
import playImg from '@/assets/images/play.png'
import pauseImg from '@/assets/images/pause.png'
import iconPlay from '@/assets/images/icon-play.png'
import iconPause from '@/assets/images/icon-pause.png'
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        audioStatus: {
            type: Number,
            default: 2
        },
        videoStatus: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
            backgroundImg,
            playImg,
            pauseImg,
            iconPlay,
            iconPause,
            begining: true,
            canPlay: true,
            showPlay: true,
            showPause: false,
            currentTime: '00:00',
            totalTime: '00:00',
            percentage: 0,
            touch: {
                startX: 0,
                moveX: 0,
                endX: 0,
                maxMove: 0,
                offset: 0
            },
            moving: false,
            loaded: false,
            canshow: false
        }
    },
    watch: {
        loaded(val) {
            if (val) {
                setTimeout(() => {
                    this.canshow = val
                    this.setTouch()
                }, 100)
            }
            else {
                this.canshow = false
            }
        },
        videoStatus(val) {
            if (!this.$refs.video.paused) {
                if (!val) this.handlePause()
            }
        }
    },
    methods: {
        handleTouchStart(e) {
            this.touch.startX = e.targetTouches[0].pageX
            this.moving = true
        },
        handleTouchMove(e) {
            this.touch.moveX = e.targetTouches[0].pageX
            if (this.touch.moveX <= this.touch.offset) {
                this.touch.moveX = this.offset
                this.percentage = 0
            }
            else if (this.touch.moveX >= this.touch.offset + this.touch.maxMove) {
                this.touch.moveX = this.touch.offset + this.touch.maxMove
                this.percentage = 100
            }
            else {
                this.percentage = (this.touch.moveX - this.touch.offset) / this.touch.maxMove * 100
            }
            this.currentTime = this.timeFormate(Math.round(this.percentage * this.$refs.video.duration / 100))
        },
        handleTouchEnd(e) {
            this.setCurrentTime()
        },
        handleTapProgress(e) {
            if (e.pageX >= this.touch.offset + this.touch.maxMove) {
                this.percentage = 100
            }
            else {
                this.percentage = (e.pageX - this.touch.offset) / this.touch.maxMove * 100
            }
            this.setCurrentTime()
        },
        setCurrentTime() {
            this.moving = false
            this.$refs.video.currentTime = this.percentage * this.$refs.video.duration / 100
        },
        onVideoClick(e) {
            if (!this.showPause && e.target.tagName !== 'IMG' && !this.showPlay) {
                this.showPause = true
                setTimeout(() => {
                    this.showPause = false
                }, 3000)
            }
        },
        onPause() {
            this.canPlay = true
            this.showPause = false
            this.showPlay = true
        },
        onPlay() {
            this.canPlay = false
            this.showPause = false
            this.showPlay = false
        },
        handlePlay() {
            this.$refs.video.play()
            this.$emit('update:audioStatus', 0)
            if (this.begining) this.begining = false
        },
        handlePause() {
            this.$refs.video.pause()
            this.$emit('update:audioStatus', 1)
        },
        onUpdate(e) {
            if (this.moving) return
            if (this.$refs.video.currentTime / this.$refs.video.duration === 1 || this.$refs.video.ended) {
                this.percentage = 0
                this.currentTime = '00:00'
            }
            else {
                this.currentTime = this.timeFormate(Math.round(this.$refs.video.currentTime))
                this.percentage = this.$refs.video.currentTime * 100 / this.$refs.video.duration
            }
        },
        onLoad() {
            this.totalTime = this.timeFormate(Math.round(this.$refs.video.duration), 's')
            this.loaded = true
            setTimeout(() => {
                document.querySelector('.video-container').style.height = `calc(${ this.$refs.video.offsetHeight }px + 3.33rem)`
            }, 100)
        },
        timeFormate(time, unit = 'ms') {
            let second = time % 60, munite = parseInt(time / 60), hour = parseInt(munite / 60), timeStr = ''
            if (hour > 0) timeStr = `${ this.fillPre(hour) }:${ this.fillPre(munite) }:${ this.fillPre(second) }`
            else if (munite > 0) timeStr = `${ this.fillPre(munite) }:${ this.fillPre(second) }`
            else timeStr = `00:${ this.fillPre(second) }`
            return timeStr
        },
        fillPre(num) {
            return `00${ num }`.slice(-2)
        },
        setTouch() {
            setTimeout(() => {
                this.touch.maxMove = document.querySelector('.video-container .progress').getBoundingClientRect().width
                this.touch.offset = document.querySelector('.video-container .progress').getBoundingClientRect().left
            }, 100)
        }
    }
}
</script>
<style lang="scss" scoped>
.video-container{
  position: relative;
  overflow: hidden;
  margin-bottom: 0.8rem;
  position: relative;
  // background-color: blue;
  // padding-bottom: 3.33rem;
  height: 0;
}
video{
  width: 100%;
  float: left;
}
video::-webkit-media-controls {
  display:none !important;
}
.poster, .player{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 3.33rem);
  vertical-align: top;
//   height: 6rem;
}
.player{
  img{
    position: absolute;
    vertical-align: middle;
    height: 3.66rem;
    width: 3.66rem;
    left: 50%;
    top: 50%;
    margin-top: -1.83rem;
    margin-left: -1.83rem;
  }
}
.control-container{
  position: absolute;
  bottom: 0;
  left: 0;
  background: #ebebeb;
  height: 3.33rem;
  width: 100%;
  float: left;
  line-height: 3.33rem;
  padding: 0 1.25rem;
  .control-btn{
    height: 1.17rem;
    width: 0.92rem;
    margin-top: 1.08rem;
    margin-right: 0.48rem;
    float: left;
  }
  .time-container{
    color: #333333;
    font-size: 0.8rem;
    float: left;
    width: 7.6rem;
    height: 100%;
    overflow: hidden;
    text-align: center;
  }
  .progress{
    height: 0.17rem;
    background: #264C90;
    width: calc(100% - 10rem);
    float: right;
    position: relative;
    margin-top: 1.58rem;
  }
  .bar{
    background: #264C90;
    border-radius: 50%;
    height: 0.8rem;
    width: 0.8rem;
    position: absolute;
    top: -0.32rem;
    left: 0;
    transition: left 0.1s linear;
    cursor: pointer;
  }
}
</style>
