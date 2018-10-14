<template>
    <div>
      <iframe :src="attachment"></iframe>
      <span style="text-align:center"><a download="download" :href="attachment" target="_blank">Download</a></span>
    </div>
</template>

<script>
export default {
  name: 'Issue',
  props: ['slug', 'issues'],
  data () {
    return {
      attachment: '/static/LCL Press Kit.pdf'
    }
  }
}
</script>

<style lang="css" scoped>
iframe {
  border: 0px;
  padding:0px;
  width:100%;
  height: calc(100vh - 3.5rem);
}
span {
  line-height:3rem;
  font-size: 1rem;
  height:3rem;
  display: block;
}
</style>
