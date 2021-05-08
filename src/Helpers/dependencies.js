const base_url = process.env.REACT_APP_BASE_URL;

const userImg = (name)=>{
    return base_url+'/img/'+name;
}

export default userImg;