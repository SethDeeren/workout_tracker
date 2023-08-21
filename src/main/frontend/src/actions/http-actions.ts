export const loginRequest = async (url: string, requestBody: {email:string, password:string}) => {

    const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    });

    if(!response.ok) {
        let errorMessage = "Username or password incorrect"     
        throw new Error(errorMessage);
    }

    return await response.json();
        
};


export const signupRequest = async (url: string, requestBody: {username: string, email:string, password:string}) => {

    const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    });

    if(!response.ok) {
       const data = await response.json();
        // show error modal or somthing
        let errorMessage = "Authentication failed";
        if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
    }

    return await response.json();
        
};