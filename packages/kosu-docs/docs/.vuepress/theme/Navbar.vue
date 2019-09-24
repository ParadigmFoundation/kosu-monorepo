<template>
  <header class="navbar">
    <div class="navbar-left"
         :style="{
           'width' : navWidth +'px',
         }">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
      <router-link :to="$localePath" class="home-link">
        <img
          class="logo"
          v-if="$site.themeConfig.logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$siteTitle"
          :style="{
            'margin-left': paddingLeft+'px'
          }"
        >
        <span
          ref="siteName"
          class="site-name"
          v-if="$siteTitle"
          :class="{ 'can-hide': $site.themeConfig.logo }"
        ></span>
      </router-link>
    </div>


    <div class="links" :style="{
        'max-width': linksWrapMaxWidth + 'px',
        'padding-left' :  navWidth ? navWidth +32+'px' : '0',
        'padding-right' : navWidth ? paddingLeft +'px' : '98px',
        
      }">
      <!-- <NavLinks class="can-hide"/> -->
      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
      <SearchBox v-else-if="$site.themeConfig.search !== false"/>
    </div>
  </header>
</template>

<script>
import SidebarButton from "./SidebarButton.vue";
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import SearchBox from "./SearchBox.vue";
import NavLinks from "./NavLinks.vue";

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data() {
    return {
      linksWrapMaxWidth: null,
      paddingLeft: 32,
      navWidth: 0,
    };
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 703; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      // console.log(document.documentElement.clientWidth);
      if(document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.paddingLeft = 0;
        this.navWidth = 0;
      }
      else {
        this.paddingLeft = (document.documentElement.clientWidth - 320 - 740) / 2;
        if(this.paddingLeft < 32) {
          this.paddingLeft = 32;
        }
        this.navWidth = 256 + this.paddingLeft;
      }

      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
  }
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
@import './styles/config.styl';

$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;
$mobileSidebarWidth = $sidebarWidth * 0.72;
$mobileNavbarPaddingWidth = $navbarPaddingWidth - 6rem;
$searchBoxPaddingLeft = $sidebarWidth + 2rem;
$narrowSearchBoxPaddingLeft = $mobileSidebarWidth + 2rem;
.navbar {
  line-height: $navbarHeight - 1.4rem;
  position: relative;
  background-color: $backgroundColor;
  padding: 0;
  .navbar-left {
    
    width : $sidebarWidth;
    padding: $navbar-vertical-padding 0;
    background-color #f5f6f7;
    
  }

  // border-bottom: 1px solid #eaecef;
  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 2.2rem;
    min-width: $navbarHeight - 1.4rem;
    // margin-right: 0.8rem;
    margin-right: 0.8rem;
    margin-left : $navbarPaddingWidth;
    vertical-align: top;
    margin-top: 23px;
    position: relative;
    z-index: 2000;
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: $textColor;
    position: relative;
  }

  .links {
    width: 100%;
    padding-left : $searchBoxPaddingLeft;
    padding-right : 8rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
//    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;
    margin-top: 11px;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
      input {
        max-width: 698px;
      }
    }

    .nav-links {
      flex: 1;
    }
  }

  @media (max-width: $MQNarrow) {
      .links {
        padding-left : $narrowSearchBoxPaddingLeft;        
        padding-right : 2rem;
      }
      .logo {
        margin-left : $mobileNavbarPaddingWidth;
      }
      .navbar-left {
        width: $mobileSidebarWidth;
        padding: $navbar-vertical-padding 0;
        }
  }
  @media (max-width: $MQMobile) {
    .navbar-left 
    {
      background: none;
      .home-link {
        display: none;
      }
    }
      padding-left: 4rem;

      .can-hide {
        display: none;
      }

      .links {
        padding-left: 0.5rem !important;
        padding-right: 6rem;
        margin-top: 0 !important;
      }

      .logo {
        margin-top: 0 !important;
      }
  }
}
</style>
