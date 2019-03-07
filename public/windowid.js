function createRandomId() {
    axios
        .post('/randomid', {
            randomId: Math.ceil(Math.random() * 19)
        })
        .then(() => console.log('randomId from client', randomId))
        .catch(err => console.log(err))
}

createRandomId();