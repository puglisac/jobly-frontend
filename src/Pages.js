    
    const pages = (arr, start)=>{
        const page=[]
        for(let i =start; i<start+20;i++){
            if(arr[i]===undefined){
                
                return page;
            }
            page.push(arr[i]);
            
        }
        return page
    }


    export default pages