export function createPaymentIntent(amount){
    console.log(amount)
    return new Promise(async(resolve)=>{
        const responce = await fetch("http://localhost:3000/create-payment",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(amount)
        })
        const data = await responce.json()
        resolve({data})
    })
}