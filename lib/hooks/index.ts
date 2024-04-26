import { useAuth } from "@clerk/nextjs";

export const useDisabled = () =>{
    const { userId } = useAuth();
    if(userId === 'user_2faVnATPuAjRC93wDlSuNNY7D03'){
        return false
    }else{
        return true
    }
}