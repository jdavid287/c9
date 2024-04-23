<template>
  <div id="app">
    <h1>Supabase Table Data</h1>
    <div v-if="isLoading">Loading...</div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
  name: 'App',
  data() {
    return {
      tableData: [],
      isLoading: true
    }
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const supabaseUrl = 'https://zquxlcxmdsuijzrafgkr.supabase.co/rest/v1/hello-vue?';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdXhsY3htZHN1aWp6cmFmZ2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTcxMTYsImV4cCI6MjAyOTI5MzExNn0.bo8vdKntIytMdo_RryCpOV_ebW_nPqSUma6VAlO9UOo';

        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase.from('hello-vue').select('*');

        if (error) {
          throw error;
        }

        if (data) {
          this.tableData = data;
        } else {
          console.log('No data returned from Supabase');
        }

        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
        this.isLoading = false;
      }
    }
  }
}
</script>
