<template>
  <div
    class="audio-container"
    :style="'width:' + width"
    v-show="show">
    <img
      :src="audioImg"
      style="width: 1.28rem;vertical-align: middle;cursor: pointer;height: 1.28rem;"
      @click="handleAudio"
      alt="按钮图片">
    <div class="audio-container-right">
      <div
        class="progress__bar"
        :style="{ width: progressBarVal + '%' }"
        ref="progress-bar"/>
      <audio
        :src="value"
        ref="audio"
        @durationchange="getTotalDuration"
        @timeupdate="handleTimeUpdate"
        @canplay="getTotalDuration"
        @loadedmetadata="getTotalDuration">
        <!-- <source
          :src="value"
          type="audio/mp3">
        <source
          :src="value"
          type="audio/ogg">
        <source
          :src="value"
          type="audio/mpeg">
        您的浏览器不支持Audio标签 -->
      </audio>
    </div>
    <div class="audio-container-time">
      <span>{{ leastTime }}</span>
    </div>
  </div>
</template>
<script>
/* eslint-disable import/no-duplicates */
import AudioThree from '@/assets/images/audio-icon.png'
import AudioOne from '@/assets/images/audio-no.png'
import audioTwo from '@/assets/images/audio-one.png'
import helper from '@/utils/helper'
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '15.36rem'
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
            show: false,
            leastTime: null,
            progressBarVal: 0,
            audioImgs: [AudioOne, audioTwo, AudioThree],
            audioImg: AudioThree,
            interval: null
        }
    },
    watch: {
        audioStatus(val) {
            if (!this.$refs.audio.paused) {
                if (!val) {
                    this.$refs.audio.pause()
                    clearInterval(this.interval)
                    this.$emit('update:videoStatus', 1)
                    this.audioImg = AudioThree
                }
            }
        }

    },
    methods: {
        handleTimeUpdate() {
            if (!this.$refs.audio) return
            let totalTime = parseInt(this.$refs.audio.duration),
                currentTime = parseInt(this.$refs.audio.currentTime)
            this.leastTime = helper.durationFormat(totalTime - currentTime, { format: 'mm:ss' })
            if (this.$refs.audio.currentTime / this.$refs.audio.duration === 1 || this.$refs.audio.ended) {
                this.progressBarVal = 0
                this.interval && clearInterval(this.interval)
                this.audioImg = AudioThree
                this.leastTime = helper.durationFormat(totalTime, { format: 'mm:ss' })
            }
            else {
                this.progressBarVal = (currentTime / totalTime * 100)
            }
        },
        handleAudio() {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.$emit('update:videoStatus', 0)
                let index = 0
                this.interval = setInterval(() => {
                    this.audioImg = this.audioImgs[index]
                    index++
                    if (index > 2) index = 0
                }, 1000)
            }
            else {
                this.$refs.audio.pause()
                this.$emit('update:videoStatus', 1)
                clearInterval(this.interval)
                this.audioImg = AudioThree
            }
        },
        getTotalDuration(val) {
            this.leastTime = helper.durationFormat(parseInt(this.$refs.audio.duration), { format: 'mm:ss' })
            if (!this.show) this.show = true
            // if (this.$refs.audio.duration && !isNaN(this.$refs.audio.duration) && !this.leastTime) this.leastTime = helper.durationFormat(parseInt(this.$refs.audio.duration), { format: 'mm:ss' })
        }
    }
}
</script>
<style lang="scss" scoped>
.audio-container {
  display: flex;
  width: 15.36rem;
  height: 2.88rem;
  justify-items: flex-start;
  align-items:center;
  background:rgba(235,235,235,1);
  padding: 0 0.32rem;
  border-radius: 0.32rem;
}
.audio-container-right {
  width: calc(100% - 5.6rem);
  height: 0.8rem;
  border: 1px solid #2B569A;
  margin: 0 auto;
  border-radius: 0.32rem;
  display:flex;
  align-items:center;
  padding: 0 0.32rem 0 0.32rem;
}
.progress__bar {
  height: 0.16rem;
  background: #264c90;
  /*margin-left: 0.32rem*/
}
.audio-container-time {
  font-size: 1rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(51,51,51,1);
}
</style>
