const app = Vue.createApp({
    data() {
        return {
            id: '',
            firstName: '',
            lastName: '',
            users:  []
        }

    },
    methods: {
        async fetchUsers() {
           const res = await fetch('http://localhost:5000/persons')
            this.users = await res.json()
        },

        async fetchUser(id) {
            const res = await fetch(`http://localhost:5000/persons/${id}`)
            this.users = await res.json()
        },

        async addUser(e){
            e.preventDefault();

            console.log("seen1")
            const newUser = {
                id: Math.floor(Math.random() * 1000),
                firstName: this.firstName,
                lastName: this.lastName,
            }

            const res = await fetch('http://localhost:5000/persons', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newUser),
            })

            const data = await res.json()

            this.users = [...this.users, data]
        },
        async deleteUser(id){
            if (confirm('Are you sure?')) {
                const res = await fetch(`http://localhost:5000/persons/${id}`, {
                    method: 'DELETE',
                })

                res.status === 200
                    ? (this.users = this.users.filter((user) => user.id !== id))
                    : alert('Error deleting task')
            }
        },
    },
})

app.mount('#app')