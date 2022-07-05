<template>
  <div class="q-pa-md">
    <q-table
      title="Tasks (Finished Tasks)"
      :data="data"
      :columns="columns"
      row-key="id"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="edit" :props="props">
            <!-- <a href="/props.row.edit">edit</a> -->
            <!-- <router-link to="/editTask" class="dropdown-item">edit</router-link> -->
            <router-link :to="{ name: 'editTask', params: { id: props.row.edit }}">edit</router-link>
          </q-td>
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="taskname" :props="props">
            {{ props.row.taskname }}
          </q-td>
          <q-td key="duration" :props="props">
            {{ props.row.duration }}
          </q-td>
          <q-td key="comment" :props="props">
            {{ props.row.comment }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  created () {
    for (var i = 0; i < localStorage.length; i++) {
      const uuid = localStorage.key(i);
      const task = JSON.parse(localStorage.getItem(uuid));
      this.data.push({
        id: i + 1,
        edit: uuid,
        date: task.date,
        taskname: task.taskType,
        duration: task.duration,
        comment: task.comment
      })
    }
  },
  data () {
    return {
      selected: [],
      // format: val => `${val}`,
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'left', field: row => row.id, style: 'width: 100px' },
        { name: 'edit', required: true, label: 'Edit', align: 'left', style: 'width: 100px' },
        { name: 'date', align: 'center', label: 'Date', field: 'date', sortable: true, align: 'left', style: 'width: 100px' },
        { name: 'taskname', label: 'Taskname', field: 'taskname', sortable: true, align: 'left', style: 'width: 100px' },
        { name: 'duration', label: 'Duration (hour)', field: 'duration', sortable: true, align: 'left', style: 'width: 100px' },
        { name: 'comment', label: 'Comment', field: 'comment', align: 'left', style: 'width: 300px' }
      ],
      data: []
    }
  }
}
</script>

<style scoped>

</style>
