<template>
  <div class="video-container">
    <video
      v-if="value"
      ref="video"
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
      v-if="begining"
      src="@/assets/images/video-background.png"
      class="poster">
    <div
      class="player"
      @click="onVideoClick">
      <img
        v-if="showPlay"
        src="@/assets/images/play.png"
        @click="handlePlay">
      <img
        v-if="showPause"
        src="@/assets/images/pause.png"
        @click="handlePause">
    </div>
    <div class="control-container">
      <img
        v-if="canPlay"
        src="@/assets/images/icon-play.png"
        class="control-btn"
        @click="handlePlay">
      <img
        v-else
        src="@/assets/images/icon-pause.png"
        class="control-btn"
        @click="handlePause">
      <span class="time-container">{{ currentTime }} / {{ totalTime }}</span>
      <div class="progress">
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import helper from '@/utils/helper'
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            begining: true,
            canPlay: true,
            showPlay: true,
            showPause: false,
            currentTime: '000:00',
            totalTime: '000:00',
            percentage: 0
        }
    },
    methods: {
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
            this.begining = false
        },
        handlePause() {
            this.$refs.video.pause()
        },
        onUpdate(e) {
            console.log(e.timeStamp)
        },
        onLoad() {
            document.querySelector('.poster').style.height = `${ this.$refs.video.offsetHeight }px`
            document.querySelector('.player').style.height = `${ this.$refs.video.offsetHeight }px`
            console.dir(this.$refs.video)
        },
        timeFormate(time, unit = 'ms') {
            if (unit !== 'ms') time = parseInt(Number(time) * 1000)
            else time = parseInt(time)
            console.log(time)
        }
    }
}
</script>
<style lang="scss" scoped>
.video-container{
  overflow: hidden;
  margin-bottom: 0.8rem;
  position: relative;
}
video{
  width: 100%;
  float: left;
}
.poster, .player{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  vertical-align: top;
}
.player{
  position: relative;
  img{
    position: absolute;
    height: 3.66rem;
    width: 3.66rem;
    left: 50%;
    top: 50%;
    margin-top: -1.83rem;
    margin-left: -1.83rem;
  }
}
.control-container{
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
    width: 16.8rem;
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
  }
}
</style>
