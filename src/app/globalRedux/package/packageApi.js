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