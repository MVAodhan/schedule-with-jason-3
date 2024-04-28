import { useAuth } from "@clerk/nextjs";

export const useDisabled = () =>{
    const { userId } = useAuth();
    // user_2fiec2J83ASFZgDbEpVtMHG1sgw
    if(userId === 'user_2fiec2J83ASFZgDbEpVtMHG1sgw'){
        return false
    }else{
        return true
    }
}