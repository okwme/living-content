<template>
    <div>
      <iframe :src="attachment"></iframe>
      <span style="text-align:center"><a :href="attachment" target="_blank">Download</a></span>
    </div>
</template>

<script>
export default {
  name: 'Issue',
  props: ['slug', 'issues'],
  data () {
    return {

    }
  },
  computed: {
    attachment () {
      let issue = this.issues.find((issue) => {
        return issue.slug === this.slug
      })
      return issue && issue.attachment.replace('http://', 'https://')
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
