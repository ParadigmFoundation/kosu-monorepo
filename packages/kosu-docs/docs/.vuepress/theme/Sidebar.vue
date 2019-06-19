<template>
  <div class="sidebar"
       :style="{
         'width' : 256 + paddingLeft +'px',
       }">
    <NavLinks/>
    <slot name="top"/>
    <ul class="sidebar-links" 
        v-if="items.length"
        :style="{
          'padding-left' : paddingLeft+'px'
        }"
        >
      <li class="sidbar-links-header" v-for="(item, i) in items" :key="i">
        <!-- <img :class="item.title !== 'Home'?'img-other':'img-home'" :src="'/'+item.food"> -->
        <SidebarGroup
          v-if="item.title !== 'Home'"
          :item="item"
          :first="i === 0"
          :open="i === openGroupIndex"
          :collapsable="item.collapsable || item.collapsible"
          @toggle="toggleGroup(i)"
        />
        <!-- <SidebarLink v-else :item="homeItem(item)"/> -->
      </li>
    </ul>
    <slot name="bottom"/>
  </div>
</template>

<script>
import SidebarGroup from "./SidebarGroup.vue";
import SidebarLink from "./SidebarLink.vue";
import NavLinks from "./NavLinks.vue";
import { isActive } from "./util";

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },

  props: ["items"],

  data() {
    return {
      openGroupIndex: 0,
      paddingLeft: 32,
    };
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const handleLinksWrapWidth = () => {
      if(document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.paddingLeft = 32;
      }
      else {
        this.paddingLeft = (document.documentElement.clientWidth - 320 - 740) / 2;
        if(this.paddingLeft < 32) {
          this.paddingLeft = 32
        }
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },
  created() {
    this.refreshIndex();
  },

  watch: {
    $route() {
      this.refreshIndex();
    }
  },

  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items);
      if (index > -1) {
        this.openGroupIndex = index;
      }
    },

    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
    },

    isActive(page) {
      return isActive(this.$route, page.path);
    },
    homeItem(item) {
      return {
        ...item,
        food: item.food,
        path: '/home/',
        type: 'page',
      }
    }
  }
};

function resolveOpenGroupIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (
      item.type === "group" &&
      item.children.some(c => isActive(route, c.path))
    ) {
      return i;
    }
  }
  return -1;
}
</script>

<style lang="stylus">
@import './styles/config.styl';

$mobilesidbarLinkPaddingWidth = $sidbarLinkPaddingWidth - 6rem;

.sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    .sidbar-links-header {
      display: flex;
      img {
        display: inline-block;
        width: 19px;
        height: 19px;
        margin-top: 18px;        
        margin-left: 0.5rem;
      }
      .img-home {
        margin-top: 6px;
      }

    }
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  .sidebar-links {
    padding: 3.5rem 0.5rem 2.5rem $sidbarLinkPaddingWidth;
  }
}

@media (max-width: $MQNarrow) {
  .sidebar {
    .sidebar-links {
      padding: 2.5rem 0.5rem 2.5rem $mobilesidbarLinkPaddingWidth;
    }
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: none;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    .sidebar-links {
      padding: 1rem 0;
    }
  }
}
</style>
