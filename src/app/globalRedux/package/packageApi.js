import toast from "react-hot-toast"

export function getPackage() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/api/package")
        const data = await responce.json()
        resolve({ data })
    })
}
export function createPackage(doc) {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/api/package",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(doc)
        })
        const data = await responce.json()
        console.log(data)
        resolve({ data })
    })
}
export function deletePackage(id) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/package/${id}`,{
            method:"DELETE",
            // headers:{"content-type":"application/json"},
        })
        const data = await responce.json()
        resolve({ data })
    })
}
export function editPackage(update) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/package/${update._id}`,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(update)
        })
        const data = await responce.json()
        resolve({ data })
    })
}
