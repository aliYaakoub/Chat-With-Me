export default async function logout(){
        try{
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/users/logout?username=${currentUsername}`)
            if(result.data.message === 'success'){
                setIsLoggedIn(false);
            }
        }
        catch(err){
            console.error(err);
        }
    }
