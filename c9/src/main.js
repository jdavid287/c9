import { createApp } from 'vue'
import App from './App.vue'
import { createClient } from '@supabase/supabase-js'

import './assets/main.css'

const app = createApp(App)

app.config.productionTip = false

const supabaseUrl = 'https://your-supabase-url.supabase.co'
const supabaseKey = 'your-supabase-key'

const supabase = createClient(supabaseUrl, supabaseKey)

app.config.globalProperties.$supabase = supabase

app.mount('#app')

