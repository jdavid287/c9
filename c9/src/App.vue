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
        <tr v-for="row in tableData" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zquxlcxmdsuijzrafgkr.supabase.co/rest/v1/hello-vue?';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdXhsY3htZHN1aWp6cmFmZ2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTcxMTYsImV4cCI6MjAyOTI5MzExNn0.bo8vdKntIytMdo_RryCpOV_ebW_nPqSUma6VAlO9UOo';

const supabase = createClient(supabaseUrl, supabaseKey);

const tableData = ref([]);
const isLoading = ref(true);

const fetchData = async () => {
  try {
    const { data, error } = await supabase.from('hello-vue').select('*');
    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new Error('No data returned from Supabase.');
    }
    tableData.value = data;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching data from Supabase:', error.message);
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
