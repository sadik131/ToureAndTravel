import toast from "react-hot-toast"

export function getPackage(prop) {

    return new Promise(async (resolve) => {
        let url = "http://localhost:3000/api/package"
        if (prop) {
            url = `http://localhost:3000/api/package?location=${prop.location}&price=${prop.option}`
        }
        console.log(url)
        console.log(prop)
        const responce = await fetch(url)
        const data = await responce.json()
        resolve({ data })
    })
}
export function filterPackage(filter) {
    const { location, price } = filter;
    const params = new URLSearchParams({ location }).toString();
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/filter?${params}`)
        const data = await responce.json()
        console.log(data)
        resolve({ data })
    })
}
export function createPackage(doc) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/api/package", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(doc)
        })
        const data = await responce.json()
        resolve({ data })
    })
}
export function deletePackage(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/package/${id}`, {
            method: "DELETE",
        })
        const data = await responce.json()
        resolve({ data })
    })
}
export function editPackage(update) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/package/${update.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(update.data)
        })
        const data = await responce.json()
        resolve({ data })
    })
}

export function approvePackage(update) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/package/${update.id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(update.data)
        })
        const data = await responce.json()
        console.log(data)
        resolve({ data })
    })
}
