const app = Vue.createApp({
    data() {
        return {
            categories: '',
            category: {
                name: ''
            },
            delCategory: 'default',
            errors: '',
            isCategory: false
        }
    },
    methods: {
        async onLoad(){
            $response = await fetch('https://apipost2025.local/api/categories')
            this.categories = await $response.json()
        },
        async onAddCategory(){
            $response = await fetch('https://apipost2025.local/api/categories',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.category)
            })
            
            if($response.status != 201){
                $response = await $response.json()
                this.categories = ''
                this.category.name = ''
                this.onLoad()
                this.isCategory = false
            }else{
                $response = await $response.json()
                this.errors = $response.category
                this.isCategory = true
            }
            
            

                

            
            
        },
        async onDeleteCategory(){
            if(this.delCategory != 'default'){
                $response = await fetch(`https://apipost2025.local/api/categories/${this.delCategory}`,{
                    method: 'delete'
                })
                this.categories = ''
                this.delCategory = 'default'
                this.isCategory = false
                this.onLoad()
            }
            
            
        }

    },
    mounted() {
        this.onLoad()
    },
}).mount('#app')
