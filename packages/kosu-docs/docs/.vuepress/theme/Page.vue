<template>
  <div
    class="page"
    :style="{
         'padding-left' : paddingLeft +'px',
//         'padding-right' : 32+'px'
       }"
  >
    <slot name="top"/>

    <Content :custom="false"/>

    <!-- <div class="page-edit">
      <div class="edit-link" v-if="editLink">
        <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
        <OutboundLink/>
      </div>

      <div class="last-updated" v-if="lastUpdated">
        <span class="prefix">{{ lastUpdatedText }}:</span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </div>-->

    <div class="page-nav" v-if="prev || next">
      <router-link v-if="prev && (prev.title !== 'Home')" class="prev" :to="prev.path">
        <span>Prev:</span>
        <span class="btn-content">{{ prev.title || prev.path }}</span>
      </router-link>

      <router-link v-if="next" class="next" :to="next.path">
        <span>Next:</span>
        <br>
        <span class="btn-content">{{ next.title || next.path }}</span>
      </router-link>
    </div>

    <slot name="bottom"/>
  </div>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from "./util";

export default {
  props: ["sidebarItems"],
  data() {
    return {
      paddingLeft: 32
    };
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 703; // refer to config.styl

    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.paddingLeft = 0;
      } else {
        this.paddingLeft =
          (document.documentElement.clientWidth - 320 - 740) / 2;
        if (this.paddingLeft < 32) {
          this.paddingLeft = 32 + 256;
        } else {
          this.paddingLeft += 256;
        }
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },

  computed: {
    lastUpdated() {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleString(this.$lang);
      }
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },

    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },

    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig;

      let path = normalize(this.$page.path);
      if (endingSlashRE.test(path)) {
        path += "README.md";
      } else {
        path += ".md";
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path);
      }
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    }
  },

  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/${docsBranch}` +
          (docsDir ? "/" + docsDir.replace(endingSlashRE, "") : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;

      return (
        base.replace(endingSlashRE, "") +
        `/edit/${docsBranch}` +
        (docsDir ? "/" + docsDir.replace(endingSlashRE, "") : "") +
        path
      );
    }
  }
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  items.forEach(item => {
    if (item.type === "group") {
      res.push(...(item.children || []));
    } else {
      res.push(item);
    }
  });
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === page.path) {
      return res[i + offset];
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl';
@require './styles/wrapper.styl';

.page {
  padding-bottom: 2rem;

  .content {
    margin: 0 auto 0 0.7rem;

    .outbound {
      display: none;
    }
  }
}

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      color: $textColor;
      margin-right: 0.25rem;
    }

    .outbound {
      display: none;
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      color: $textColor;
    }

    .time {
      font-weight: 400;
      color: #aaa;
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  min-height: 2rem;
  margin-top: 0;
  // border-top: 1px solid #cfd4db73;
  padding-top: 2rem;
  padding-bottom: 1rem;
  // display: flex;
  // justify-content: space-between;
  overflow: auto; // clear float

  a {
    display: inline-block;
    width: 155px;
    height: 60px;
    padding-top: 15px;
    padding-left: 14px;
    padding-right: 10px;
    border-radius: 4px;
    opacity: 0.5;
    box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #ededed;
    background-color: #ffffff;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 33px;

    @media (max-width: $MQMobile) {
      width: 100px;
      padding-bottom: 2px;
    }

    span {
      display: block;
      margin-bottom: 3px;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 17px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.19;
      letter-spacing: normal;
      text-align: left;
      color: #404040;

      @media (max-width: $MQMobile) {
        font-size: 15px;
      }
    }

    .btn-content {
      font-weight: 400;
      font-size: 15px;

      @media (max-width: $MQMobile) {
        font-size: 13px;
      }
    }
  }

  a:hover {
    opacity: 1;
  }

  .next {
    padding-right: 20px;
    float: right;

    span {
      clear: right;
      float: right;
    }
  }
}

@media (max-width: $MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
