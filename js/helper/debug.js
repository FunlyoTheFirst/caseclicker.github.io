function e() {
    console.table({
        backupSize: new Blob([localStorage.backup]).size,
        saveSize: new Blob([localStorage.localsave]).size
    })
}