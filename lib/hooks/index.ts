import { useAuth } from "@clerk/nextjs";

export const useDisabled = () =>{
    const { userId } = useAuth();
    // user_2fiUiI2kUxpuhPtK918Dy4PDgPG
    if(userId === 'user_2fianaRfWN2paSRNPjyUOoQz8BM'){
        return false
    }else{
        return true
    }
}