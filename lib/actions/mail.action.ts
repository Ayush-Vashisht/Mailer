export async function sendMail(email:string, content:string) {
    try {
        
        return JSON.parse(JSON.stringify({mail:content}));
    } catch (error) {
        throw new Error (`Error: ${JSON.stringify(error)}`)
    }
}
