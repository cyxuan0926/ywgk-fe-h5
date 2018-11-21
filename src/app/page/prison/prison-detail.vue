<template>
    <div
      class="detail"
      :class="[
        { 'loading' : fullLoading },
        { 'no-content' : !fullLoading && (!prison || !prison.createdAt) }
      ]">
      <div class="content inner-content"  v-if="prison && prison.createdAt">
          <h3 class="title">{{ prison.title }}</h3>
          <p class="time">发布于  {{ prison.createdAt | formatDate }}</p>
          <div
              class="video-container"
              style="margin-bottom: 1.4rem"
              v-if="prison.videoPath">
              <video
                  style="object-fit:fill"
                  webkit-playsinline
                  playsinline
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  x5-video-orientation="portraint"
                  controls
                  preload="metadata">
                  <source
                      :src="prison.videoPath + '?token=' + $store.state.img.imgToken"
                      type="video/mp4">
                  <source
                      :src="prison.videoPath + '?token=' + $store.state.img.imgToken"
                      type="video/webm">
                  <source
                      :src="prison.videoPath + '?token=' + $store.state.img.imgToken"
                      type="video/ogg">
                  您的浏览器不支持Video标签。
              </video>
          </div>
          <div
              class="image-container"
              style="margin-bottom: 1.4rem"
              v-if="prison.imageUrl">
              <img
                  class="prison-image"
                  :src="prison.imageUrl + '?token=' + $store.state.img.imgToken"
                  alt="监狱图片">
          </div>
          <div
              class="audio-container"
              v-if="prison.audioPath">
              <button
                  style="outline: none;margin: 0;padding: 0;border: none;background: transparent;"
                  @click.prevent="handleAudio">
                  <img
                  src="@/assets/images/audio-icon.png"
                  style="width: 2.1rem;vertical-align: middle;cursor: pointer"
                  alt="音频icon">
              </button>
              <div class="audio-container-right">
                  <div
                      class="progress__bar"
                      :style="{'width':progressBarVal+'%'}"
                      ref="progress-bar"/>
                  <audio
                      ref="audio"
                      @timeupdate="handleTimeUpdate">
                      <source
                          :src="prison.audioPath + '?token=' + $store.state.img.imgToken"
                          type="audio/mp3">
                      <source
                          :src="prison.audioPath + '?token=' + $store.state.img.imgToken"
                          type="audio/ogg">
                      您的浏览器不支持Audio标签
                  </audio>
              </div>
          </div>
          <p
              class="prison-description-title"
              style="margin-bottom: .9rem;margin-top: 0">
              监狱简介
          </p>
          <div
              class="prison-detail"
               v-html="prison.description" />
      </div>
    </div>
</template>
<script>
export default {
    props: ['api', 'fullLoading'],
    data() {
        return {
            prison: {},
            progressBarVal: 0
        }
    },
    mounted() {
        this.render()
    },
    methods: {
        render() {
            if (!this.$route.params.id) return
            this.api.getPrisonDetail(this.$route.params.id).then(res => {
                if (res && res.code === 200) {
                    if (!res.data.jails) return
                    let description = res.data.jails.description.replace(/poster="\/static\/images\/video-cover.png"/g, `poster="${ location.pathname }static/images/video-cover.png"`).replace(/(<(\S*?)[^>]*)\sheight="\d*"/g, '$1')
                    res.data.jails.description = description
                    this.prison = res.data.jails
                }
            })
        },
        handleTimeUpdate() {
            if (this.$refs.audio.currentTime / this.$refs.audio.duration === 1 || this.$refs.audio.ended || this.$refs.audio.paused || this.progressBarVal >= 96) {
                this.progressBarVal = 0
            }
            else {
                this.progressBarVal += 32
            }
        },
        handleAudio() {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
            }
            else {
                this.$refs.audio.pause()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.detail{
  padding: 1.9rem 1.4rem 2.7rem;
  box-sizing: border-box;
  overflow-x: hidden;
  .title{
      font-size:1.5rem;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(0,0,0,1);
      margin-bottom: .9rem;
      margin-top: 0;
  }
  .time{
      margin-top: 0;
      font-size:1.1rem;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(102,102,102,1);
      margin-bottom: 1.9rem;
  }
}
.content{
  background: #fff;
  border-radius: 0.1rem;
}
.prison-image {
    display: block;
    max-width: 100%;
    margin: 0 auto;
}
.prison-description-title {
    font-size:1.3rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(51,51,51,1);
}
.audio-container {
    display: flex;
    justify-items: flex-start;
    align-items:center;
    background:rgba(235,235,235,1);
    padding: 1rem 1.3rem;
    margin-bottom: 1.4rem;
}
.prison-detail {
    font-size:1.1rem !important;
    font-family:PingFang-SC-Medium !important;
    font-weight:500 !important;
    color:rgba(102,102,102,1) !important;
    text-indent: 2.4rem;
}
.audio-container-right {
    width: 86%;
    height: .7rem;
    border: .05rem solid #2B569A;
    margin: 0 auto;
    border-radius: .4rem;
    display:flex;
    align-items:center;
}
.progress__bar {
    height: .16rem;
    background: #264c90;
    margin-left: .4rem
}
</style>
