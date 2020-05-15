<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{module}}</v-toolbar-title>
        <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="addItem()">Add</v-btn>

<EditOrAddDialog v-if="dialog" :dialog="dialog" :module="module" :add="add" :edit="edit" :item="editedItem" @close="dialog=false" @open="dialog=true" @save="save($event)"/>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import EditOrAddDialog from './EditOrAddDialog.vue'

export default {
  components: {
    EditOrAddDialog
  },
  props: {
    module: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    search: '',
    dialog: false,
    editedItem: {
    },
    add: false,
    editedIndex: null
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    editItem (item) {
      this.add = false
      this.edit = true
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    addItem () {
      this.edit = false
      this.add = true
      this.dialog = true
    },
    deleteItem (event) {
      this.edit = false
      this.editedIndex = this.data.indexOf(event)
      const obj = Object.assign(event, {
        editedIndex: this.editedIndex,
        module: this.module.toLowerCase()
      })
      console.warn('edited index:', this.editedIndex)
      if (confirm('Are you sure you want to delete this item?')) {
        this.$emit('remove', obj)
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save (event) {
      const obj = Object.assign(event, {
        editedIndex: this.editedIndex
      })
      console.warn(obj)
      this.$emit('save', obj)
      this.close()
    }
  }
}
</script>
