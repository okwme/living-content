<template>
  <div>
    <a href="/live"><img id="banner" src="/static/banner.gif"></a>
    <div :key="issue.alt" v-for='issue in issues'>
<!--       <a  target='_blank' :href='issue && issue.attachment'> -->
      <router-link :to="'/issue/' + issue.slug">
        <div :style='"background-image: url(" + issue.issueFG.display.url +")"'>
          <img class='sm' :src="issue.issueFG.display.url" :alt="issue.alt">
        </div>
        <div :style='"background-image: url(" + issue.issueBG.display.url +")"'>
          <img class='sm' :src="issue.issueBG.display.url" :alt="issue.alt">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Home',
  props: ['issues'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
#banner {
  max-width:100%;
  display:block;
  margin:0 auto;
}
</style>
