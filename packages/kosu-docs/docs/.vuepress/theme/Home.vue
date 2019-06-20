<template>
  <div class="home page"
       :style="{
         'padding-left' : paddingLeft +'px',
       }">
    <div class="hero">
      <img v-if="data.heroImage" :src="$withBase(data.heroImage)" alt="hero">

      <h1>{{ data.heroText || $title || 'Hello' }}</h1>

      <p class="description">{{ data.tagline || $description || 'Welcome to your VuePress site' }}</p>

      <!-- <p class="action" v-if="data.actionText && data.actionLink">
        <NavLink class="action-button" :item="actionLink"/>
      </p> -->
    </div>

    <div class="features" v-if="data.features && data.features.length">
      <div class="feature" v-for="(feature, index) in data.features" :key="index">
        <a :href="feature.link">
          <div class="feature-image">
            <img :src="'/'+feature.food" />
          </div>
          <div class="feature-content">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </div>
        </a>
      </div>
    </div>
    <Content custom/>

    <!-- <div class="footer" v-if="data.footer">{{ data.footer }}</div> -->
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";

export default {
  components: { NavLink },
  data() {
    return {
      paddingLeft: 32,
    }
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 720; // refer to config.styl
    
    const handleLinksWrapWidth = () => {
      if(document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.paddingLeft = 0;
      }
      else {
        this.paddingLeft = (document.documentElement.clientWidth - 320 - 740) / 2;
        if(this.paddingLeft < 32) {
          this.paddingLeft = 32 + 256
        }
        else {
          this.paddingLeft += 256
        }
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },

  computed: {
    data() {
      return this.$page.frontmatter;
    },
    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  }
};
</script>

<style lang="stylus">
@import './styles/config.styl';

.home {
  padding: $navbarHeight 2rem 0;
  max-width : 740px;
  //  max-width: 960px;
  margin: 0px auto 0px 0rem;
  @media (max-width: $MQMobileNarrow) {  
    margin: 0px 0 0px auto;
  }
  .hero {
    text-align: left;
    padding-left: 2rem;
    padding-top: 2rem;

    img {
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 35px;
      margin-bottom: .1rem;
      @media (max-width: 1440px) {
        margin-top: 10px;
      }
    }

    h1, .description, .action {
      //margin: 1.8rem auto;
      text-align: left;
    }

    .description {
      max-width: 35rem;
      font-size: 15px;
      line-height: 1.5;
      color: #404040;
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      font-weight: bold;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 6px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;

      &:hover {
        background-color: darken($accentColor, 15%);
      }
    }
  }

  .features {
    // border-top: 1px solid $borderColor;
    
    padding-left: 2rem;
    margin-top: 3rem;
    
  }

  .feature {
    height: 90px;
    border-radius: 2px;
    box-shadow: 3px 9px 15px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #ededed;
    margin-bottom: 40px;

    @media (max-width: 1440px) {
        margin-bottom: 25px;
    }

    padding: 25px 24px 10px 24px;
    a {
      display: flex;
    }
    .feature-image {
      display: inline-block;
      img {
        margin-top: 7px;
        width: 56px;
        height: 56px;
        margin-right 25px;
      }
      
    }
    .feature-content {
      display: inline-block;
    }

    h2 {
      margin-top 0;
      margin-bottom: 3px;
      font-size: 20px;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: #404040;
    }

    p {
      margin-top: 5px;
      margin-bottom 0;
      color: #404040;
      line-height: 1.2;

      font-weight: 400;
      font-size: .9em;
    }
  }

  .feature:hover {
    h2 {
      color: $paragraphColor;
    }

    p {
      color: $paragraphColor;
    }
  }

  .footer {
    padding: 2.9rem;
    font-size: 0.8rem;
    // border-top: 1px solid $borderColor;
    text-align: center;
    color: $textColor;
  }
}



@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin: 0px 2rem 0px auto;
    // .hero {
    //   img {
    //     max-height: 210px;
    //     margin: 2rem auto 1.2rem;
    //   }

    //   h1 {
    //     font-size: 2rem;
    //   }

    //   h1, .description, .action {
    //     margin: 1.2rem auto;
    //   }

    //   .description {
    //     font-size: 1.2rem;
    //   }

    //   .action-button {
    //     font-size: 1rem;
    //     padding: 0.6rem 1.2rem;
    //   }
    // }

    // .feature {
    //   h2 {
    //     font-size: 1.25rem;
    //   }
    // }
  }
}
@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    // .feature {
    //   max-width: 100%;
    //   padding: 0 2.5rem;
    // }
  }
}
</style>
