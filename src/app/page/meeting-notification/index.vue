<template>
  <div class="law-box">
    <div class="law-content">
        <h3 class="law-title title">《可视电话告知书》</h3>
        <p>尊敬的服刑人员亲属:</p>
        <p>你好!</p>
        <p>为了拉近服刑人员与家庭、社会的距离，建立亲属与服刑人员更加紧密的联系，进一步发挥亲人、家庭帮教的作用，以教育、感化挽救服刑人员，{{ jailName }}搭建了监狱与服刑人员家庭联动的“平台”——可视电话系统，通过这个系统，各位亲属可以实现在家中用智能手机与服刑人员进行可视电话通话，从而解决许多服刑人员亲属因路途遥远长途奔波以及需要请假迁就会见时间等实际问题。</p>
        <p>为了保证监狱工作的安全稳定进行，有可视电话需求的亲属请仔细阅读以下须知，并严格遵守：</p>
        <p>通话场所：家中或其他封闭空间，须确保通话场所无其他未经审批或无关人员。</p>
        <p>通话时间：按照可视电话系统预约通话时间。</p>
        <p>通话时长：通话时长上限以监狱管理部门规定为准。</p>
        <p>通话频次：每月可申请可视电话通话一次，可视电话通话一次折抵一次现场会见；新入监的罪犯在入监教育期间一般不安排可视电话通话。</p>
        <p>服刑人员亲属（或监护人）在通话时应做到：</p>
        <p>一、通话前配合监狱工作人员接受线上安全检查，通话场所应选择家中等封闭空间，不得在室外或其他公共场所视频通话，严禁其他未经审批或无关人员参与通话。</p>
        <p>二、通话时应遵守可视电话相关管理制度，通话时不得进行拍照、录音、录像以及截屏。</p>
        <p>三、通话时使用普通话交谈，不得使用隐语、暗语或有特殊含义的手势及肢体语言进行交谈。</p>
        <p>四、通话时需穿着得体，不得穿着暴露衣服。</p>
        <p>五、谈话内容不得涉及国家和有碍罪犯改造或监管安全的内容。</p>
        <p>六、通话过程中,请根据电话会见系统预约的时间，提前打开“国科服务”APP，保证正常联网运行，需保证手机屏幕处于常亮状态，不得接听其他电话，对因接听电话、手机故障等原因造成的视频通话中断后果由亲属承担。</p>
        <p>七、按照可视亲情电话系统开发公司收费标准，该费用由开发方（国科政信科技（北京）股份有限公司）收取，监狱是分文不收的。</p>
        <p>八、可视电话是监狱现有会见方式的补充，监狱方还提供了司法局的远程视频会见和监狱的可视电话两种方式，每月只能选择一种方式进行会见。</p>
        <p>九、通话过程中若出现违反相关规定的行为，监狱则立即停止视频通话，并列入可视电话黑名单，以后将不能再使用可视电话系统进行视频通话。情节严重的，将依法追究相关责任。</p>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            jailName: ''
        }
    },

    mounted() {
        this.jailName = this.$route.query.jailName || '监狱'
    }
}
</script>
<style lang="scss" scoped>
.title {
  color: #222;
}
p {
  line-height: 1.6rem;
}
.detail{
  padding: 0.3rem 0.3rem 1rem;
  box-sizing: border-box;
  overflow-x: hidden;
  text-align: justify;
}

</style>
