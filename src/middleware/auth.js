const admin = (req,res,next)=>
{
    const token = "xyzy"
    const result = token === "xyz";
    if(!result)
    {
        res.status(401).send("YOU ARE NOT LIKHITH")
    }
    else{
        next()
    }
}
module.exports = {
    admin
}