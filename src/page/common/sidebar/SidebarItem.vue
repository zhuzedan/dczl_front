<template>
  <div v-if="item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <router-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <span v-if="onlyOneChild.meta" 
            :class="onlyOneChild.meta.icon"
            slot='title'>
            {{onlyOneChild.meta.title}}
          </span>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <span v-if="item.meta"
          :class="item.meta.icon"
          slot='title'>
          {{item.meta.title}}
        </span>
      </template>
      <template v-for="child in item.children">
        <SidebarItem
          v-if="child.children&&child.children.length"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu" 
        />
        <router-link v-else :to="resolvePath(child.path)" :key="child.path">
          <el-menu-item :index="resolvePath(child.path)">
            <span v-if="child.meta" 
              :class="child.meta.icon"
              slot='title'>
              {{child.meta.title}}
            </span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      // When there is only one child router, the child router is displayed by default
      if (children.length === 1) {
        this.onlyOneChild = children[0]
        return true
      }
      // Show parent if there are no child router to display
      if (children.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }else{
        return path.resolve(this.basePath, routePath)
      }
    },
    isExternalLink(routePath) {
      return /^(https?:|mailto:|tel:)/.test(routePath)
    }
  }
}
</script>
