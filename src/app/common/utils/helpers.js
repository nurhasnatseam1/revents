export const objectToArray=(object)=>{
    if(object){
        return Object.entries(object).map(e=>(
            {id:e[0],...e[1]}
        ))
    }
}


export const createNewEvent=(user,photoURL,event)=>{
    return {
        ...event,
        hostedBy:user.displayName,
        hostPhotoURL:photoURL,
        created:new Date(),
        attendees:{
            [user.uid]:{
                going:true,joinDate:new Date(),
                photoURL:photoURL || '/assets/user.png',
                displayName:user.displayName,
                host:true,
            }
        }
    }
}



export const createDataTree = dataset => {
    /* returns a  */
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};