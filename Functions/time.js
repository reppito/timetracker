

exports.CalculateTime = (time) =>{
    let separator = time.split(":")
    return  (parseInt(separator[0]) * 360) +( parseInt(separator[1]) * 60) + parseInt(separator[2]) 
}
