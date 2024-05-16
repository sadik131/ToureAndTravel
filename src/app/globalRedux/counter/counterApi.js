export function fetchApi(){
    return new Promise(async(resolve)=>{
        const responce = await fetch("http://localhost:3000")
        const data = await responce.json()
        resolve({data})
    })
}