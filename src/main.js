function min(a,b){
    return a+b;
}
module.exports={
    add:(...args)=>{
        return args.reduce((prev,curr)=>{
            return prev+curr;
        })
    },
    mul:(...args)=>{
        return args.reduce((prev,curr)=>{
            return prev*curr;
        })
    },
    cover:(a,b)=>{
        if(a>b){
            return 1;
        }else if(a==b){
            return 0;
        }else{
            return min(a,b);
        }
    }
}