<template>
  <div class="q-pa-md main-div">
    <form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input ref="date" outlined v-model="date" mask="date" label="Select Date" :rules="['date']">
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    
        <q-select ref="task" outlined 
            v-model="taskType" 
            :options="options" 
            label="Select your task" 
            :rules="[val => val !== null && val !== '' || 'Task is required']"
        />
        <q-input ref="duration" outlined v-model="duration" 
            label="Duration (Between 0.5 to 12)" 
            type="number" min="0.5" max="12" step="0.5"
            :rules="[
            val => val !== null && val !== '' || 'Duration is required',
            val => val > 0 && val <= 12 && val%0.5 === 0 || 'Invalid Duration'
            ]"
        />

        <q-input
            ref="comment"
            outlined 
            v-model="comment" 
            label="Enter a comment" 
            type="textarea"
            />
        <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </form>
  </div>
</template>
<script>
export default {
    name: 'TaskEditor',
    mounted() {
        console.log('Mounted')
        if(this.$route.params.id) {
            this.editorMode = 'edit';
            let cachedData = JSON.parse(localStorage.getItem(this.$route.params.id));
            console.log(cachedData);
            this.comment =  cachedData.comment;
            this.duration = cachedData.duration;
            this.taskType = cachedData.taskType;
            this.date = cachedData.date;
        }
    },
    data () {
        console.log('data...')
        return {
            editorMode: 'create',
            date: new Date(),
            comment: '',
            duration: null,
            taskType: null,
            options: [
                'Shopping', 'Fishing', 'Driving'
            ]
        }
    },
    methods: {
        onSubmit(event) {
            console.log(event)
            let task = {
                date: this.date,
                taskType: this.taskType,
                duration: this.duration,
                comment: this.comment,
            }
            console.log("MODE: "+this.editorMode);
            if(this.editorMode == 'edit') {
                localStorage.setItem(this.$route.params.id, JSON.stringify(task));
            } else {
                localStorage.setItem(Date.now(), JSON.stringify(task));
            }
            
            this.onReset()
        },
        onReset() {
            this.date = new Date()
            this.taskType = null
            this.duration = null
            this.comment = null
        }
    }
}
</script>

<style scoped>
.main-div {
    max-width: 700px;
    margin: 20px auto;
}
</style>