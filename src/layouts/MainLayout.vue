<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Task Management
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <TaskMenu
          v-for="link in TaskMenu"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import TaskMenu from 'components/TaskMenu.vue'

const linksData = [
  {
    title: 'New Task',
    icon: 'add_task',
    link: '/newtask'
  },
  {
    title: 'All Tasks',
    icon: 'task_alt',
    link: '/tasks'
  }
]

import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout',
  components: { TaskMenu },
  setup () {
    const leftDrawerOpen = ref(false)
    const TaskMenu = ref(linksData)

    return { leftDrawerOpen, TaskMenu }
  }
})
</script>
