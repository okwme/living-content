<template>
  <div id="app" >
    <div 
    @mouseover='mouseover()'
    @mouseleave='mouseleave()'
    @click.stop.self='swap()'
    class='sidebar left' :class='{aboutVisible:aboutVisible}'>
      <a id='l' href='#' @click.self.prevent='swap()'>L</a>
      <div class='about' >
        <div v-html='about && about.content_html'></div>
        <!-- Begin MailChimp Signup Form -->
        <div id="mc_embed_signup">
        <form action="//adrianablidaru.us16.list-manage.com/subscribe/post?u=ba2d1310d042f6897c0421cea&amp;id=4a37b4b5fd" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
          
        <div class="mc-field-group">
          <label for="mce-EMAIL"></label>
          <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
        </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_ba2d1310d042f6897c0421cea_4a37b4b5fd" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
            </div>
        </form>
        </div>
        <!--End mc_embed_signup-->
      </div>
    </div>
    <div class='sidebar right'>
      <a id='c' href='mailto:info@livingcontent.online' target='_blank'>C</a>
    </div>
    <div class='issues' @click='aboutVisible = false'>
      <div v-for='issue in issues'>
        <a  target='_blank' :href='issue.attachment'>
          <div :style='"background-image: url(" + issue.issueFG.display.url +")"'></div>
          <div :style='"background-image: url(" + issue.issueBG.display.url +")"'></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      aboutVisible: false,
      content: [],
      channel: 'living-content-1503648393',
      touchscreen: false
    }
  },
  mounted () {
    this.queryChannel()
    window.addEventListener('touchstart', () => {
      this.touchscreen = true
    })
  },
  computed: {
    issues () {
      return this.content.filter((block) => {
        return block.class === 'Channel' && block.contents
      }).map((channel) => {
        return {
          attachment: this.attachmentURL(channel),
          issueBG: this.issueBG(channel),
          issueFG: this.issueFG(channel)
        }
      })
    },
    about () {
      return this.content.filter((block) => {
        return block.class === 'Text'
      }).pop()
    }
  },
  methods: {
    mouseover () {
      if (this.touchscreen) return
      this.aboutVisible = true
    },
    mouseleave () {
      if (this.touchscreen) return
      this.aboutVisible = false
    },
    swap () {
      if (!this.touchscreen) return
      this.aboutVisible = !this.aboutVisible
    },
    queryChannel () {
      this.$axios.get('https://api.are.na/v2/channels/' + this.channel).then((result) => {
        this.content = result.data && result.data.contents
        for (var i = 0; i < this.content.length; i++) {
          var content = this.content[i]
          if (content.class === 'Channel' && !content.contents) {
            this.$axios.get('https://api.are.na/v2/channels/' + content.slug).then((result) => {
              var key = this.content.findIndex((c) => {
                return c.id === result.data.id
              })
              this.content[key].contents = result.data.contents
              // this.content.splice(key, 1, result.data)
            }).catch((err) => {
              console.error(err)
              this.queryChannel()
            })
          }
        }
      }).catch((err) => {
        console.error(err)
        this.queryChannel()
      })
    },
    attachment (channel) {
      return channel.contents.filter((block) => {
        return block.class === 'Attachment'
      }).pop()
    },
    attachmentURL (channel) {
      return this.attachment(channel).attachment.url
    },
    attachmentIMG (channel) {
      return this.attachment(channel).image
    },
    issueIMGs (channel) {
      return channel.contents.filter((block) => {
        return block.class === 'Image'
      })
    },
    issueBG (channel) {
      return this.issueIMGs(channel)[0].image
    },
    issueFG (channel) {
      var imgs = this.issueIMGs(channel)
      return imgs.length > 1 ? imgs[1].image : this.attachmentIMG(channel)
    }
  }
}
</script>

<style lang='scss'>
* {
  box-sizing: border-box;
}
body {
  font-family: 'Montserrat', sans-serif;
  padding:0;
  margin:0;
  background-color: black;
  color: white;
}
a, a:hover, a:active, a:visited {
  text-decoration: none;
}
#app {
  min-height:100vh;
}
.sidebar {
  position:fixed;
  z-index:2;
  top:0px;
  height:100vh;
  width:60px;
  > a {
    color: white;
    position: fixed;
    font-size: 48px;
    &#l {
      top:2px;
      left:15px;
    }
    &#c {
      bottom:0px;
      right:11px;
    }
  }
  &.left {
    background-color: black;
    border-right: 3px solid white;
    width:380px;
    left:-320px;
    transition: left ease 500ms, width ease 500ms;
    &.aboutVisible {
      width:320px;
      left:0px;
    } 
    .about {
      width:320px;
      margin-top:60px;
      padding: 15px;
      input {
        border: 0px;
        background-color: transparent;
        color: white;
        font-size:1rem;
        padding:0px;
        line-height:1rem;
        &[type='email'] {
          width:100%;
          border-bottom:1px solid white;
          margin-bottom:10px;
          margin-top:30px;
        }
      }
    }
  }
  &.right {
    right:0px;
    border-left: 3px solid white;
  }
}
.issues {
  position: relative;
  left:0px;
  transition: left ease 500ms;
  padding:0px 60px;
  min-height:100vh;
  &.aboutVisible {
    left:320px;
  }
  div {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  > div {
    display: inline-block;
    position:relative;
    width: 220px;
    height: 285px;
    margin:40px 20px 0px 20px;
    div {
      position: absolute;
      top:0px;
      left:0px;
      width:100%;
      height:100%;
      &:first-of-type{
        z-index:1;
        transition: opacity 500ms ease;
          &:hover {
          opacity:0;
        }
      }
    }
    
  }
}
$tablet-min-width: 768px;
@media only screen and (min-width : 0px) and (max-width : $tablet-min-width) {
  .issues {
      padding:60px 0px 100px 0px;

      > div {
        display:block;
        margin:40px auto 0px auto;
      }
  }
  .sidebar {
    background-color: black;
    &.left {

      width:100vw;
      height:60px;
      left:0px;
      border-right:0;
      border-bottom:3px solid white;
      z-index:3;
      &.aboutVisible {
        left:0px;
        width:100vw;
      }
      .about {
        position: absolute;
        background-color: black;
        height:calc( 100vh - 60px);
        overflow: auto;
        width:100vw;
        z-index:3;
        top:60px;
        margin-top:0px;
        left:-100vw;
        transition: left 500ms ease;
      }
      &.aboutVisible .about {
        left:0px;
      } 
    }
    &.right {
      z-index:2;
      width:100%;
      height:60px;
      left:0px;
      border-left:0;
      border-top: 3px solid white;
      top: inherit;
      bottom:0px;
    }
  }
}
</style>
