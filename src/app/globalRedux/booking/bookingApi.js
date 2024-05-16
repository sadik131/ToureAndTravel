import toast from "react-hot-toast"

export function getBooking() {
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/api/booking")
        const data = await responce.json()
        resolve({ data })
    })
}
export function getpackageById({ id }) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/package/${id}`)
        const data = await responce.json()
        resolve({ data })
    })
}
export function createBooking(doc) {
    console.log(doc)
    return new Promise(async (resolve) => {
        const responce = await fetch("http://localhost:3000/api/booking", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(doc)
        })
        const data = await responce.json()
        resolve({ data })
    })
}

export function feedback(doc) {
    return new Promise(async (resolve) => {
        const responce = await fetch(`http://localhost:3000/api/ratting/${doc.packageId}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(doc)
        })
        const data = await responce.json()
        if (data.success) {
            toast.success("Success")
        }
        resolve({ data })
    })
}