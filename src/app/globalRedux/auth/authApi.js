export function fetchUser(id){
    return new Promise(async(resolve)=>{
        const responce = await fetch(`http://localhost:3000/api/register/${id.email}`)
        const data = await responce.json()
        resolve({data})
    })
}