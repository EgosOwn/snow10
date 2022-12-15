let zero_zwnj = '‌'
let one_zwl = '‍'
let two_zwsp = '​'


function doCheck(){
    if (document.getElementsByName('hideMode')[0].checked){
        document.getElementsByName('hideTextZone')[0].style.display = "block"
        document.getElementsByClassName('encode')[0].style.display = "block"
        document.getElementsByClassName('decode')[0].style.display = "none"
    }
    else{
        document.getElementsByName('hideTextZone')[0].style.display = "none"
        document.getElementsByClassName('encode')[0].style.display = "none"
        document.getElementsByClassName('decode')[0].style.display = "block"
    }
}


document.getElementsByName('hideMode')[0].onclick = function(){
    doCheck()
}

document.getElementsByClassName('encode')[0].onsubmit = function(e){
    for (let i of document.getElementsByName('inputSecret')[0].value){
        if (i.charCodeAt(0) >= 729){
            alert("Unsupported character in message")
            return false
        }
    }
    e.preventDefault()
    let coverText = document.getElementsByName('hideText')[0].value
    let cover1 = ""
    let cover2 = ""
    if (coverText.length){
        cover1 = coverText.substring(0, coverText.length / 2)
        cover2 = coverText.substring(coverText.length / 2, coverText.length)
    }
    document.getElementsByName('output')[0].value = cover1 + textToTern(document.getElementsByName('inputSecret')[0].value) + cover2
    return false
}

document.getElementsByClassName('decode')[0].onsubmit = function(e){
    let input = document.getElementsByName('inputSecret')[1].value

    console.debug(input.length)
    console.debug(ternToText(input, true))
    document.getElementsByName('output')[1].value = ternToText(input)
    e.preventDefault()
    return false
}

document.getElementById('copyResult').onclick = function(){
    navigator.clipboard.writeText(document.getElementsByName('output')[0].value).then(function() {
        /* clipboard successfully set */
        alert("Copied to clipboard")
      }
    ).catch(function(err) {

        alert("Failed to copy to clipboard")
    })
}


let ternToText = function(input){

    input = input.replaceAll(zero_zwnj, '0')
    input = input.replaceAll(one_zwl, '1')
    input = input.replaceAll(two_zwsp, '2')

    if(input.match(/[120]{6}/g)){
        let wFromTernary = input.match(/([120]{6}|\s+)/g).map(function(fromTernary){
            return String.fromCharCode(parseInt(fromTernary, 3) )
        }).join('')
        return wFromTernary.replaceAll("\u0000", "")
    }
}

/* based on stackoverflow.com/questions/21354235/converting-binary-to-text-using-javascript */
let textToTern = function(text) {
    let output = []
    let length = text.length
    for (var i = 0;i < length; i++) {
        let bin = text[i].charCodeAt().toString(3).replaceAll('0', zero_zwnj).replaceAll('1', one_zwl).replaceAll('2', two_zwsp)
        output.push(Array(6-bin.length+1).join(zero_zwnj) + bin)
    }
  return output.join('')
}

doCheck()